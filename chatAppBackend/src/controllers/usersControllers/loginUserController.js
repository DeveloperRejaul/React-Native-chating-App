const { User } = require("../../models/model.js");

/**
 * @param {Object} req
 * @param {Object} res
 * @Title : user login
 * @method : [POST]
 * @route : "http://localhost:3000/api/user/login/"
 *
 */
const loginUserController = async (req, res) => {
  const { password, email, token } = req;

  try {
    const user = await User.findOne({ email });
    if (user.password === password) {
      res.status(200).send({
        message: "user is ok",
        token: token,
        email: email,
        userId: user._id,
      });
    }
  } catch (error) {
    res.status(400).send({ message: "server error" });
  }
};
module.exports = loginUserController;
