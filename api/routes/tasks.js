const express = require("express");
const {
  createTask,
  updateTask,
  deleteTask,
  getTask,
  getTasks,
  getTasksByProject,
} = require("../controllers/task.js");

const router = express.Router();

//CREATE
router.post("/:projectid", createTask);

//UPDATE
router.put("/:id", updateTask);
//DELETE
router.delete("/:id/:projectid", deleteTask);
//GET
router.get("/:id", getTask);
//GET ALL
router.get("/user/:id", getTasks);
router.get("/project/:id", getTasksByProject);

module.exports = router;
