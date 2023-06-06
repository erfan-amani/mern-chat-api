const User = require("../models/user");

const register = async (req, res) => {
  const { username, password } = req.body;

  const user = new User({ username, password });
  const token = await user.generateAuthToken();

  res.status(201).send({ user, token });
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findByCredential(username, password);
    const token = await user.generateAuthToken();

    res.send({ user, token });
  } catch (err) {
    res.status(400).send(err.message || err);
  }
};

module.exports = {
  register,
  login,
};
