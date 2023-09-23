import { Request, Response } from "express";
import DataModel from "../Model/model";
import xlsx from "xlsx";

class employee {

    async addEmployee(req: Request, res: Response) {
        try {
            const files = req.files as Express.Multer.File[];
            const checkBox = req.body.checkBox
            if (!checkBox) return res.send({ message: "Proveide the Check Box" })
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

    async getEmplyeeById(req:Request,res:Response){
        try{
            const empId = req.params.id
            const employee = await DataModel.findByPk(empId);
            if(!employee) res.send({message:"Employee Not Found"})
            res.send({message:"Details",employee})
        }catch(err){
            console.error(err)
            res.send({message:"Server Error",err})
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

}

export default new employee();