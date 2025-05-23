
const express = require("express");
const router = express.Router();
const User = require("../models/user");

// POST /api/users/signup
router.post("/signup", async (req, res) => {
  const { name, phone, email, password, uid, profileImage } = req.body;

  if (!name || !phone || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: "Email already registered" });

    const user = new User({ name, phone, email, password, uid, profileImage });
    await user.save();

    res.status(201).json({ message: "User saved to MongoDB", user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
