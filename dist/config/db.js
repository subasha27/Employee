"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('data', 'root', 'rootpass', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '+05:30',
});
sequelize.authenticate().then(() => {
    console.log("Connection Established successfully");
}).catch((error) => {
    console.error("Connection Error", error);
});
exports.default = sequelize;
