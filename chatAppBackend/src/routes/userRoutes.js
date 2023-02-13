const router = require("express").Router();
const {
  allUsers,
  registerUser,
  authUser,
} = require("../controllers/users.controller.js");

router.get("/", allUsers);
router.post("/", registerUser);
router.post("/login", authUser);

module.exports = router;
