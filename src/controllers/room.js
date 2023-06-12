const Room = require("../models/room");
const { getOrCreateRoom } = require("../utils/room");

const createRoom = async (req, res, next) => {
  try {
    const { sender, reciever } = req.body;

    const room = new Room();
    room.users.push(sender, reciever);
    await room.save();

    res.status(201).send(room);
  } catch (err) {
    next(err);
  }
};

const getRoom = async (req, res, next) => {
  try {
    const { sender, reciever } = req.query;

    const { room, status } = await getOrCreateRoom(sender, reciever);

    res.status(status).send(room);
  } catch (err) {
    next(err);
  }
};

const getActiveRooms = async (req, res, next) => {
  try {
    const user = req.user;

    const userRooms = await Room.find({
      users: { $in: [user._id] },
    })
      .populate("users")
      .exec();

    const output = [];
    for (const index in userRooms) {
      const room = userRooms[index].toObject();

      room.otherUser = room.users.find((u) => u._id !== req.user._id);
      room.lastMessage = await userRooms[index].getLastMessage();

      delete room.users;
      delete room?.otherUser?.tokens;
      delete room?.otherUser?.password;

      room.lastMessage && output.push(room);
    }

    res.send(output);
  } catch (err) {
    next(err);
  }
};

module.exports = { createRoom, getRoom, getActiveRooms };
