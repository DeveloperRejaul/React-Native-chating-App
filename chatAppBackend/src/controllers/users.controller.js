const User = require("../models/user.model.js");

/********************************************************************************
 * @param {*} req
 * @param {*} res
 * @Discription : Get all User, Request[GET]
 * @Route       : api/users
 * @Access      : Auth user
 * *******************************************************************************/
const allUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).send({ message: "secsses", data: allUsers });
  } catch (error) {
    res.status(400).send({ message: "Error: Not found data" });
  }
};

/********************************************************************************
 * @param {*} req
 * @param {*} res
 * @Discription : Post User or registeration user, Request[POST]
 * @Route       : api/users
 * @Access      : public
 * *******************************************************************************/
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).send({ message: "Please Enter all the Feilds" });
    }

    const existsUser = await User.findOne({ email });
    if (existsUser) {
      res.status(400).send({ message: "User already exists" });
    }

    const newUser = await new User({ name, email, password });
    const user = await newUser.save();

    if (user) {
      res.status(200).send({ message: "secsses", data: user });
    }
  } catch (error) {
    res.status(400).send({ message: "Error: Not found data" });
  }
};

/*********************************************************************************
 * @param {*} req
 * @param {*} res
 * @Discription : login user, Request[POST]
 * @Route       : api/users/login
 * @Access      : public
 * *******************************************************************************/
const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send({ message: "Error: Please Enter all the Feilds" });
    }
    const user = await User.findOne({ email });

    if (user) {
      if (user.password === password) {
        res.status(200).send({ message: "secsses", data: user });
      } else {
        res.status(400).send({ message: "password invalid" });
      }
    } else {
      res.status(400).send({ message: "user not found" });
    }
  } catch (error) {
    res.status(400).send({ message: "Error: Not found data" });
  }
};

module.exports = { allUsers, registerUser, authUser };
