const { User } = require("../../models/model.js");

const assecsAllUsersController = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send({ users });
  } catch (error) {
    res.status(400).send({ message: "server error" });
  }
};
module.exports = assecsAllUsersController;
