const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      
    },
  },
  {
    timestamps: true,
  }
);

// convert schema to model.
const User = mongoose.model("User", userSchema);
module.exports = { User };
