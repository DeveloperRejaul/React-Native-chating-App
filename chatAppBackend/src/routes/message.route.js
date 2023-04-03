const getMessageController = require("../controllers/messageControllers/getMessageController.js");
const sendMessageController = require("../controllers/messageControllers/sendMessageController.js");

const router = require("express").Router();

router.post("/", sendMessageController);
router.get("/:roomId", getMessageController);

module.exports = router;
