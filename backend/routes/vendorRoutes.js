const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const Vendor = require("../models/vendor");

// POST /api/vendors/signup
router.post("/signup", async (req, res) => {
  const { name, phone, email, password, uid, profileImage } = req.body;

  if (!name || !phone || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existing = await Vendor.findOne({ email });
    if (existing) return res.status(409).json({ message: "Email already registered" });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const vendor = new Vendor({
      name,
      phone,
      email,
      password: hashedPassword,
      uid,
      profileImage
    });

    await vendor.save();
    res.status(201).json({ message: "Vendor registered", vendor });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// POST /api/vendors/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const vendor = await Vendor.findOne({ email });
    if (!vendor) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, vendor.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    res.status(200).json({ message: "Vendor login successful", vendor });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

module.exports = router;
