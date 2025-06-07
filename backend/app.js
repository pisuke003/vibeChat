const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const authRouter = require('./controllers/authController');
const userRouter = require('./controllers/userController');
const chatRouter = require('./controllers/chatController');
const messageRouter = require('./controllers/messgaeController');

const app = express();


app.use(cors({ origin: 'http://localhost:5173', credentials: true })); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/chat', chatRouter);
app.use('/api/message', messageRouter);


const server = http.createServer(app);


const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log('Socket connected: ' + socket.id);

  socket.on('join-room', (userid) => {
    socket.join(userid);
    
  });

 socket.on('send-message', (message) => {
  io
    .to(message.members[0])
    .to(message.members[1])
    .emit('receive-message', message); 
});

 
});

// Export server for use in server.js
module.exports = server;
