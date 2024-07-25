// Import Express
const express = require("express");

// Assign Router from express
const router = express.Router();

const userController = require("../controllers/UserController");
const authController = require("../controllers/AuthController");

router.post("/register", userController.registerAccount);
router.post("/login", authController.login);

module.exports = router;