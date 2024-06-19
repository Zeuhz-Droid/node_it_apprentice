const { Router } = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = Router();

router.post("/login", authController.login);
router.post("/signup", authController.signup);

router.route("/").get(userController.getUsers);

module.exports = router;
