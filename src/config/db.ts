import { error } from "console";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    'data',
    'root',
    'rootpass',{
        host:'localhost',
        dialect:'mysql',
        timezone: '+05:30',
    }
)



sequelize.authenticate().then(()=>{
    console.log("Connection Established successfully")
}).catch((error)=>{
    console.error("Connection Error",error)
})

export default sequelize;