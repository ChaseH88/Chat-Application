const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const formatMessage = require('./utils/message');
const { getCurrentUser, userJoin } = require('./utils/users');

// Config
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const PORT = 3000;

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Socket
io.on('connection', (socket) => {

  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);
    socket.join(user.room);
    socket.broadcast.to(user.room).emit('message', formatMessage('Chat Bot', `${username} has joined the chat.`));
  });

  socket.emit('message', formatMessage('Chat Bot', 'Welcome to Chat App'));

  socket.on('disconnect', () => {
    io.emit('message', formatMessage('Chat Bot', 'A user has left'))
  });

  // Listen for events
  socket.on('chatMessage', (message) => {
    io.emit('message', formatMessage('User', message));
  });

});

// Start the server
server.listen(PORT, () => {
  console.log(`Server has started on port: http://localhost:${PORT}/`);
});
