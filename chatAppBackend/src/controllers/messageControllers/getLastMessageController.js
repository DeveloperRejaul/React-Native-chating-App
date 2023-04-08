const { Room } = require("../../models/model");

const getLastMessageController = async (req, res) => {
  const userId = req.params.userId;
  //   console.log(userId);
  try {
    const allRooms = await Room.find({ members: { $all: [userId] } })
      .select({
        members: 1,
        messages: 1,
      })
      .populate("messages", "text -_id");

    const lastMessagesInfo = await allRooms.map((data) => {
      const receiverId = data.members[1];
      const lastMessage = data.messages[data.messages.length - 1];
      return {
        receiverId,
        lastMessage: lastMessage.text,
      };
    });
    res.send({ lastMessagesInfo });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = getLastMessageController;
