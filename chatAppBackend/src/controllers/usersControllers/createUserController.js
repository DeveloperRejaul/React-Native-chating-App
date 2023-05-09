const { json } = require("express");
const { User } = require("../../models/model.js");

/**
 * @param {object} req
 * @param {object} res
 * @method : POST
 * @url :"http://localhost:3000/api/user/register/"
 */

const createUserController = async (req, res) => {
  const stringData = JSON.parse(req.body.data);
  const name = stringData.name;
  const email = stringData.email;
  const password = stringData.password;

  try {
    const imageURL =
      req.protocol + "://" + req.get("host") + "/" + req.file.filename;

    const newUser = new User({
      name,
      email,
      password,
      profilePicture: imageURL,
    });
    await newUser.save();
    res.status(200).send({ message: "success" });
  } catch (error) {
    res.status(400).send({ message: "internal server error" });
  }
};
module.exports = createUserController;
