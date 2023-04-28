import { io } from "socket.io-client";
const SOCKET_URL = "http://localhost:3000";

class SocketServices {
  initializeSocket = async () => {
    try {
      this.socket = io(SOCKET_URL);

      this.socket.on("connect", () => {
        console.log("socket connected id:" + this.socket.id);
      });

      this.socket.on("disconnect", () => {
        console.log("disconnected: " + this.socket.id);
      });

      this.socket.on("error", (err) => {
        console.log("socket error" + err);
      });
    } catch (error) {
      console.log("socket is not Initialize");
    }
  };

  emit(event, data, callback) {
    this.socket.emit(event, data, callback);
  }
  on(event, cb) {
    this.socket.on(event, cb);
  }
  off(eventName, cb) {
    this.socket.off(eventName, cb);
  }
}

export const socketServices = new SocketServices();
