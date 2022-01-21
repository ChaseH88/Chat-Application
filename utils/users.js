const users = []

const userJoin = (id, username, room) => {
  const user = { id, username, room };
  users.push(user);
  return user;
}

const getCurrentUser = (id) => users.find(u => u.id === id);

module.exports = {
  userJoin,
  getCurrentUser
}
