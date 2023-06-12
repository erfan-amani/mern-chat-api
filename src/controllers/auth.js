const User = require("../models/user");
const createError = require("../utils/error");

const register = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = new User({ username, password });
    const token = await user.generateAuthToken();

    res.status(201).send({ user, token });
  } catch (err) {
    if (err.name === "MongoServerError" && err.code === 11000) {
      next(createError("Username is in use!", 400));
    } else {
      next(createError());
    }
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findByCredential(username, password);
    const token = await user.generateAuthToken();

    res.send({ user, token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};
