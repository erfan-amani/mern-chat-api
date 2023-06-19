const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    pending: { type: Boolean, required: true, default: true },
    users: [{ type: mongoose.Types.ObjectId, ref: "User", required: true }],
    lastMessage: {
      type: mongoose.Types.ObjectId,
      ref: "Message",
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

roomSchema.virtual("messages", {
  ref: "Message",
  localField: "_id",
  foreignField: "room",
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
