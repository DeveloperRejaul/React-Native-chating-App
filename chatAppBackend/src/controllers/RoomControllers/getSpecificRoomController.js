const { Room } = require("../../models/model.js");

const getSpecificRoomController = async (req, res) => {
  const { chatRoomId } = req.params;

  try {
    const room = await Room.findById({ _id: chatRoomId })
      .populate("members", "name ")
      .populate("messages", "text sender createdAt");
    res.status(200).send({ room: room });
  } catch (error) {
    res.status(200).send({ message: "server error" });
  }
};

module.exports = getSpecificRoomController;
