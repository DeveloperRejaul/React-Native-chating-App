const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String },
  status: { type: String, default: "ofline" },
});

const ChatRoomSchema = new mongoose.Schema({
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  isOneOnOneChat: { type: Boolean, default: true },
});

const MessageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  chatRoom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

exports.User = mongoose.model("User", UserSchema);
exports.Room = mongoose.model("Room", ChatRoomSchema);
exports.Message = mongoose.model("Message", MessageSchema);
