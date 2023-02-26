const addGroupMemberController = require("../controllers/RoomControllers/addGroupMemberController.js");
const createChatController = require("../controllers/RoomControllers/createChatController.js");
const createGroupChatController = require("../controllers/RoomControllers/createGroupChatController.js");
const getRoomSpecificUserController = require("../controllers/RoomControllers/getRoomSpecificUserController.js");
const getSpecificRoomController = require("../controllers/RoomControllers/getSpecificRoomController.js");
const removeMemberController = require("../controllers/RoomControllers/removeMemberController.js");

const router = require("express").Router();

router.post("/", createChatController);
router.post("/group", createGroupChatController);
router.post("/group/addMember", addGroupMemberController);
router.post("/group/removeMember", removeMemberController);
router.get("/user/:userId", getRoomSpecificUserController);
router.get("/room/:chatRoomId", getSpecificRoomController);

module.exports = router;
