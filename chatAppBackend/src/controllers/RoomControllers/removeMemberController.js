const { Room } = require("../../models/model.js");

const removeMemberController = async (req, res) => {
  try {
    const { userId, otherUserId, roomId } = req.body;

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
          $pull: { members: { $in: [otherUserId] } },
        }
      );
      res.status(200).json(updatedRoom);
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = removeMemberController;
