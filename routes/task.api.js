const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("get tasks");
});

router.post("/", (req, res) => {
  res.send("post tasks");
});

router.put("/:id", (req, res) => {
  res.send("put tasks");
});

router.delete("/:id", (req, res) => {
  res.send("delete tasks");
});

module.exports = router;
