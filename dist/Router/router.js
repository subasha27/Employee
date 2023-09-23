"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multerMiddleware_1 = require("../Middleware/multerMiddleware");
const controller_1 = __importDefault(require("../controller/controller"));
const router = express_1.default.Router();
router.post('/AddEmployee', controller_1.default.newEmployee);
router.put('/UpdateEmployee/:id', controller_1.default.updateEmployee);
router.delete('/DeleteEmployee/:id', controller_1.default.deleteEmployee);
router.post('/createEmployee', multerMiddleware_1.uploadFilesMiddleware, controller_1.default.addEmployee);
router.get('/GetEmployeeDetails/:id', controller_1.default.getEmployeeById);
router.get('/GetAllEmployeeDetails', controller_1.default.getAll);
router.get('/DownloadAllDetails', controller_1.default.download);
exports.default = router;
