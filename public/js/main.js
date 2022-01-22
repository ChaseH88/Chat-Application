const chatForm = document.querySelector('#chat-form')
const chatMessages = document.querySelector('.chat-messages');
const msgTxtBox = document.querySelector('input#msg');
let isTyping = false;

let typingTimer;                //timer identifier
var doneTypingInterval = 2000;  //time in ms, 5 second for example
let $input = msgTxtBox

// Get username and room
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});

const socket = io();

socket.emit('joinRoom', { username, room });
socket.on('start-typing', ({ id, isTyping, text }) => {
  if (id === socket.id) return;
  console.log('TESTING')
  handleTypingMessage({ id, isTyping, text });
});

socket.on('stop-typing', () => {
  console.log('TESTING')
  handleTypingMessage({ isTyping: false });
});

socket.on('roomUsers', ({ room, users }) => {
  document.querySelector('#room-name').innerText = room;
  document.querySelector('#users').innerHTML = users.map(({ username }) => (
    `<li class="name">${username}</li>`
  )).join('');
});

socket.on('message', (data) => {
  handleMessage(data);
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

//on keyup, start the countdown
$input.addEventListener('keyup', function () {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(doneTyping, doneTypingInterval);
});

//on keydown, clear the countdown
$input.addEventListener('keydown', function () {
  socket.emit('start-typing', msg);
  isTyping = true;
  clearTimeout(typingTimer);
});

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const msg = e.target.elements.msg.value;

  socket.emit('chatMessage', msg);
  socket.emit('stop-typing', () => {
    isTyping = false;
  });
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

function doneTyping() {
  socket.emit('stop-typing', () => {
    isTyping = false;
  });
}

function handleMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `
    <p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">${message.text}</p>
  `;
  document.querySelector('.chat-messages').appendChild(div);
}

/**
 *
 * @param {{ id: string, isTyping: boolean, text: string }} message
 */
function handleTypingMessage(message) {
  document.querySelector('.is-typing').innerText =
    message.isTyping ? message.text : '';
}
