const express = require('express')
const app = express()
const port = 3080
const http = require('http');

const server = http.createServer(app);

const WebSocket = require('ws');

let data = {};
let connected = false;

/* - Webscript Server - */
const socketIo = require('socket.io');
const io = socketIo(server);
io.on('connection', (socket) => {

  socket.on('pixel', (msg) => {
    if (connected)
      ws.send(msg);
  });
  socket.on('pixels', (msg) => {

    if (connected) {
      ws.send('{"action":"pixels"}');
      io.emit('pixels', JSON.stringify(data));
    }
  });
});


let ws;
/* - Webscript Client - */
function connectWithClient() {
  try {
    ws = new WebSocket('ws://192.168.0.2:3001');

    ws.on('open', function open() {
      console.log('Connected to the server');
      if (ws.readyState === WebSocket.OPEN)
      ws.send('{"action":"pixels"}');
      connected = true;
    });
    
    ws.on('message', function message(d) {
      data = JSON.parse(d.toString());
    });
  
    ws.on('close', function error() {
      setTimeout(connectWithClient, 1000);
      connected = false;
    });

    ws.on('error', function error() {
      setTimeout(connectWithClient, 1000);
      connected = false;
    });
  } catch(e) {
    console.log(e);
    setTimeout(connectWithClient, 1000);
  }
}
connectWithClient();

/* - Actual Server - */
app.use(express.static(__dirname + "/divoom-interface/dist/"));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/divoom-interface/dist/index.html");
})

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})