
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: {
    type: String,
    required: true,
    match: /^\+91[6-9]\d{9}$/,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.com$/,
  },
  password: { type: String, required: true },
  uid: { type: String },
  profileImage: { type: String, default: "" },
  role: {
    type: String,
    enum: ["user", "vendor", "admin"],
    default: "user"
  }
});

module.exports = mongoose.model("User", userSchema);
