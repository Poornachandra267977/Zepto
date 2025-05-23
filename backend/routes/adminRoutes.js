
const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const Admin = require("../models/admin");
const Vendor = require("../models/vendor");
const Product = require("../models/product");
const User = require("../models/user");
const Order = require("../models/order");

// Admin Signup
router.post("/signup", async (req, res) => {
  const { name, email, password, uid, profileImage } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const existing = await Admin.findOne({ email });
    if (existing) return res.status(409).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ name, email, password: hashedPassword, uid, profileImage });
    await admin.save();

    res.status(201).json({ message: "Admin registered", admin });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Admin Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    res.status(200).json({ message: "Admin login successful", admin });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

// Delete Vendor and all their Products
router.delete("/vendor/:id", async (req, res) => {
  try {
    const vendorId = req.params.id;
    // Delete vendor products first
    await Product.deleteMany({ vendorId });
    // Then delete vendor
    await Vendor.findByIdAndDelete(vendorId);

    res.status(200).json({ message: "Vendor and their products deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
});

// Delete a single Product by ID
router.delete("/product/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
});

// Get all Vendors
router.get("/vendors", async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.status(200).json(vendors);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch vendors", error: err.message });
  }
});

// Get all Users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users", error: err.message });
  }
});

// Get all Orders with populated user and product details
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')   // populate user with name and email fields only
      .populate('products', 'name price image'); // populate products with selective fields

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders", error: err.message });
  }
});

module.exports = router;
