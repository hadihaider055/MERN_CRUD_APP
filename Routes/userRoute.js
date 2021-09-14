const router = require("express").Router();
const userController = require("../Controllers/userCtrl");
const auth = require("../Middleware/auth");

// Register User
router.post("/register", userController.userRegister);

// Login User
router.post("/login", userController.userLogin);

// Verify Token
router.get("/verify", userController.verifiedToken);

module.exports = router;
