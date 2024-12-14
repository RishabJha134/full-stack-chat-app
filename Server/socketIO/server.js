const express = require("express");
const { Server } = require("socket.io");
const { createServer } = require("http");
const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const getRecieverSocketId = (recieverId) => {
  console.log("recieverId", recieverId);
  console.log("users[recieverId]", users[recieverId]);
  return users[recieverId];
};

const users = {};

io.on("connection", (socket) => {
  console.log("a new user connected", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) {
    users[userId] = socket.id;
    console.log("users -> " + JSON.stringify(users));
  }

  // used to send this event to all the connected users in frontend:-
  io.emit("getOnlineUsers", Object.keys(users));

  // used to listen client side events emitted by server side (server and client);

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

module.exports = { io, app, server, getRecieverSocketId };
