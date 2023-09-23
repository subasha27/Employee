import { Request, Response } from "express";
import DataModel from "../Model/model";
import ExcelJS from "exceljs"
import xlsx from "xlsx";

class employee {

    async newEmployee(req: Request, res: Response) {
        try {
            const newEmployee = req.body
            const employee = await DataModel.findOne({ where: { name: newEmployee.name } });
            if (employee) res.send({ message: "Employee with same Detail Already exists" })
            const employeeAdded = await DataModel.create(newEmployee);
            const id = employeeAdded.id
            res.send({ message: "Employee Added successfully", id })
        } catch (err) {
            console.error(err)
            res.send({ message: "Server Error", err })
        }
    }

    async updateEmployee(req: Request, res: Response) {
        try {
            const newEmployee = req.body
            const id = req.params.id
            const employee = await DataModel.findByPk(id);
            if (!employee) res.send({ message: "Employee not found" })
            const employeeAdded = await DataModel.update(newEmployee, { where: { id: id } });
            res.send({ message: "Employee Updated successfully" })
        } catch (err) {
            console.error(err)
            res.send({ message: "Server Error", err })
        }
    }

    async deleteEmployee(req: Request, res: Response) {
        try {
            const newEmployee = req.body
            const id = req.params.id
            const employee = await DataModel.findByPk(id);
            if (!employee) res.send({ message: "Employee not Found" })
            await DataModel.destroy({ where: { id: id } });
            res.send({ message: "Employee Deleted successfully" })
        } catch (err) {
            console.error(err)
            res.send({ message: "Server Error", err })
        }
    }

    async addEmployee(req: Request, res: Response) {
        try {
            const files = req.files as Express.Multer.File[];
            const checkBox = req.body.checkBox
            if (!checkBox) return res.send({ message: "Fill the Check Box" })
            if (!files || files.length === 0) {
                return res.status(400).send('No files uploaded.');
            }

            const promises = files.map(async (file) => {
                const buffer = file.buffer;
                const workbook = xlsx.read(buffer, { type: 'buffer' });
                const sheetName = workbook.SheetNames[0];
                const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

                const recordsToCreate = jsonData.map((data: any) => ({
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
                    console.log(record)
                    const existingId = await DataModel.findOne({ where: { uniqueId: record.uniqueId } })
                    if (existingId && checkBox == 'false') { console.log({ message: `Duplicate Data Found and is Skipped`, existingId: existingId.toJSON() }) }
                    if (existingId && checkBox == 'true') {
                        await DataModel.update(record, { where: { id: existingId.id } })
                        console.log({ message: "Updated" })
                    }
                    if (!existingId && checkBox == 'false') {
                        await DataModel.bulkCreate(recordsToCreate)
                    }
                }
            });

            await Promise.all(promises);

            return res.status(200).send('Files uploaded and data processed successfully.');
        } catch (err) {
            console.error(err)
            res.send({ message: "Server Error", err })
        }
    }

    async getEmployeeById(req: Request, res: Response) {
        try {
            const empId = req.params.id
            const employee = await DataModel.findByPk(empId);
            if (!employee) res.send({ message: "Employee Not Found" })
            res.send({ message: "Details", employee })
        } catch (err) {
            console.error(err)
            res.send({ message: "Server Error", err })
        }
    }
    async getAll(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const pageSize = parseInt(req.query.pageSize as string) || 10;
            const offset = (page - 1) * pageSize;
            const limit = pageSize;

            const { count, rows: employees } = await DataModel.findAndCountAll({
                offset,
                limit,
            });

            res.send({ message: "Details", employees, totalCount: count });
        } catch (err) {
            console.error(err);
            res.send({ message: "Server Error", err });
        }
    }


    async download (req:Request,res:Response){
        try{
            const users = await DataModel.findAll(); 
    
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet("User Data");
    
            worksheet.columns = [
                { header: "id", key: "id", width: 15 },
                { header: "name", key: "name", width: 15 },
                { header: "age", key: "age", width: 15 },
                { header: "gender", key: "gender", width: 15 },
                { header: "uniqueId", key: "uniqueId", width: 15 },
                { header: "role", key: "role", width: 15 },
                { header: "ctc", key: "ctc", width: 15 },
                { header: "basicSalary", key: "basicSalary", width: 15 },
                { header: "actualHRA", key: "actualHRA", width: 15 },
                { header: "specialAllowance", key: "specialAllowance", width: 15 },
                { header: "incomeTax", key: "incomeTax", width: 15 },

                
                // Excel format
            ];
    
            users.forEach((user) => {
                worksheet.addRow(user);
            });
            const excelBuffer = await workbook.xlsx.writeBuffer();
            const excelFileName = "user_data.xlsx"; // The name of the downloaded Excel file
    
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', `attachment; filename=${excelFileName}`);
            res.send(excelBuffer);
        }catch(err){
            console.error(err);
            return res.status(500).send({message:"Server Error..."})
        }
    }


}

export default new employee();