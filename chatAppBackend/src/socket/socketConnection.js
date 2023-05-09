const { Room } = require("../models/model");
const {
  DIS_CONNECT,
  SEND_MESSAGE,
  JOIN_ROOM,
  RECEIVE_MESSAGE,
  TYPING,
  STOP_TYPING,
  LAST_MESSAGE,
} = require("./action");

const socketConnection = (socket, io) => {
  console.log("a user connected: " + socket.id);
  socket.on(DIS_CONNECT, () => {
    console.log("user disconnected: " + socket.id);
  });

  socket.on(SEND_MESSAGE, (data) => {
    console.log(data);
  });

  socket.on(JOIN_ROOM, (roomName, callback) => {
    socket.join(roomName);
    callback("joined");
  });

  socket.on(SEND_MESSAGE, (roomName, message, receiveMessageUserId) => {
    io.sockets.in(roomName).emit(RECEIVE_MESSAGE, message);
    io.sockets.emit(LAST_MESSAGE, message, receiveMessageUserId);
  });

  socket.on(TYPING, (message, roomName) => {
    socket.to(roomName).emit(TYPING, message);
  });

  socket.on(STOP_TYPING, (message, roomName) => {
    socket.to(roomName).emit(STOP_TYPING, message);
  });

  //todo
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
