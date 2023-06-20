const { getActiveRooms } = require("../utils/room");
const getConnectedUsers = require("../utils/socket");

const registerChatDataHandler = async (socket, io) => {
  socket.on("joinAll", async () => {
    const rooms = await getActiveRooms(socket.user);

    rooms.forEach((room) => socket.join(room._id.toString()));
    socket.join(socket.user._id.toString());
  });

  // init active rooms
  const rooms = await getActiveRooms(socket.user);
  socket.emit("activeRooms", rooms);

  // init online users
  const onlineUsers = getConnectedUsers(io);
  io.emit("onlineUsers", onlineUsers);
};

module.exports = registerChatDataHandler;
