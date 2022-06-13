const express = require("express");
const {
  createProject,
  updateProject,
  deleteProject,
  getProject,
  getProjects,
} = require("../controllers/project.js");

const router = express.Router();

//CREATE
router.post("/", createProject);

//UPDATE
router.put("/:id", updateProject);
//DELETE
router.delete("/:id", deleteProject);
//GET
router.get("/:id", getProject);
//GET ALL
router.get("/user/:id", getProjects);

module.exports = router;
