
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductDetails from "../components/ProductDetails";
import products from "../data/products"; // Your product data

function SearchResults() {
  const [params] = useSearchParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const q = params.get("q");
    if (q) {
      const filtered = [];

      Object.entries(products).forEach(([categoryName, items]) => {
        if (Array.isArray(items)) {
          items.forEach((item) => {
            const titleMatch = item.title?.toLowerCase().includes(q.toLowerCase());
            const categoryMatch = categoryName.toLowerCase().includes(q.toLowerCase());

            if (titleMatch || categoryMatch) {
              filtered.push({
                ...item,
                category: categoryName, // Add category field
                price: parseFloat(item.price?.replace("₹", "")),   // Ensure price is number
                price2: parseFloat(item.price2?.replace("₹", ""))  // Optional but good for display
              });
            }
          });
        }
      });

      setResults(filtered);
    }
  }, [params]);

  return (
    <div className="px-6 py-4">
      <h2 className="text-xl font-semibold mb-4">
        Search Results for "{params.get("q")}"
      </h2>
      <ProductDetails data={results} />
    </div>
  );
}

export default SearchResults;


