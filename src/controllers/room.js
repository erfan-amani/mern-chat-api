const Room = require("../models/room");
const { getOrCreateRoom, getActiveRooms } = require("../utils/room");

const getRoom = async (req, res, next) => {
  try {
    const { sender, reciever } = req.query;

    const { room, status } = await getOrCreateRoom(sender, reciever);

    res.status(status).send(room);
  } catch (err) {
    next(err);
  }
};

const activeRooms = async (req, res, next) => {
  try {
    const search = req.query.search;
    const mongooseQuery = {};
    search &&
      (mongooseQuery.users = { username: { $regex: new RegExp(search, "i") } });

    const rooms = await getActiveRooms(req.user, null, mongooseQuery);

    res.send(rooms);
  } catch (err) {
    next(err);
  }
};

module.exports = { getRoom, activeRooms };
