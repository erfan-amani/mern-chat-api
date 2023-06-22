const { getUserSocketConnection } = require("./socket");
const Notification = require("../models/notification");

const sendNotification = async (io, userId, data) => {
  const socket = getUserSocketConnection(io, userId);

  const notification = new Notification(data);
  await notification.save();

  socket.emit("notification", notification);
};

module.exports = { sendNotification };
