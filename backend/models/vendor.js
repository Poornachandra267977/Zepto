const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: { type: String, unique: true },
  password: String,
  uid: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Vendor", vendorSchema);
