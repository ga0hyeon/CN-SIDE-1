import express from 'express';
import http from 'http';
import { config } from 'dotenv';
import { Server } from 'socket.io';


config({ path: `./${process.env.NODE_ENV}.env` });

const app = express();
const server = http.createServer(app);

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

server.listen(process.env.PORT, () => {
  console.log(`listening on *:${process.env.PORT}`);
});

const io = new Server(server)

io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
 
  socket.on('chat', (msg) => {
    io.emit('chat', msg)
  });
});
