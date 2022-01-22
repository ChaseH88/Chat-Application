const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const { formatMessage, formatTypingMessage } = require('./utils/message');
const { getCurrentUser, userJoin, userLeave, getRoomUsers } = require('./utils/users');

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
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });

  socket.emit('message', formatMessage('Chat Bot', 'Welcome to Chat App'));

  socket.on('disconnect', () => {
    const user = userLeave(socket.id);
    if (user) {
      io.to(user.room).emit('message', formatMessage('Chat Bot', `${user.username} has left the chat.`))
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });

  // Listen for events
  socket.on('chatMessage', (message) => {
    const user = getCurrentUser(socket.id);
    io.to(user.room).emit('message', formatMessage(user.username, message));
  });

  socket.on('start-typing', () => {
    const user = getCurrentUser(socket.id);
    if (!user) return;
    io.to(user.room).emit('start-typing', formatTypingMessage(user.username, true, socket.id));
  });

  socket.on('stop-typing', () => {
    const user = getCurrentUser(socket.id);
    if (!user) return;
    io.to(user.room).emit('stop-typing', formatTypingMessage(user.username, false, socket.id));
  });

});

// Start the server
server.listen(PORT, () => {
  console.log(`Server has started on port: http://localhost:${PORT}/`);
});
