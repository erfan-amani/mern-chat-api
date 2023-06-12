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

module.exports = { createRoom, getRoom };
