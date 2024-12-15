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
    profilePic: {
      type: String,
      default:
        "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Clipart.png",
    },

    // cloudinary ek public_id url generate karke deta hai jiski help se hum crud kar sakte hai image ke saath.
    public_id: {
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
