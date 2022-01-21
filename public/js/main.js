const chatForm = document.querySelector('#chat-form')
const socket = io();

// Listening for events
socket.on('message', (data) => {
  handleMessage(data)
});

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const msg = e.target.elements.msg.value;

  socket.emit('chatMessage', msg);
});

function handleMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `
    <p class="meta">Chase <span>9:12pm</span></p>
    <p class="text">${message}</p>
  `;
  document.querySelector('.chat-messages').appendChild(div);
}