const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");
const userRoutes = require("./src/routes/userRoutes.js");
const chatRoutes = require("./src/routes/chatRoutes.js");
const config = require("./src/config/config.js");
const io = new Server(server, {
  cors: { origin: ["http://localhost:3000", "http://172.30.144.1:8081", "*"] },
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
config.dbConnect();

app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);
// app.use("/api/message", messageRoutes);

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
