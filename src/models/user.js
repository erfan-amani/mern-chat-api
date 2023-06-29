const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const createError = require("../utils/error");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    tokens: [{ token: { type: String, required: true } }],
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = async function () {
  const user = this;

  const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET);
  user.tokens = user.tokens.concat({ token });

  await user.save();

  return token;
};

userSchema.methods.toJSON = function () {
  const user = this;
  const userObj = user.toObject();

  delete userObj.tokens;
  delete userObj.password;

  return userObj;
};

userSchema.statics.findByCredential = async function (username, password) {
  const user = await User.findOne({ username });

  if (!user) {
    throw { message: "User not found!", status: 404 };
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw { message: "Password is not match with username!", status: 400 };
  }

  return user;
};

userSchema.pre("save", async function (next) {
  const user = this;

  try {
    if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password, 8);
    }

    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
