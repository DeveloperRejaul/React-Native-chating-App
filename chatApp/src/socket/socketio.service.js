import socketIO from 'socket.io-client';
// Initialize Socket IO:
const SOCKET_URL = 'http://172.30.144.1:3000/';

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

  emit(event, data = {}) {
    this.socket.emit(event, data);
  }
  on(event, cb) {
    this.socket.on(event, cb);
  }

  // removeListener(event, listenerName) {
  //   this.socket.removeListener(event, listenerName);
  // }
}

const websocket = new Websocket();
export default websocket;
