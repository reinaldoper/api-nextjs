import dotenv from 'dotenv';
import mysql, { Pool } from 'mysql2/promise'; 

dotenv.config();

const pool: Pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT), 
});

export default pool;
