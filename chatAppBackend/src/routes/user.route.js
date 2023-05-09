const assecsAllUsersController = require("../controllers/usersControllers/assecsAllUsersController.js");
const createUserController = require("../controllers/usersControllers/createUserController.js");
const loginUserController = require("../controllers/usersControllers/loginUserController.js");
const authMiddleware = require("../middleware/authMiddleware.js");
const upload = require("../middleware/imageUploadMiddleware.js");

const router = require("express").Router();

router.post("/register", upload.single("avatar"), createUserController);
router.post("/login", authMiddleware, loginUserController);
router.get("/", assecsAllUsersController);

module.exports = router;
