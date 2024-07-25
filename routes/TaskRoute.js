// Import Express
const express = require("express");

// Assign Router from express
const router = express.Router();

// get the controller
const todoController = require("../controllers/todoController");
const todoViewController = require("../controllers/todoViewController");
const authController = require("../middleware/checkauth");
const errorChecker = require("../middleware/errorController");
// Execute the route
// To save data to the database
router.post("/task", authController.verifyToken, todoController.createTask);

router.post("/update", todoController.updateTask);

// Delete a single task
router.post("/delete", todoController.deleteTask);

// To request and get data from the server
// Protected route
router.get("/", authController.verifyToken, todoViewController.getAllTask);
// To request and get single data from the server
router.get("/:id",authController.verifyToken, todoViewController.getSingleTask);
router.get("/delete/:id", todoViewController.getSingleTaskDelete);
// Change password
router.patch("/changePassword", authController.verifyToken, errorChecker.checkError, todoController.changePassword);
// logOut
router.post("/logOut", authController.verifyToken, todoController.logOut);

router.post("/isFinished", todoController.toggleCheckbox);


module.exports = router;