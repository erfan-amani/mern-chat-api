const jwt = require("jsonwebtoken");
const User = require("../models/user");

const apiAuth = async (req, res, next) => {
  try {
    const bearer = req.header("Authorization");
    const token = bearer.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id, "tokens.token": token });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.token = token;

    next();
  } catch (err) {
    res.status(401).send("Not authorized!");
  }
};

const socketAuth = async (socket, next) => {
  const token = socket.handshake.auth.token;

  try {
    if (!token) throw new Error();

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id });

    if (!user) throw new Error();

    socket.user = user;
    socket.token = token;

    next();
  } catch (err) {
    next(new Error("Not authorized. Please provide a valid token!"));
  }
};

module.exports = { apiAuth, socketAuth };
