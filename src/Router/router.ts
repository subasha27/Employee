import express from 'express';
import { uploadFilesMiddleware } from '../Middleware/multerMiddleware';
import  handleFileUpload  from '../controller/controller';

const router = express.Router();

router.post('/createEmployee',uploadFilesMiddleware,handleFileUpload.addEmployee);
router.get('/GetEmployeeDetails/:id',handleFileUpload.getEmplyeeById)
router.get('/GetAllEmployeeDetails',handleFileUpload.getAll)



export default router;