const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    title: {
      type: String,
      required: true,
    },
    startTime: {
      type: Number,
      required: true,
    },
    finishTime: {
      type: Number,
      required: true,
    },
    taskDuration: {
      type: Number,
      required: true,
    },
    projectId: { type: String },
    projectTitle: { type: String },
    projectColorCode: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', TaskSchema);
