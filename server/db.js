import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

export const db = mysql.createConnection({
  host: process.env.HOST_SQL,
  user: process.env.USER_SQL,
  password: process.env.PASSWORD_SQL,
  database: process.env.DATABASE_SQL,
});