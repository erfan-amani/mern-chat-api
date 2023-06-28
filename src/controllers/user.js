const Room = require("../models/room");
const User = require("../models/user");
const createError = require("../utils/error");
const validators = require("../validators");

const getProfile = async (req, res, next) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    next(err);
  }
};

const getUserData = async (req, res, next) => {
  try {
    await validators.getUserDataSchema.validateAsync(req.params);

    const userId = req.params.id;

    const user = await User.findById(userId);

    res.send(user);
  } catch (err) {
    next(createError(err));
  }
};

const getUserRooms = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const rooms = await Room.find({ users: { $in: [userId] } });

    res.send(rooms);
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    const token = req.token;
    const user = req.user;

    user.tokens = user.tokens.filter((t) => t.token !== token);
    await user.save();
    res.send();
  } catch (err) {
    next(err);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    await validators.getUserDataSchema.validateAsync(req.params);

    const search = req.query.search;
    const mongooseQuery = {};
    search && (mongooseQuery.username = { $regex: new RegExp(search, "i") });

    const users = await User.find(mongooseQuery);

    res.send(users);
  } catch (err) {
    next(createError(err));
  }
};

module.exports = {
  getProfile,
  getUserData,
  getUserRooms,
  getAllUsers,
  logout,
};
