const users = []

const userJoin = (id, username, room) => {
  const user = { id, username, room };
  users.push(user);
  return user;
}


const userLeave = (id) => {
  const i = users.findIndex(u => u.id === id);
  if (i !== -1) {
    return users.splice(i, 1)[0];
  }
}

const getCurrentUser = (id) => users.find(u => u.id === id);

const getRoomUsers = (room) => users.filter(u => u.room === room);

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
}
