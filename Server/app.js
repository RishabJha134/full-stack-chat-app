const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
dotenv.config();
const { app, server } = require("./socketIO/server");

// const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());

var corsoption = {
  origin: "http://localhost:5173", //origin from where you requesting
  credentials: true,
};

//using cors
app.use(cors(corsoption));

// routing:-
const userRoutes = require("./routes/user.routes");
const messageRoutes = require("./routes/message.routes");
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/messages", messageRoutes);

connectDB();
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
