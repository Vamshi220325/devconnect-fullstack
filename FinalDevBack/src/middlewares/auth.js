const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    // ✅ Read token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send("Please Login!");
    }

    const token = authHeader.split(" ")[1];

    // ✅ Verify JWT
    const decodedObj = jwt.verify(token, "DEV@Tinder$790");

    const user = await User.findById(decodedObj._id);

    if (!user) {
      return res.status(401).send("User not found");
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).send("Please Login!");
  }
};

module.exports = {
  userAuth,
};
