const { Conversation } = require("../model/conversation.model");
const { Message } = require("../model/message.model");
async function sendMessage(req, res) {
  try {
    // Extract message from the request body and receiver ID from params
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user.id;

    // Check if a conversation already exists between the sender and receiver
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    // If no conversation exists, create a new conversation collection
    if (!conversation) {
      conversation = await Conversation.create({
        members: [senderId, receiverId],
      });
    }

    // Create a new message
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    console.log("Conversation:", conversation);
    console.log("New Message:", newMessage);

    // Link the new message to the conversation
    if (newMessage) {
      conversation.messages = conversation.messages || []; // Ensure the messages array exists
      conversation.messages.push(newMessage._id);
    }

    // Save the conversation and message concurrently for efficiency
    await Promise.all([conversation.save(), newMessage.save()]);

    // Respond with success and the new message
    res.status(200).json({
      message: "Message sent successfully",
      newMessage,
    });

    // Notes:
    // If no conversation exists, a new one is created.
    // The first message will initialize the conversation.
  } catch (err) {
    console.error("Error in sending message:", err);
    res.status(500).json({ error: "Server error in sending message" });
  }
}

const getMessages = async (req, res) => {
  try {
    const { id: charUser } = req.params;
    const senderId = req.user._id;

    // Find the conversation between the senderId and chatUser and then populate their messages:-

    // senderId and recieverId/chatUser ke beech ki jitne bhi conversation or messages hai vo saara ek array ke form me return karwana hai hume so that we can map their all messages in the ui.
    
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, charUser] },
    }).populate("messages");

    console.log("conversation:" + conversation);

    if (!conversation) {
      return res.status(201).json([]);
    }

    const messages = conversation.messages;
    res.status(201).json(messages);
  } catch (err) {
    console.error("Error in getting messages:", err);
    res.status(500).json({ error: "Server error in getting messages" });
  }
};

module.exports = { sendMessage, getMessages };
