const { Room } = require("../../models/model.js");

/**
 * @param {object} req
 * @param {object} res
 * @title : GET all message by room id.
 * @description : when component fist time render.
 * @method :GET URL: http://localhost:3000/api/message/:roomId
 */
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
