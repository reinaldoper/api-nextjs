import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import pool from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cleanSqlData = (sql) => {
  return sql
    .replace(/data:image\/jpeg;base64,/g, '')
    .replace(/data:undefined;base64,/g, '')
    .replace(/[\r\n]+/g, ' ') 
    .replace(/''/g, "''"); 
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().slice(0, 19).replace('T', ' '); 
};

const createTables = async () => {
  const queries = [
    `
      CREATE TABLE IF NOT EXISTS Sport (
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        code VARCHAR(50) NOT NULL,
        name VARCHAR(100) NOT NULL,
        paralympic TINYINT(1) NOT NULL
      );
    `,
    `
      CREATE TABLE IF NOT EXISTS Athlete (
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        sportId INT NOT NULL,
        paralympic TINYINT(1) NOT NULL,
        instagramUrl VARCHAR(255),
        instagramName VARCHAR(100),
        instagramImageUrl VARCHAR(255),
        instagramFollowersCount INT,
        instagramFollowingCount INT,
        instagramPostsCount INT,
        instagramBio TEXT,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT Athlete_sportId_fkey FOREIGN KEY (sportId) REFERENCES Sport (id) ON DELETE RESTRICT ON UPDATE CASCADE
      );
    ` ,
    `
      CREATE TABLE IF NOT EXISTS Users (
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `,
  ];

  try {
    for (const query of queries) {
      await pool.query(query);
    }
    console.log('Tabelas Sport e Athlete criadas com sucesso.');
  } catch (err) {
    console.error('Erro ao criar tabelas:', err.message);
  }
};

const insertFromSQLFile = async (filePath) => {
  try {
    let sql = fs.readFileSync(filePath, 'utf8');
    console.log('Conteúdo original do arquivo SQL:', sql);

    sql = cleanSqlData(sql); 
    console.log('Conteúdo limpo do arquivo SQL:', sql);

    const statements = sql.split(';').filter(statement => statement.trim() !== '');

    for (let statement of statements) {
      
      const dateMatch = statement.match(/(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}\+\d{2}:\d{2})/);
      if (dateMatch) {
        const formattedDate = formatDate(dateMatch[0]);
        statement = statement.replace(dateMatch[0], formattedDate);
      }

      console.log('Executando SQL:', statement); 
      await pool.query(statement);
    }
    console.log('Dados inseridos com sucesso a partir do arquivo SQL.');
  } catch (err) {
    console.error('Erro ao inserir dados do arquivo SQL:', err.message);
  }
};

const initDB = async () => {
  await createTables();
  const sqlFilePath = path.join(__dirname, 'create_db.sql');
  await insertFromSQLFile(sqlFilePath);
  await pool.end();
};

initDB().catch(err => {
  console.error('Erro ao inicializar o banco de dados:', err.message);
});
