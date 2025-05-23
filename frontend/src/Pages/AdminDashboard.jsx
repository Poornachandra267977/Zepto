import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [vendors, setVendors] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [vendorProducts, setVendorProducts] = useState({}); // Map vendorId -> products

  // Fetch all vendors and their products
  const fetchVendors = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admins/vendors');
      setVendors(res.data);

      // Fetch all products for all vendors in parallel using Promise.all
      const productsByVendor = await Promise.all(
        res.data.map(async (vendor) => {
          try {
            const prodRes = await axios.get(`http://localhost:5000/api/products/vendor/${vendor._id}`);
            return { vendorId: vendor._id, products: prodRes.data };
          } catch (err) {
            console.error(`Failed to fetch products for vendor ${vendor._id}`, err);
            return { vendorId: vendor._id, products: [] };
          }
        })
      );

      // Build map: vendorId -> products array
      const productsMap = {};
      productsByVendor.forEach(({ vendorId, products }) => {
        productsMap[vendorId] = products;
      });
      setVendorProducts(productsMap);
    } catch (err) {
      console.error('Failed to fetch vendors:', err);
    }
  };

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admins/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admins/orders');
      setOrders(res.data);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    }
  };

  useEffect(() => {
    fetchVendors();
    fetchUsers();
    fetchOrders();
  }, []);

  // Delete vendor and remove from state
  const deleteVendor = async (vendorId) => {
    try {
      await axios.delete(`http://localhost:5000/api/admins/vendor/${vendorId}`);
      setVendors((prev) => prev.filter((v) => v._id !== vendorId));
      setVendorProducts((prev) => {
        const newVP = { ...prev };
        delete newVP[vendorId];
        return newVP;
      });
    } catch (err) {
      console.error('Failed to delete vendor:', err);
    }
  };

  // Delete product for a vendor
  const deleteVendorProduct = async (productId, vendorId) => {
    try {
      await axios.delete(`http://localhost:5000/api/admins/product/${productId}`);
      setVendorProducts((prev) => {
        const newProducts = prev[vendorId].filter((p) => p._id !== productId);
        return { ...prev, [vendorId]: newProducts };
      });
    } catch (err) {
      console.error('Failed to delete product:', err);
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <section>
        <h3>Vendors</h3>
        {vendors.length === 0 && <p>No vendors found</p>}
        <ul>
          {vendors.map((vendor) => (
            <li key={vendor._id} style={{ marginBottom: '1em' }}>
              <strong>{vendor.name}</strong> - {vendor.email}
              <button onClick={() => deleteVendor(vendor._id)} style={{ marginLeft: '10px' }}>
                Delete Vendor
              </button>

              {vendorProducts[vendor._id]?.length > 0 && (
                <ul style={{ marginTop: '0.5em' }}>
                  {vendorProducts[vendor._id].map((product) => (
                    <li key={product._id}>
                      {product.name} - ₹{product.price}
                      <button
                        onClick={() => deleteVendorProduct(product._id, vendor._id)}
                        style={{ marginLeft: '10px' }}
                      >
                        Delete Product
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Users</h3>
        {users.length === 0 && <p>No users found</p>}
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              {user.name} - {user.email}
              {/* You can add delete user functionality here if needed */}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Orders</h3>
        {orders.length === 0 && <p>No orders found</p>}
        <ul>
          {orders.map((order) => (
            <li key={order._id} style={{ marginBottom: '1em' }}>
              <div>
                <strong>Order ID:</strong> {order._id}
              </div>
              <div>
                <strong>User:</strong> {order.user?.name} ({order.user?.email})
              </div>
              <div>
                <strong>Total Amount:</strong> ₹{order.totalAmount || order.totalPrice}
              </div>
              <div>
                <strong>Products:</strong>
                <ul>
                  {order.products?.map((prod) => (
                    <li key={prod._id}>
                      {prod.name} - ₹{prod.price}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default AdminDashboard;