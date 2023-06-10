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
  console.log("here");

  try {
    const userId = req.user._id.toString();

    const rooms = await Room.find({ users: userId });
    // const rooms = await Room.find({ users: { $in: [user._id.toString()] } });

    res.send(rooms);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message || "Something went wrong!");
  }
};

module.exports = {
  getProfile,
  getUserData,
  getUserRooms,
};
