const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");
const config = require("./src/config/config.js");
const userRoute = require("./src/routes/user.route.js");
const chatRoute = require("./src/routes/chat.route.js");
const messageRoute = require("./src/routes/message.route.js");
const socketConnection = require("./src/socket/socketConnection.js");
const { CONNECTION } = require("./src/socket/action.js");
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3001"],
  },
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

io.on(CONNECTION, (socket) => socketConnection(socket, io));

server.listen(config.appPort, () => {
  console.log("listening on *:" + config.appPort);
});
