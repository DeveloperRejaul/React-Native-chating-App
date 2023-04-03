const { Room } = require("../../models/model.js");

const getMessageController = async (req, res) => {
  const roomId = req.params.roomId;
  try {
    const allMessage = await Room.findById({ _id: roomId }).populate(
      "messages"
    );
    await res.status(200).send({ allMessage });
  } catch (error) {
    console.log(error);
  }
};
module.exports = getMessageController;
