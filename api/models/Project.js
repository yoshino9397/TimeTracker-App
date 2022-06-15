const mongoose = require("mongoose");
const ProjectSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      trim: true,
      required: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    colorCode: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
    },
    tasks: {
      type: [{ id: String, time: Number }],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", ProjectSchema);
