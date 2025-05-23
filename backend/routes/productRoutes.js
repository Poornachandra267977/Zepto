
const express = require("express");
const router = express.Router();
const Product = require("../models/product");

// ✅ Search products
router.get("/search", async (req, res) => {
  try {
    const query = req.query.q || "";
    const regex = new RegExp(query, "i");

    const results = await Product.find({
      $or: [
        { name: { $regex: regex } },
        { category: { $regex: regex } }
      ]
    });

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: "Search failed" });
  }
});

// ✅ Add product (for vendor)
router.post("/add", async (req, res) => {
  const { name, image, price, price2, category, vendorId } = req.body;

  if (!name || !price || !vendorId || !category || !image) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const newProduct = new Product({ name, image, price, price2, category, vendorId });
    await newProduct.save();
    res.status(201).json({ message: "Product added", product: newProduct });
  } catch (err) {
    res.status(500).json({ message: "Failed to add product", error: err.message });
  }
});

// ✅ Admin delete product
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

// ✅ Get products by category
router.get("/category/:category", async (req, res) => {
  try {
    const category = req.params.category;
    const regex = new RegExp(category, "i"); // case-insensitive
    const products = await Product.find({ category: { $regex: regex } });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch category products" });
  }
});

// ✅ Get products by vendorId
router.get("/vendor/:vendorId", async (req, res) => {
  try {
    const { vendorId } = req.params;
    const products = await Product.find({ vendorId });

    if (!products.length) {
      return res.status(404).json({ message: "No products found for this vendor" });
    }

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products for vendor" });
  }
});

// ✅ Get all products grouped by category
router.get("/all/grouped", async (req, res) => {
  try {
    // Fetch all products
    const products = await Product.find();

    // Group products by category
    const grouped = products.reduce((acc, product) => {
      const category = product.category || "Uncategorized";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    }, {});

    res.json(grouped);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch grouped products" });
  }
});

module.exports = router;
