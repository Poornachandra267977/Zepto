
const express = require("express");
const router = express.Router();
const Order = require("../models/order");

// Admin: Get all orders with populated user and products
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email phone")
      .populate("products.productId", "name image price category");

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders", error: err.message });
  }
});

// Admin: Delete an order by ID
router.delete("/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
});

// User: Get orders by userId
router.get("/user/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId })
      .populate("products.productId", "name image price category");
      
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user orders", error: err.message });
  }
});

// Create new order
// 
router.post("/create", async (req, res) => {
  const { user, products } = req.body;

  if (!user || !products || products.length === 0) {
    return res.status(400).json({ message: "User and products are required" });
  }

  try {
    const newOrder = new Order({
      userId: user._id,
      userName: user.name,
      products,
      totalAmount: products.reduce((sum, p) => sum + p.price * (p.quantity || 1), 0),
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed", order: newOrder });
  } catch (err) {
    res.status(500).json({ message: "Failed to create order", error: err.message });
  }
});


module.exports = router;
