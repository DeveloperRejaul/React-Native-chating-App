const { Room } = require("../models/model");

const socketConnection = (socket, io) => {
  console.log("a user connected: " + socket.id);
  socket.on("disconnect", () => {
    console.log("user disconnected: " + socket.id);
  });

  socket.on("send-message", (data) => {
    console.log(data);
  });

  socket.on("joinRoom", (roomName, callback) => {
    socket.join(roomName);
    callback("joined");
  });

  socket.on("sendMessage", (roomName, message, receiveMessageUserId) => {
    socket.to(roomName).emit("receiveMessage", message);
    socket.broadcast.emit("receiveMessage", message, receiveMessageUserId);
  });

  socket.on("getLastMessage", async (userId) => {
    const data = await getData(userId);
    socket.emit("lastMessage", data);
  });

  socket.emit("send-data-from-server", "hello client");
};

const getData = async (userId) => {
  const allRooms = await Room.find({ members: { $all: [userId] } })
    .select({
      members: 1,
      messages: 1,
    })
    .populate("messages", "text createdAt -_id");

  const lastMessages = allRooms.map((data) => {
    const receiverId = data.members.filter((id) => id != userId);
    const lastMessage = data.messages[data.messages.length - 1];
    return {
      receiverId: receiverId[0],
      lastMessage: lastMessage,
    };
  });

  return lastMessages;
};

module.exports = socketConnection;
