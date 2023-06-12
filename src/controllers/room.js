const Room = require("../models/room");

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
    res.status(status).send(room);
  } catch (err) {
    next(err);
  }
};

module.exports = { createRoom, getRoom };
