const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./config/db");
const { createUserTable } = require("./models/userModel");
const authRoutes = require("./routes/authRoutes");
const sampleDataRoutes = require("./routes/sampleDataRoutes"); 

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", authRoutes);
app.use("/api", sampleDataRoutes); 

// Initialize Database Table
createUserTable();

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
