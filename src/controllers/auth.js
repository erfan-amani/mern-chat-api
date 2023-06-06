const User = require("../models/user");

const register = async (req, res) => {
  const { username, password } = req.body;

  const user = new User({ username, password });
  const token = await user.generateAuthToken();

  res.status(201).send({ user, token });
};

module.exports = {
  register,
};
