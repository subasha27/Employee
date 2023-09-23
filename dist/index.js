"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const router_1 = __importDefault(require("./Router/router"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use('/api', router_1.default);
db_1.default.sync();
const port = process.env.PORT || 12345;
app.listen(port, () => {
    console.log(`Server is Running on Port : ${port}`);
});
