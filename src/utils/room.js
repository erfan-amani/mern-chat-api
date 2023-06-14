const Room = require("../models/room");

const getOrCreateRoom = async (sender, reciever) => {
  let room = null;
  let status = 200;

  // check if exist
  room = await Room.findOne({ users: { $all: [sender, reciever] } });

  // create room
  if (!room) {
    status = 201;
    room = new Room();
    room.users.push(sender, reciever);
    await room.save();
  }

  await room.populate("users");

  return { room, status };
};

const getActiveRooms = async (user, updatedRoomId) => {
  const query = {
    users: { $in: [user._id] },
    lastMessage: { $exists: true },
  };

  !!updatedRoomId && (query._id = updatedRoomId);
  const rooms = await Room.find(query)
    .sort({ updatedAt: -1 })
    .populate("users")
    .populate("lastMessage")
    .exec();

  return !!updatedRoomId ? rooms[0] : rooms;
};

module.exports = { getOrCreateRoom, getActiveRooms };
