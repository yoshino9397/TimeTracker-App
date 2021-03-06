const Task = require("../models/Task.js");
const moment = require("moment");

const createTask = async (req, res) => {
  const newTask = new Task(req.body);
  try {
    const savedTask = await newTask.save();
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
  try {
    await Task.findByIdAndDelete(req.params.id);
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

const getTasksByWeek = async (req, res, next) => {
  try {
    const result = await Task.aggregate([
      {
        $match: {
          userId: req.params.id,
          createdAt: {
            $gte: moment().startOf("week").toDate(),
            $lt: moment().endOf("week").toDate(),
          },
        },
      },
    ]);
    res.status(200).json(result);
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
  getTasksByWeek,
};
