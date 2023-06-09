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

    console.log({ sender, reciever });

    // check room sender first
    const roomA = await Room.findById(`${sender}:${reciever}`);
    if (!!roomA) {
      res.send(roomA);
      return;
    }

    // check room reciver first
    const roomB = await Room.findById(`${reciever}:${sender}`);
    if (!!roomB) {
      res.send(roomB);
      return;
    }

    // create room
    const room = new Room({ _id: `${sender}:${reciever}` }).save();
    res.status(201).send(room);
  } catch (err) {
    res.status(500).send(err.message || "Something went wrong!");
  }
};

module.exports = { hasRoom, createRoom, getRoom };
