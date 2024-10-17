const express = require("express");
const router = express.Router();
const taskApi = require("./task.api");
const userApi = require("./user.api");

router.use("/tasks", taskApi); // /tasks 주소가 불리면 taskApi로 감
router.use("/user", userApi);

module.exports = router;
