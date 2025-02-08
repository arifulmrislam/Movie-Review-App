import { Sequelize } from "sequelize";
import dbConfig from "../config/database";

export const sequelize = new Sequelize(
    dbConfig.DB_NAME,
    dbConfig.DB_USERNAME,
    dbConfig.DB_PASSWORD,

    {
        host: dbConfig.DB_HOST,
        dialect: dbConfig.dialect as any,
        logging: false,
        port: dbConfig.DB_PORT
    }
);

sequelize
    .authenticate()
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });

export default sequelize;
