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

module.exports = { getOrCreateRoom };
