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
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

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
// wss.on('connection', function connection(wsss) {
//   wsss.on('message', function incoming(message) {
//     const json = JSON.parse(message.toString());
//     const action = json.action;

//     if (action == 'pixel') {

//       console.log(message.toString());
//     } else {
//       console.log("Getting pixels");
//       if (connected)
//         ws.send('{"action":"pixels"}');
//       wsss.send(JSON.stringify(data));
//     }
//   });
// });


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

// app.get('/pixels', async (req, res) => {
//   ws.send('{"action":"pixels"}');
//   res.send(JSON.stringify(data));
// })


// app.post('/pixel', async(req, res) => {
//   ws.send('{"action":"pixel", "x":' + req.body.x + ', "y":' + req.body.y + ', "color":"' + req.body.color + '"}');
//   res.sendStatus(200);
// });

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})