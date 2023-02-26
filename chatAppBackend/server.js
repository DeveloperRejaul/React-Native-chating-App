const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");
const config = require("./src/config/config.js");
const userRoute = require("./src/routes/urse.route.js");
const chatRoute = require("./src/routes/chat.route.js");
const messageRoute = require("./src/routes/message.route.js");
const io = new Server(server, {
  cors: { origin: ["http://localhost:3000", "http://172.30.144.1:8081", "*"] },
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
config.dbConnect();

app.use("/api/user", userRoute);
app.use("/api/chat", chatRoute);
app.use("/api/message", messageRoute);

app.get("/", (req, res) => {
  res.send({ message: "server in on" });
});

io.on("connection", (socket) => {
  console.log("a user connected: " + socket.id);
  socket.on("disconnect", () => {
    console.log("user disconnected: " + socket.id);
  });
});

module.exports = server;

server.listen(config.appPort, () => {
  console.log("listening on *:" + config.appPort);
});

/**
  API Design:
  POST /api/auth/register - Register a new user
  POST /api/auth/login - Log in an existing user
  GET /api/users - Get a list of all users
  POST /api/chats - Create a new chat room
  GET /api/chats/:chatRoomId - Get a specific chat room
  GET /api/chats/user/:userId - Get all chat rooms for a specific user
  POST /api/messages - Send a message in a chat room
*/
/**
 * const ChatRoom = require('../models/chatRoom');
const Message = require('../models/message');
const User = require('../models/user');

// Create a new chat room
async function createChatRoom(req, res) {
  try {
    const { userId, otherUserId } = req.body;

    // Check if both users exist
    const user = await User.findById(userId);
    const otherUser = await User.findById(otherUserId);

    if (!user || !otherUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if chat room already exists
    const chatRoom = await ChatRoom.findOne({
      members: { $all: [userId, otherUserId] },
      isOneOnOneChat: true,
    });

    if (chatRoom) {
      return res.status(200).json(chatRoom);
    }

    // Create new chat room
    const newChatRoom = new ChatRoom({
      members: [userId, otherUserId],
      isOneOnOneChat: true,
    });

    await newChatRoom.save();

    res.status(201).json(newChatRoom);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

// Send a message in a chat room
async function sendMessage(req, res) {
  try {
    const { text, sender, chatRoom } = req.body;
    const message = new Message({ text, sender, chatRoom });
    await message.save();

    // Emit message to chat room
    req.io.emit(`message_${chatRoom}`, message);

    res.status(201).json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
  createChatRoom,
  sendMessage,
};

 */
