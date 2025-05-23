
import React from 'react';

function Order() {
  const order = JSON.parse(localStorage.getItem("order")) || [];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Order</h2>
      {order.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        order.map((item, idx) => (
          <div key={idx} className="border rounded p-4 mb-4 shadow flex items-center gap-4">
            {/* Product Image */}
            <img 
              src={item.img} 
              alt={item.title} 
              className="w-24 h-24 object-contain rounded" 
            />
            <div>
              <div className="font-bold">{item.title}</div>
              <div>Price: ₹{item.price}</div>
              <div>Status: <span className="text-green-600">Delivering in 10 min</span></div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Order;






