const express = require("express");
const { signup, login, logout, allUsers } = require("../controller/user.controller");
const { auth } = require("../middleware/secureRoute");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Namaste Chat App Server is running");
});
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout",logout);
router.get("/allUsers",auth,allUsers)

module.exports = router;
