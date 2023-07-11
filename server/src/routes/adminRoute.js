const express = require('express');
const usersController = require("../controllers/usersControllers");
const adminController = require("../controllers/adminControllers");

const router = express.Router();

router.post('/add', usersController.isAuthenticated, adminController.addNewUser);

router.post('/department', usersController.isAuthenticated, adminController.addNewDepartment);

module.exports = router;