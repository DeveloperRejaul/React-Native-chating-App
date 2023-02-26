const sendMessageController = require("../controllers/messageControllers/sendMessageController.js");

const router = require("express").Router();

router.post("/", sendMessageController);

module.exports = router;
