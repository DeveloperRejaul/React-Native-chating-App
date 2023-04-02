import socketIO from 'socket.io-client';
import appInfo from '../constent/appInfo.js';

const SOCKET_URL = appInfo.url;

class Websocket {
  InitializeSocket = async () => {
    try {
      this.socket = socketIO.connect(SOCKET_URL, {
        transports: ['websocket'],
        jsonp: false,
      });

      this.socket.on('connect', () => {
        console.log('connected: ' + this.socket.id);
      });

      this.socket.on('disconnect', () => {
        console.log('disconnected: ' + this.socket.id);
      });

      this.socket.on('error', err => {
        console.log('socket error' + err);
      });
    } catch (error) {
      console.log('socket is not Initialize');
    }
  };

  emit(event, data, callback) {
    this.socket.emit(event, data, callback);
  }
  on(event, cb) {
    this.socket.on(event, cb);
  }
}

const websocket = new Websocket();
export default websocket;
