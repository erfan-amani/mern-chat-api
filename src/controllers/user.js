const Room = require("../models/room");
const User = require("../models/user");

const getProfile = async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(500).send("Something went wrong!");
  }
};

const getUserData = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send("User not found!");
    }

    res.send(user);
  } catch (err) {
    res.status(500).send("Something went wrong!");
  }
};

const getUserRooms = async (req, res) => {
  try {
    const userId = req.user._id;

    const rooms = await Room.find({ users: { $in: [userId] } });

    res.send(rooms);
  } catch (err) {
    res.status(500).send(err.message || "Something went wrong!");
  }
};

const logout = async (req, res) => {
  try {
    const token = req.token;
    const user = req.user;

    user.tokens = user.tokens.filter((t) => t.token !== token);
    await user.save();
    res.send();
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message || "Something went wrong!");
  }
};

module.exports = {
  getProfile,
  getUserData,
  getUserRooms,
  logout,
};
