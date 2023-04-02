const { Message, Room } = require("../../models/model.js");

const getMessageController = async (req, res) => {
  const roomId = req.body.roomId;

  try {
    const allMessage = await Room.findById({ _id: roomId }).populate(
      "messages"
    );

    res.status(200).send({ allMessage });
  } catch (error) {
    console.log(error);
  }
};
module.exports = getMessageController;
