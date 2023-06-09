const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    users: [{ type: mongoose.Types.ObjectId, ref: "User", required: true }],
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
