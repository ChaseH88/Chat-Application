const moment = require('moment');

const formatMessage = (username, text) => ({
  username,
  text,
  time: moment().format('h:mm a')
});

const formatTypingMessage = (username, isTyping, id) => ({
  id,
  isTyping,
  text: isTyping ? `${username} is typing...` : ''
});

module.exports = {
  formatMessage,
  formatTypingMessage
};
