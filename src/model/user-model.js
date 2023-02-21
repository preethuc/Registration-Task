import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    image: {
      type: String,
    },
    token: {
      type: String,
    },
    logged_in: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
