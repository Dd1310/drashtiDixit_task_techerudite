const express = require("express");
const { register, verifyEmail, adminLogin } = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.get("/verify", verifyEmail);
router.post("/admin-login", adminLogin);

module.exports = router;
