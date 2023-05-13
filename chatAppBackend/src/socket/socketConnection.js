const {
  DIS_CONNECT,
  SEND_MESSAGE,
  JOIN_ROOM,
  RECEIVE_MESSAGE,
  TYPING,
  STOP_TYPING,
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

  socket.on(SEND_MESSAGE, (roomName, message) => {
    socket.to(roomName).emit(RECEIVE_MESSAGE, message);
  });

  socket.on(TYPING, (message, roomName) => {
    socket.to(roomName).emit(TYPING, message);
  });

  socket.on(STOP_TYPING, (message, roomName) => {
    socket.to(roomName).emit(STOP_TYPING, message);
  });
};

module.exports = socketConnection;
