const { Room } = require("../../models/model.js");

const createGroupChatController = async (req, res) => {
  try {
    const { userId, otherUserId } = req.body;

    const newOtherUserId = [];
    for (const key in otherUserId) {
      newOtherUserId.push(otherUserId[key]);
    }

    // Create new chat room
    const newChatRoom = new Room({
      members: [userId, ...newOtherUserId],
      isOneOnOneChat: false,
    });

    await newChatRoom.save();
    res.status(201).json(newChatRoom);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = createGroupChatController;
