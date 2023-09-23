import express, { urlencoded } from "express";
import sequelize from "./config/db";
import route from "./Router/router";

const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/api',route);

sequelize.sync();

const port = process.env.PORT||12345;

app.listen(port,()=>{
    console.log(`Server is Running on Port : ${port}`)
})