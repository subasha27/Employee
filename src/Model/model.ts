import sequelize from "../config/db";
import { Sequelize, Model, DataTypes } from "sequelize";

class DataModel extends Model {
    public id!: number;
    public name!: string;
    public age!: number;
    public gender!: string;
    public uniqueId!:number;
    public role!:string;
    public ctc!:number;
    public basicSalary!: number;
    public actualHRA!: number;
    public specialAllowance!: number;
    public incomeTax!: number;

}


DataModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false
    },
    uniqueId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    role:{
        type: DataTypes.STRING,
        allowNull: false
    },
    ctc:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    basicSalary: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    actualHRA: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    specialAllowance: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    incomeTax: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
}, {
    sequelize,
    modelName: "data",
    timestamps: true
}
)

export default DataModel;  
