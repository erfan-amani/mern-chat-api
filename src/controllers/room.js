const Room = require("../models/room");
const {
  getActiveRooms,
  getSentRequests,
  getReceivedRequests,
} = require("../utils/room");

const getOneRoom = async (req, res, next) => {
  try {
    const room = await Room.findOne({
      users: { $all: [req.user._id, req.query.other] },
    });

    res.send(room);
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

    const rooms = await Room.find(dbQuery).populate("users").exec();

    res.send(rooms);
  } catch (err) {
    next(err);
  }
};

const sendContactRequest = async (req, res, next) => {
  try {
    const other = req.body.other;

    const existedRoom = await Room.findOne({
      users: { $all: [req.user._id, other] },
    });

    if (!!existedRoom) throw new Error("A request has already sent!");

    const room = new Room({ users: [req.user._id, other] });
    await room.save();

    res.send(room);
  } catch (err) {
    next(err);
  }
};

const rejectContactRequest = async (req, res, next) => {
  try {
    const id = req.params.id;

    const room = await Room.findByIdAndDelete(id);

    res.send(room);
  } catch (err) {
    next(err);
  }
};

const acceptContactRequest = async (req, res, next) => {
  try {
    const id = req.body.id;

    const room = await Room.findById(id);
    room.pending = false;
    await room.save();

    res.send(room);
  } catch (err) {
    next(err);
  }
};

const getSentContactRequests = async (req, res, next) => {
  try {
    const sentRequests = await getSentRequests(req.user);

    res.send(sentRequests);
  } catch (err) {
    next(err);
  }
};

const getReceivedContactRequests = async (req, res, next) => {
  try {
    const receivedRequests = await getReceivedRequests(req.user);

    res.send(receivedRequests);
  } catch (err) {
    next(err);
  }
};

const getRoomUsers = async (req, res, next) => {
  try {
    const room = await Room.findById(req.query.id).populate("users");

    const users = room.users.filter((u) => u._id !== req.user._id);

    res.send(users);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getOneRoom,
  activeRooms,
  getAllRooms,
  sendContactRequest,
  rejectContactRequest,
  acceptContactRequest,
  getSentContactRequests,
  getReceivedContactRequests,
  getRoomUsers,
};
