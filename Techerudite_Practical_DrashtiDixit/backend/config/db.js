const mysql = require("mysql2"); 
const dotenv = require("dotenv");

dotenv.config();

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,   
  user: process.env.DB_USER,  
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME, 
  port: process.env.DB_PORT || 3306, 
  waitForConnections: true,
  queueLimit: 0,
  connectTimeout: 20000, 
});

module.exports = {
  query: (sql, callback) => {
    return pool.query(sql, callback);
  },
};
