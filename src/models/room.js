const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    users: [{ type: mongoose.Types.ObjectId, ref: "User", required: true }],
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
