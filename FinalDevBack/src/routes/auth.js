const express = require("express");
const authRouter = express.Router();

const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

// ================== SIGNUP ==================
authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    const savedUser = await user.save();

    // 🔥 Generate JWT
    const token = await savedUser.getJWT();

    // ✅ RETURN TOKEN (NO COOKIES)
    res.status(201).json({
      message: "User Added successfully!",
      token,
      user: savedUser,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ================== LOGIN ==================
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // 🔥 Generate JWT
    const token = await user.getJWT();

    // ✅ RETURN TOKEN (NO COOKIES)
    res.status(200).json({
      token,
      user,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ================== LOGOUT ==================
// Frontend will handle logout by deleting token
authRouter.post("/logout", (req, res) => {
  res.json({ message: "Logout successful" });
});

module.exports = authRouter;

