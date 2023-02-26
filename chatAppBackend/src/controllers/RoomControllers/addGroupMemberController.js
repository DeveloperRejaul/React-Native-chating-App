const { Room } = require("../../models/model.js");

const addGroupMemberController = async (req, res) => {
  try {
    const { userId, otherUserId, roomId } = req.body;

    const newOtherUserId = [];
    for (const key in otherUserId) {
      newOtherUserId.push(otherUserId[key]);
    }
    const isGroupMember = await Room.findOne({
      members: { $all: [userId] },
      isOneOnOneChat: false,
    });
    if (isGroupMember) {
      const updatedRoom = await Room.findOneAndUpdate(
        {
          _id: roomId,
        },
        {
          $push: { members: [...newOtherUserId] },
        }
      );
      res.status(200).json(updatedRoom);
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = addGroupMemberController;
