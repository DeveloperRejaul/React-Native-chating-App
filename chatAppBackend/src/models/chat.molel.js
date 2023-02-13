const mongoose = require("mongoose");

const chatModel = mongoose.Schema({
  constent: [
    {
      data: { type: String },
      type: { type: String },
    },
  ],
  sender: { type: mongoose.Types.ObjectId, ref: "User" },
  resiver: { type: mongoose.Types.ObjectId, ref: "User" },
});

const Chat = mongoose.model("Chat", chatModel);
module.exports = Chat;
