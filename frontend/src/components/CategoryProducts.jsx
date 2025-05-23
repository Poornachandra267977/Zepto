// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const CategoryProducts = ({ category }) => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     axios.get(`/api/products/category/${category}`)
//       .then(res => setProducts(res.data))
//       .catch(err => console.error("Failed to fetch products", err));
//   }, [category]);

//   return (
//     <div>
//       <h2>{category} Products</h2>
//       {products.length === 0 ? (
//         <p>No products found in this category.</p>
//       ) : (
//         products.map(p => (
//           <div key={p._id} style={{ border: "1px solid #ccc", margin: "8px", padding: "8px" }}>
//             <img src={p.image} alt={p.name} width="100" />
//             <p>{p.name} - ₹{p.price}</p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default CategoryProducts;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // ✅ Import useParams

const CategoryProducts = () => {
  const { category } = useParams(); // ✅ Extract category from URL
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/products/category/${category}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Failed to fetch products", err));
  }, [category]);

  return (
    <div>
      <h2>{category} Products</h2>
      {products.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
        products.map((p) => (
          <div
            key={p._id}
            style={{
              border: "1px solid #ccc",
              margin: "8px",
              padding: "8px",
            }}
          >
            <img src={p.image} alt={p.name} width="100" />
            <p>
              {p.name} - ₹{p.price}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default CategoryProducts;
