const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const vendorRoutes = require("./routes/vendorRoutes");
const adminRoutes = require("./routes/adminRoutes");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);
app.use("/api/users", require("./routes/userRoutes"));

const orderRoutes = require("./routes/orderRoutes");
app.use("/api/orders", orderRoutes);


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Error:", err));

// Routes
// app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes"));
app.use("/api/payment", require("./routes/paymentIntentRoutes"));
app.use("/api/vendors", vendorRoutes);
app.use("/api/admins", adminRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));