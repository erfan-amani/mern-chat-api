const { getOrCreateRoom, getActiveRooms } = require("../utils/room");
const getConnectedUsers = require("../utils/socket");

const registerChatDataHandler = async (socket, io) => {
  socket.on("join", async ({ otherUserId, roomId }, callback) => {
    if (roomId) {
      socket.join(roomId.toString());
    } else {
      const { room, status } = await getOrCreateRoom(
        socket.user._id,
        otherUserId
      );
      socket.join(room._id.toString());
      status === 201 && io.to(otherUserId).emit("newRoom", room._id);

      callback(room);
    }
  });

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
