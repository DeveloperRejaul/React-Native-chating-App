const { User } = require("../../models/model.js");

const createUserController = async (req, res) => {
  const { name, email, password } = req.body;

  console.log(req.body);
  try {
    const newUser = new User({
      name,
      email,
      password,
    });
    await newUser.save();
    res.status(200).send({ user: newUser });
  } catch (error) {
    res.status(400).send({ message: "server error" });
  }
};
module.exports = createUserController;
