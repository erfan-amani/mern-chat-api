const Room = require("../models/room");
const { getOrCreateRoom, getActiveRooms } = require("../utils/room");

const getRoom = async (req, res, next) => {
  try {
    const other = req.query.other;

    const { room, status } = await getOrCreateRoom(req.user._id, other);

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

const getAllRooms = async (req, res, next) => {
  try {
    const query = req.query;
    const dbQuery = {};

    query.pending && (dbQuery.pending = query.pending);
    dbQuery.users = {
      $all: query.otherId ? [req.user._id, query.otherId] : [req.user._id],
    };

    const requestedRooms = await Room.find(dbQuery);

    res.send(requestedRooms);
  } catch (err) {
    next(err);
  }
};

module.exports = { getRoom, activeRooms, getAllRooms };
