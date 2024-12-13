const express = require('express');
const { sendMessage, getMessages } = require('../controller/message.controller');
const { auth } = require('../middleware/secureRoute');
const messageRoutes = express.Router();

messageRoutes.post("/send/:id",auth,sendMessage);
messageRoutes.get("/get/:id",auth,getMessages);


module.exports = messageRoutes;
