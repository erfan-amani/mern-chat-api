const { getUserSocketConnection } = require("./socket");

const sendNotification = (io, userId, notification) => {
  console.log(userId);
  const socket = getUserSocketConnection(io, userId);

  console.log(socket.to);

  socket.emit("notification", notification);
};

module.exports = { sendNotification };
