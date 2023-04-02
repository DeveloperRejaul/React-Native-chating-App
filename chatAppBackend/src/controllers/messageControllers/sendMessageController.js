const { Message, Room } = require("../../models/model.js");

const sendMessageController = async (req, res) => {
  // console.log(text, sender, chatRoom);

  try {
    const { text, sender, chatRoom } = req.body;
    const message = new Message({ text, sender, chatRoom });
    const newMessage = await message.save();

    await Room.findByIdAndUpdate(
      { _id: chatRoom },
      { $push: { messages: newMessage._id } }
    );

    // Emit message to chat room
    // req.io.emit(`message_${chatRoom}`, message);
    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = sendMessageController;
