const assecsAllUsersController = require("../controllers/usersControllers/assecsAllUsersController.js");
const createUserController = require("../controllers/usersControllers/createUserController.js");
const loginUserController = require("../controllers/usersControllers/loginUserController.js");

const router = require("express").Router();

router.post("/register/", createUserController);
router.post("/login/", loginUserController);
router.get("/", assecsAllUsersController);

module.exports = router;
