const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transporter = require("../config/emailConfig");
const dotenv = require("dotenv");

dotenv.config();

// REGISTER FUNCTION (FOR BOTH CUSTOMER & ADMIN)
exports.register = async (req, res) => {
    const { first_name, last_name, email, password, role } = req.body;

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" });

    // Save user in the database
    const sql = `INSERT INTO users (first_name, last_name, email, password, role, verification_token) VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(sql, [first_name, last_name, email, hashedPassword, role, token], (err) => {
        if (err) return res.status(500).json({ message: "Email already exists." });

        // Send Verification Email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Verify Your Email",
            text: `Click the link to verify your email: http://localhost:5000/api/verify?token=${token}`
        };

        transporter.sendMail(mailOptions, (error) => {
            if (error) return res.status(500).json({ message: "Error sending email" });
            res.json({ message: "Registration successful. Check your email to verify your account." });
        });
    });
};

// EMAIL VERIFICATION FUNCTION
exports.verifyEmail = (req, res) => {
    const { token } = req.query;
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(400).send("Invalid token");

        db.query("UPDATE users SET is_verified = TRUE WHERE email = ?", [decoded.email], (err) => {
            if (err) return res.status(500).send(err);
            res.send("Email verified successfully!");
        });
    });
};

// ADMIN LOGIN FUNCTION
exports.adminLogin = (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
        if (err || results.length === 0) return res.status(401).json({ message: "Invalid credentials" });

        const user = results[0];

        // Restrict customers from logging in as admin
        if (user.role !== "admin") {
            return res.status(403).json({ message: "You are not allowed to login from here." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        if (!user.is_verified) return res.status(401).json({ message: "Please verify your email first" });

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, role: user.role });
    });
};
