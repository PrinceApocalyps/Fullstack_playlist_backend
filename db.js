import dotenv from "dotenv";
dotenv.config();
import { Sequelize } from "sequelize";

const db = new Sequelize(process.env.DATABASE_URL, {
  logging: false, // set to console.log if you want to see the SQL Sequelize generates
})

export default db;