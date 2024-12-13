const jwt = require("jsonwebtoken");
const { User } = require("../model/user.model");
const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedUser) {
      return res.status(401).json({ msg: "Token is invalid" });
    }
    console.log("decodedUser -> " + decodedUser);

    const user = await User.findById(decodedUser.userId).select(["-password","-confirmPassword"]);
    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
};

module.exports = { auth };
