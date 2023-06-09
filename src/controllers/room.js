const Room = require("../models/room");

const hasRoom = async (req, res) => {
  try {
    const { sender, reciever } = req.query;

    console.log({ sender, reciever });

    const roomA = await Room.findById(`${sender}:${reciever}`);
    if (!!roomA) {
      res.send(roomA);
      return;
    }

    const roomB = await Room.findById(`${reciever}:${sender}`);
    if (!!roomB) {
      res.send(roomB);
      return;
    }

    res.status(401).send("Room not found!");
  } catch (err) {
    res.status(500).send(err.message || "Something went wrong!");
  }
};

const createRoom = async (req, res) => {
  try {
    const { sender, reciever } = req.body;

    const room = new Room({ _id: `${sender}:${reciever}` });

    res.status(201).send(room);
  } catch (err) {
    res.status(500).send(err.message || "Something went wrong!");
  }
};

const getRoom = async (req, res) => {
  try {
    const { sender, reciever } = req.query;

    let room = null;
    let status = 200;

    // check room sender first
    room = await Room.findById(`${sender}:${reciever}`);

    // check room reciver first
    if (!room) {
      room = await Room.findById(`${reciever}:${sender}`);
    }

    // create room
    if (!room) {
      status = 201;
      room = new Room({ _id: `${sender}:${reciever}` });
      room.users.push(sender, reciever);
      await room.save();
    }

    await room.populate("users");
    res.status(status).send(room);
  } catch (err) {
    res.status(500).send(err.message || "Something went wrong!");
  }
};

module.exports = { hasRoom, createRoom, getRoom };
