const mongoose = require("mongoose");
const Message = require("./message");

const roomSchema = new mongoose.Schema(
  {
    users: [{ type: mongoose.Types.ObjectId, ref: "User", required: true }],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

roomSchema.virtual("messages", {
  ref: "Message",
  localField: "_id",
  foreignField: "room",
});

roomSchema.methods.getLastMessage = async function () {
  const lastMessage = await Message.findOne({ room: this._id }).sort({
    createdAt: -1,
  });

  return lastMessage;
};

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
