import { Sequelize } from "sequelize";

const db = new Sequelize('postgres://postgres:root@localhost:5000/books_api', {
  logging: false, // set to console.log if you want to see the SQL Sequelize generates
})

export default db;