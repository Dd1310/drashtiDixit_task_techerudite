const db = require("../config/db");

const createUserTable = () => {
    const sql = `CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'customer') NOT NULL,
        is_verified BOOLEAN DEFAULT FALSE,
        verification_token VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

    db.query(sql, (err) => {
        if (err) console.error("Error creating users table:", err);
        else console.log("Users table is ready!");
    });
};

module.exports = { createUserTable };
