
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../Redux/Cart/cart.actions";
import { MdDelete } from "react-icons/md";
import { TfiLocationPin } from "react-icons/tfi";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import styles from "../styles/Cart.module.css";
import { toast } from "react-toastify";

const arr = JSON.parse(localStorage.getItem("address")) || [];

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [userAddress, setUserAddress] = useState(
    JSON.parse(localStorage.getItem("address")) || {
      name: "",
      address: "",
      city: "",
      mob: "",
    }
  );

  const cartItem = useSelector((store) => store.cartReducer.cart);

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showCardForm, setShowCardForm] = useState(false);
  const [showUPIForm, setShowUPIForm] = useState(false);
  const [upiId, setUpiId] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleRemove = (el) => {
    dispatch(removeFromCart(el));
  };

  const handlePayment = () => {
    const { name, address, city, mob } = userAddress;
    if (
      name.length > 4 &&
      mob.length > 9 &&
      address.length > 4 &&
      city.length > 3
    ) {
      setShowPaymentModal(true);
    } else {
      toast.warn("Check Your Details properly!");
    }
  };

  const handleCOD = () => {
    localStorage.setItem("order", JSON.stringify(cartItem));
    dispatch({ type: "CLEAR_CART" });
    setShowPaymentModal(false);
    setShowOrderModal(true);
  };

  const handleUPIPayment = async () => {
    if (!upiId) return toast.warn("Enter a valid UPI ID");

    setProcessing(true);
    try {
      const res = await fetch("http://localhost:5000/api/payment/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: finalAmount, payment_method_type: "upi" }),
      });

      const { clientSecret } = await res.json();

      // const result = await stripe.confirmPayment({
      //   clientSecret,
      //   payment_method: {
      //     type: "upi",
      //     upi: {
      //       vpa: upiId,
      //     },
      //   },
      // });
        
      const result = await stripe.confirmUpiPayment(clientSecret, {
  payment_method: {
    upi: {
      vpa: upiId,
    },
  },
});

      if (result.error) {
        toast.error(result.error.message);
      } else {
        localStorage.setItem("order", JSON.stringify(cartItem));
        dispatch({ type: "CLEAR_CART" });
        setShowUPIForm(false);
        setShowOrderModal(true);
      }
    } catch (err) {
      toast.error("UPI payment failed");
    } finally {
      setProcessing(false);
    }
  };

  const handleCardPayment = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      const res = await fetch("http://localhost:5000/api/payment/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: finalAmount, payment_method_type: "card" }),
      });

      const { clientSecret } = await res.json();

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else {
        localStorage.setItem("order", JSON.stringify(cartItem));
        dispatch({ type: "CLEAR_CART" });
        setShowCardForm(false);
        setShowOrderModal(true);
      }
    } catch (err) {
      toast.error("Card payment failed");
    } finally {
      setProcessing(false);
    }
  };

  let value = 0;
  let offerValue = 0;
  cartItem.forEach((el) => {
    offerValue += Number(el.price);
    value += Number(el.price2);
  });
  const finalAmount = offerValue;
  offerValue = value - offerValue;

  return (
    <>
      {/* Main UI */}
      <div className="flex flex-col bg-[#F5F1F7] min-h-screen">
        <div className="flex pl-[13%] pt-8 pb-5">
          <h2 className="text-[24px] font-semibold ">
            Cart ({cartItem.length} Item{cartItem.length !== 1 && "s"})
          </h2>
        </div>
        <div className="flex flex-row justify-center items-start gap-x-4 ">
          <div className="overflow-y-auto max-h-[300px]">
            {cartItem.map((el) => (
              <div key={el.id} className="border shadow w-auto rounded-lg px-6 py-6 mb-3 bg-white flex justify-between items-center">
                <div className="flex items-center gap-x-4">
                  <img src={el.img} alt="img" className="h-[70px]" />
                  <div>
                    <p>{el.title.slice(0, 40)}...</p>
                    <div className="flex gap-x-2">
                      <span className="font-semibold text-black">₹{el.price}</span>
                      <span className="line-through text-gray-500">₹{el.price2}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(el)}
                  className="bg-[#f61571] text-white px-4 py-2 rounded-lg flex items-center gap-x-2"
                >
                  Remove <MdDelete />
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-y-4">
            <div className="border shadow bg-white rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Price Summary</h3>
              <div className="flex justify-between">
                <span>Total MRP</span>
                <span>₹{value}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span>-₹{offerValue}</span>
              </div>
              <div className="flex justify-between border-t pt-2 mt-2 font-bold">
                <span>Total</span>
                <span>₹{finalAmount}</span>
              </div>
            </div>

            <div className="border shadow bg-white rounded-lg p-6 flex flex-col items-start">
              {arr.length === 0 ? (
                <p className="text-gray-700 flex items-center gap-x-2">
                  <TfiLocationPin className="text-pink-600" /> Enter Your Address
                </p>
              ) : (
                <div>
                  <strong>Address:</strong> {userAddress.name}, {userAddress.address}, {userAddress.city}, {userAddress.mob}
                </div>
              )}

              <button
                onClick={handlePayment}
                disabled={arr.length === 0}
                className="mt-4 bg-[#f61571] text-white px-5 py-2 rounded-md"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-md p-6 w-[90%] max-w-md space-y-4 text-center">
            <h2 className="text-xl font-bold">Choose Payment Method</h2>
            <button onClick={handleCOD} className="bg-green-600 text-white w-full py-2 rounded-md">Cash on Delivery</button>
            <button onClick={() => { setShowCardForm(true); setShowPaymentModal(false); }} className="bg-blue-600 text-white w-full py-2 rounded-md">Pay with Card</button>
            <button onClick={() => { setShowUPIForm(true); setShowPaymentModal(false); }} className="bg-purple-600 text-white w-full py-2 rounded-md">Pay with UPI</button>
            <button onClick={() => setShowPaymentModal(false)} className="text-red-600 mt-2">Cancel</button>
          </div>
        </div>
      )}

      {/* Card Form Modal */}
      {showCardForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <form onSubmit={handleCardPayment} className="bg-white p-6 rounded-md w-[90%] max-w-md space-y-4">
            <h2 className="text-xl font-bold">Enter Card Details</h2>
            <CardElement className="border px-3 py-2 rounded" />
            <button disabled={processing} type="submit" className="bg-blue-600 text-white w-full py-2 rounded-md">
              {processing ? "Processing..." : "Pay Now"}
            </button>
            <button onClick={() => setShowCardForm(false)} className="text-red-600 mt-2 w-full">Cancel</button>
          </form>
        </div>
      )}

      {/* UPI Form Modal */}
      {showUPIForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-[90%] max-w-md space-y-4">
            <h2 className="text-xl font-bold">Pay via UPI</h2>
            <input
              type="text"
              placeholder="Enter UPI ID (e.g., user@bank)"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
            <button onClick={handleUPIPayment} disabled={processing} className="bg-green-600 text-white w-full py-2 rounded-md">
              {processing ? "Processing..." : "Pay via UPI"}
            </button>
            <button onClick={() => setShowUPIForm(false)} className="text-red-600 mt-2 w-full">Cancel</button>
          </div>
        </div>
      )}

      {/* Order Confirmation Modal */}
      {showOrderModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl text-center">
            <h2 className="text-2xl font-semibold text-green-600">🎉 Order Confirmed!</h2>
            <p className="mt-4">Your order has been placed successfully.</p>
            <button onClick={() => navigate("/order")} className="bg-[#f61571] text-white mt-4 px-4 py-2 rounded-md">
              View Order
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Payment;
