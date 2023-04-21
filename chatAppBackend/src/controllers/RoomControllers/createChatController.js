const { Room, User } = require("../../models/model.js");

/**
 * @param {Object} req
 * @param {Object} res
 * @Title : Create Chat Room
 * @method : [POST]
 * @route : "http://localhost:3000/api/chat"
 */
const createChatController = async (req, res) => {
  try {
    const { userId, otherUserId } = req.body;

    // Check if both users exist
    const user = await User.findById(userId);
    const otherUser = await User.findById(otherUserId);

    if (!user || !otherUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if chat room already exists
    const chatRoom = await Room.findOne({
      members: { $all: [userId, otherUserId] },
      isOneOnOneChat: true,
    });

    if (chatRoom) {
      return res.status(200).json(chatRoom._id);
    }

    // Create new chat room
    const newChatRoom = new Room({
      members: [userId, otherUserId],
      isOneOnOneChat: true,
    });

    await newChatRoom.save();
    res.status(201).json(newChatRoom);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = createChatController;
