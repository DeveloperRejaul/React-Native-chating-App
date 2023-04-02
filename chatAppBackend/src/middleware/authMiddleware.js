const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const token = await jwt.sign(
      {
        email: req.body.email,
        password: req.body.password,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15d" }
    );
    req.email = req.body.email;
    req.password = req.body.password;
    req.token = token;

    next();
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = authMiddleware;
