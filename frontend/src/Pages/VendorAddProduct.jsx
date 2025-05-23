import React, { useState } from "react";
import axios from "axios";

const VendorAddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
    price2: "",
    category: "Fruits",
    vendorId: "" // will be set from localStorage
  });

  const categories = ["Fruits", "Vegetables", "Baths", "Makeup", "Groceries", "Drinks"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const vendorId = localStorage.getItem("vendorId"); // assuming you store vendorId after login
//     if (!vendorId) {
//       alert("Vendor not logged in");
//       return;
//     }

//     try {
//       const res = await axios.post("/api/products/add", { ...formData, vendorId });
//       alert("Product added successfully!");
//       setFormData({ name: "", image: "", price: "", price2: "", category: "Fruits", vendorId: "" });
//     } catch (err) {
//       console.error(err);
//       alert("Failed to add product");
//     }
//   };

const handleSubmit = async (e) => {
  e.preventDefault();

  const vendorId = localStorage.getItem("vendorId"); // get from localStorage
  if (!vendorId) {
    alert("Vendor not logged in");
    return;
  }

  try {
    const productData = { ...formData, vendorId }; // inject vendorId at send time

    // const res = await axios.post("/api/products/add", productData);
    const res = await axios.post("http://localhost:5000/api/products/add", productData);

    alert("Product added successfully!");
    setFormData({ name: "", image: "", price: "", price2: "", category: "Fruits", vendorId: "" });
  } catch (err) {
    console.error("Add Product Error:", err.response?.data || err.message);
    alert("Failed to add product");
  }
};


  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Product Name" required className="w-full border p-2" value={formData.name} onChange={handleChange} />
        <input type="text" name="image" placeholder="Image URL" required className="w-full border p-2" value={formData.image} onChange={handleChange} />
        <input type="number" name="price" placeholder="Price" required className="w-full border p-2" value={formData.price} onChange={handleChange} />
        <input type="number" name="price2" placeholder="Original Price (Optional)" className="w-full border p-2" value={formData.price2} onChange={handleChange} />

        <select name="category" className="w-full border p-2" value={formData.category} onChange={handleChange}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Add Product</button>
      </form>
    </div>
  );
};

export default VendorAddProduct;
