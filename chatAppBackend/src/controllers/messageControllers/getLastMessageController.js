const { Room } = require("../../models/model");

/**
 *
 * @param {object} req
 * @param {object} res
 *
 * @method :GET
 * @url :"http://localhost:3000/api/message/lastMessage/:userId"
 * @description : GET all latest messages by user id
 *
 */
const getLastMessageController = async (req, res) => {
  const userId = req.params.userId;

  try {
    const allRooms = await Room.find({ members: { $all: [userId] } })
      .select({
        members: 1,
        messages: 1,
      })
      .populate("messages", "createdAt text -_id");

    await res.send({ allRooms });
  } catch (error) {
    console.log(error.message);
    await res.send({ error: error.message });
  }
};

module.exports = getLastMessageController;
