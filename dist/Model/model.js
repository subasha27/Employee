"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
const sequelize_1 = require("sequelize");
class DataModel extends sequelize_1.Model {
}
DataModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    gender: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    uniqueId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    ctc: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    basicSalary: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    actualHRA: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    specialAllowance: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    incomeTax: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: db_1.default,
    modelName: "data",
    timestamps: true
});
exports.default = DataModel;
