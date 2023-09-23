"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = __importDefault(require("../Model/model"));
const xlsx_1 = __importDefault(require("xlsx"));
class employee {
    addEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const files = req.files;
                const checkBox = req.body.checkBox;
                if (!checkBox)
                    return res.send({ message: "Proveide the Check Box" });
                if (!files || files.length === 0) {
                    return res.status(400).send('No files uploaded.');
                }
                const promises = files.map((file) => __awaiter(this, void 0, void 0, function* () {
                    const buffer = file.buffer;
                    const workbook = xlsx_1.default.read(buffer, { type: 'buffer' });
                    const sheetName = workbook.SheetNames[0];
                    const jsonData = xlsx_1.default.utils.sheet_to_json(workbook.Sheets[sheetName]);
                    const recordsToCreate = jsonData.map((data) => ({
                        name: data.name || "",
                        age: data.age || 0,
                        gender: data.gender || "",
                        uniqueId: data.uniqueId || 0,
                        role: data.role || "",
                        ctc: data.ctc || 0,
                        basicSalary: (data.ctc * 0.35) || 0,
                        actualHRA: (data.ctc * 0.12) || 0,
                        specialAllowance: (data.ctc * 0.43) || 0,
                        incomeTax: (data.ctc * 0.10) || 0
                    }));
                    for (const record of recordsToCreate) {
                        console.log(record);
                        const existingId = yield model_1.default.findOne({ where: { uniqueId: record.uniqueId } });
                        if (existingId && checkBox == 'false') {
                            console.log({ message: `Duplicate Data Found and is Skipped`, existingId: existingId.toJSON() });
                        }
                        if (existingId && checkBox == 'true') {
                            yield model_1.default.update(record, { where: { id: existingId.id } });
                            console.log({ message: "Updated" });
                        }
                        if (!existingId && checkBox == 'false') {
                            yield model_1.default.bulkCreate(recordsToCreate);
                        }
                    }
                }));
                yield Promise.all(promises);
                return res.status(200).send('Files uploaded and data processed successfully.');
            }
            catch (err) {
                console.error(err);
                res.send({ message: "Server Error", err });
            }
        });
    }
    getEmplyeeById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const empId = req.params.id;
                const employee = yield model_1.default.findByPk(empId);
                if (!employee)
                    res.send({ message: "Employee Not Found" });
                res.send({ message: "Details", employee });
            }
            catch (err) {
                console.error(err);
                res.send({ message: "Server Error", err });
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = parseInt(req.query.page) || 1;
                const pageSize = parseInt(req.query.pageSize) || 10;
                const offset = (page - 1) * pageSize;
                const limit = pageSize;
                const { count, rows: employees } = yield model_1.default.findAndCountAll({
                    offset,
                    limit,
                });
                res.send({ message: "Details", employees, totalCount: count });
            }
            catch (err) {
                console.error(err);
                res.send({ message: "Server Error", err });
            }
        });
    }
}
exports.default = new employee();
