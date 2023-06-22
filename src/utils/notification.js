const { getUserSocketConnection } = require("./socket");

const sendNotification = (io, userId, notification) => {
  const socket = getUserSocketConnection(io, userId);

  socket.emit("notification", notification);
};

module.exports = { sendNotification };
