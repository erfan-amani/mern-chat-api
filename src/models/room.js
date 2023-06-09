const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
