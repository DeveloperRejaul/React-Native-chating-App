const { User } = require("../../models/model.js");

/**
 * @param {Object} _req
 * @param {Object} res
 * @Title : Get All users
 * @method : [GET]
 * @route : "http://localhost:3000/api/user"
 *
 */

const assecsAllUsersController = async (_req, res) => {
  try {
    const users = await User.find().select({ password: 0, email: 0 });
    await res.status(200).send({ users });
  } catch (error) {
    await res.status(400).send({ message: "server error" });
  }
};
module.exports = assecsAllUsersController;
