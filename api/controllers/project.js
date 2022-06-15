const Project = require("../models/Project.js");

const createProject = async (req, res) => {
  const newProject = new Project(req.body);
  try {
    const savedProject = await newProject.save();
    res.status(200).json(savedProject);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateProject = async (req, res, next) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedProject);
  } catch (err) {
    next(err);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.status(200).json("Project has been deleted.");
  } catch (err) {
    next(err);
  }
};

const getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    res.status(200).json(project);
  } catch (err) {
    next(err);
  }
};

const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({ userId: req.params.id });
    res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createProject,
  updateProject,
  deleteProject,
  getProject,
  getProjects,
};
