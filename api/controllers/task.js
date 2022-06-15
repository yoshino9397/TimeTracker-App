const Task = require("../models/Task.js");
const Project = require("../models/Project.js");

const createTask = async (req, res) => {
  const projectId = req.params.projectid;
  const newTask = new Task(req.body);
  try {
    const savedTask = await newTask.save();
    try {
      await Project.findByIdAndUpdate(projectId, {
        $push: { tasks: { id: savedTask._id, time: savedTask.taskDuration } },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedTask);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedTask);
  } catch (err) {
    next(err);
  }
};

const deleteTask = async (req, res, next) => {
  const projectId = req.params.projectid;
  try {
    await Task.findByIdAndDelete(req.params.id);
    try {
      await Project.findByIdAndUpdate(projectId, {
        $pull: { tasks: { id: req.params.id } },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Task has been deleted.");
  } catch (err) {
    next(err);
  }
};

const getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
};

const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ userId: req.params.id });
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

const getTasksByProject = async (req, res, next) => {
  try {
    const tasks = await Task.find({ projectId: req.params.id });
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createTask,
  updateTask,
  deleteTask,
  getTask,
  getTasks,
  getTasksByProject,
};
