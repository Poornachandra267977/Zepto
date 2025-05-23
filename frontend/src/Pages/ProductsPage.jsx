
import React, { useEffect, useState } from "react";
import ProductDetails from "../components/ProductDetails";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

function ProductsPage() {
  const [params] = useSearchParams();
  const searchTerm = params.get("q") || "";

  const [productsByCategory, setProductsByCategory] = useState({
    Fruits: [],
    Vegetables: [],
    Baths: [],
    Makeup: []
  });

  useEffect(() => {
    // Fetch grouped products from backend
    axios.get("http://localhost:5000/api/products/all/grouped")
      .then(res => {
        setProductsByCategory(res.data);
      })
      .catch(err => {
        console.error("Failed to fetch products", err);
      });
  }, []);

  return (
    <div className="px-6 py-4">
      <h2 className="text-2xl font-bold mb-6">Products</h2>

      <section className="mb-10">
        <h3 className="text-xl font-semibold mb-4">Fruits</h3>
        <ProductDetails data={productsByCategory.Fruits || []} searchTerm={searchTerm} />
      </section>

      <section className="mb-10">
        <h3 className="text-xl font-semibold mb-4">Vegetables</h3>
        <ProductDetails data={productsByCategory.Vegetables || []} searchTerm={searchTerm} />
      </section>

      <section className="mb-10">
        <h3 className="text-xl font-semibold mb-4">Baths</h3>
        <ProductDetails data={productsByCategory.Baths || []} searchTerm={searchTerm} />
      </section>

      <section className="mb-10">
        <h3 className="text-xl font-semibold mb-4">Makeup</h3>
        <ProductDetails data={productsByCategory.Makeup || []} searchTerm={searchTerm} />
      </section>
    </div>
  );
}

export default ProductsPage;
