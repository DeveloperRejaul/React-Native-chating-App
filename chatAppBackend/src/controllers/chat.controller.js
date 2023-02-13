const Chat = require("../models/chat.molel.js");

/***************************************************************************************
 * @param {*} req
 * @param {*} res
 * @description     : create user ar fetch user for ono to one chat,[POST]
 * @route           : /api/chat/
 * @access          : auth user
 ****************************************************************************************/
const accessChat = async (req, res) => {
  const { sender, resiver, constent } = req.body;
  const { data, type } = constent;

  if (!sender || !resiver) {
    res.status(400).send({ message: "data requre" });
  }

  try {
    const preChat = await Chat.findOne({
      $or: [
        { $and: [{ sender: req.body.sender }, { resiver: req.body.resiver }] },
        { $and: [{ sender: req.body.resiver }, { resiver: req.body.sender }] },
      ],
    });

    if (preChat) {
      const updatedChat = await Chat.findOneAndUpdate(
        { _id: preChat._id },
        {
          $push: {
            constent: {
              $each: [{ data: data, type: type }],
            },
          },
        },
        { new: true }
      )
        .populate("sender", "name picture -_id")
        .populate("resiver", "name picture -_id");
      res.send({ prv: updatedChat });
    } else {
      const newChat = await new Chat({
        sender: req.body.sender,
        resiver: req.body.resiver,
        constent: [{ data: data, type: type }],
      });
      await newChat.save();
      res.status(200).send({ up: newChat });
    }
  } catch (error) {
    res.status(400).send({ message: "Something Wrong" });
  }
};

module.exports = { accessChat };
