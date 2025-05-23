
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true }, // ✅ Make image required
  price: { type: String, required: true },
  price2: { type: String, required: true }, // ✅ Make price2 required
  category: { type: String, required: true }, // ✅ Make category required
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // ✅ Make vendorId required
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Product", productSchema);
