import express from 'express';
import { uploadFilesMiddleware } from '../Middleware/multerMiddleware';
import  handleFileUpload  from '../controller/controller';

const router = express.Router();


router.post('/AddEmployee',handleFileUpload.newEmployee);
router.put('/UpdateEmployee/:id',handleFileUpload.updateEmployee);
router.delete('/DeleteEmployee/:id',handleFileUpload.deleteEmployee)
router.post('/createEmployee',uploadFilesMiddleware,handleFileUpload.addEmployee);
router.get('/GetEmployeeDetails/:id',handleFileUpload.getEmployeeById)
router.get('/GetAllEmployeeDetails',handleFileUpload.getAll)
router.get('/DownloadAllDetails',handleFileUpload.download)



export default router;