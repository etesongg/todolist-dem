const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");

// /user
router.post("/", userController.createUser);
router.post("/login", userController.loginWithEmail);

module.exports = router;
