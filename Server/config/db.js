const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    const dbResponse = await mongoose.connect(process.env.MONGO_URL);
    console.log("Connect to MongoDB");
  } catch (e) {
    console.error("Error connecting to MongoDB");
  }
};

module.exports = connectDB;
