const { getActiveRooms } = require("../utils/room");
const getConnectedUsers = require("../utils/socket");

const registerChatDataHandler = async (socket, io) => {
  socket.on("joinAll", async () => {
    const rooms = await getActiveRooms(socket.user);

    rooms.forEach((room) => socket.join(room._id.toString()));
    socket.join(socket.user._id.toString());
  });

  // init online users
  const onlineUsers = getConnectedUsers(io);
  io.emit("online_users", onlineUsers);
};

module.exports = registerChatDataHandler;
