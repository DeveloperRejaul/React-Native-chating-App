// getRoomSpecificUserController;
const { Room } = require("../../models/model.js");

const getRoomSpecificUserController = async (req, res) => {
  const { userId } = req.params;
  try {
    const room = await Room.find({
      members: { $elemMatch: { $in: [userId] } },
    })
      .populate("messages", "text sender createdAt")
      .populate("members", "name ");

    res.status(200).send({ room: room });
  } catch (error) {
    res.status(400).send({ message: "server error" });
  }
};

module.exports = getRoomSpecificUserController;
