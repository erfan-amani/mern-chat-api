const getConnectedUsers = require("../utils/socket");

const registerChatDataHandler = (socket, io) => {
  const usersList = getConnectedUsers(io);

  io.emit("chatData", usersList);
};

module.exports = registerChatDataHandler;
