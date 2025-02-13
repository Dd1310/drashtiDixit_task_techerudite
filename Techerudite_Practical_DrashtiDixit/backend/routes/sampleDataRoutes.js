const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../config/db");

const router = express.Router();

// Route to Insert Sample Admin & Customer Data
router.get("/insert-sample-data", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash("password123", 10);

        const sql = `INSERT INTO users (first_name, last_name, email, password, role, is_verified) 
                     VALUES 
                     ('Admin', 'User', 'admin@example.com', ?, 'admin', TRUE),
                     ('John', 'Doe', 'customer@example.com', ?, 'customer', TRUE)`;

        db.query(sql, [hashedPassword, hashedPassword], (err, result) => {
            if (err) return res.status(500).send(err);
            res.send("Sample data inserted successfully!");
        });
    } catch (error) {
        res.status(500).send("Error inserting sample data");
    }
});

module.exports = router;
