const router = require("express").Router();
const { accessChat } = require("../controllers/chat.controller.js");

router.post("/", accessChat);
// router.get("/", fetchChat);

module.exports = router;
