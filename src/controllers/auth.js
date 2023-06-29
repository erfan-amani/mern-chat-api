const User = require("../models/user");
const createError = require("../utils/error");
const validators = require("../validators");

const register = async (req, res, next) => {
  try {
    await validators.registerSchema.validateAsync(req.body);
    const { username, password } = req.body;

    const user = new User({ username, password });
    const token = await user.generateAuthToken();

    res.status(201).send({ user, token });
  } catch (error) {
    if (error.name === "MongoServerError" && error.code === 11000) {
      next({ message: "Username is in use!", status: 400 });
    } else {
      next(createError(error));
    }
  }
};

const login = async (req, res, next) => {
  try {
    await validators.loginSchema.validateAsync(req.body);
    const { username, password } = req.body;

    const user = await User.findByCredential(username, password);
    const token = await user.generateAuthToken();

    res.send({ user, token });
  } catch (error) {
    next(createError(error));
  }
};

module.exports = {
  register,
  login,
};
