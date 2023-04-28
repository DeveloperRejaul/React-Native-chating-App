const { Message, Room } = require("../../models/model.js");

/**
 * @param {Object} req
 * @param {Object} res
 * @Title : Create Chat Message
 * @method : [POST]
 * @route : "http://localhost:3000/api/message"
 */

const sendMessageController = async (req, res) => {
  const { text, sender, chatRoom } = req.body;
  try {
    const message = new Message({ text, sender, chatRoom });
    const newMessage = await message.save();
    await Room.findByIdAndUpdate(
      { _id: chatRoom },
      { $push: { messages: newMessage._id } }
    );
    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = sendMessageController;
