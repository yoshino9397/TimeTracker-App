const mongoose = require("mongoose");
const validator = require("validator");
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error('Password cannot contain "password"');
        }
      },
    },
    duration: {
      type: Number,
      default: 1500,
      trim: true,
    },
    shortBreak: {
      type: Number,
      default: 250,
      trim: true,
    },
    longBreak: {
      type: Number,
      default: 900,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
