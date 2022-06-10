const mongoose = require("mongoose");
const ProjectSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    colorCode: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", ProjectSchema);
