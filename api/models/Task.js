const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    title: {
      type: String,
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    finishTime: {
      type: Date,
      required: true,
    },
    taskDuration: {
      type: Number,
      required: true,
    },
    projectId: { type: String },
    name: { type: String },
    projectColorCode: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
