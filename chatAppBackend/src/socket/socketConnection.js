const socketConnection = (socket, io) => {
  console.log("a user connected: " + socket.id);
  socket.on("disconnect", () => {
    console.log("user disconnected: " + socket.id);
  });

  socket.on("send-message", (data) => {
    console.log(data);
  });

  socket.emit("send-data-from-server", "hello client");
};

module.exports = socketConnection;
