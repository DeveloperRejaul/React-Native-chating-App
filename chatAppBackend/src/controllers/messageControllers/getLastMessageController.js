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

    const lastMessagesInfo = await allRooms.map((data) => {
      const receiverId = data.members.filter((id) => id != userId);
      const lastMessage = data.messages[data.messages.length - 1];
      return {
        receiverId: receiverId[0],
        lastMessage: lastMessage.text,
      };
    });
    res.send({ lastMessagesInfo });
  } catch (error) {
    console.log(error.message);
  }
};
// id != userId

module.exports = getLastMessageController;
