const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    startTime: {
      type: Date,
      trim: true,
      required: true,
    },
    finishTime: {
      type: Date,
      trim: true,
      required: true,
    },
    taskDuration: {
      type: Number,
      trim: true,
      required: true,
    },
    projectId: {
      type: String,
      trim: true,
    },
    projectTitle: {
      type: String,
      trim: true,
    },
    projectColorCode: {
      type: String,
      trim: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
