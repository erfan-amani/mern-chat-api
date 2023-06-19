const { getOrCreateRoom, getActiveRooms } = require("../utils/room");
const getConnectedUsers = require("../utils/socket");

const registerChatDataHandler = async (socket, io) => {
  // CREATE ROOM WITH PENDING TRUE
  socket.on("contact_request", async (otherUserId, callback) => {
    const { room, status } = await getOrCreateRoom(
      socket.user._id,
      otherUserId
    );

    socket.join(room._id.toString());
    status === 201 && io.to(otherUserId).emit("newRoom", room._id);

    callback(room);
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
