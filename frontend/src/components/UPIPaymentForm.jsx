// components/UPIPaymentForm.jsx
import React, { useState } from "react";

export default function UPIPaymentForm({ amount, onSuccess }) {
  const [upiId, setUpiId] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const handlePay = async () => {
    setProcessing(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/payment/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, payment_method_type: "upi" }),
      });

      const { clientSecret } = await res.json();

      // In live UPI flow, you'd use confirmPayment w/ UPI; here it's just simulation
      const result = await fetch("https://api.stripe.com/v1/payment_intents/" + clientSecret, {
        method: "GET",
      });

      onSuccess();
    } catch (err) {
      setError("UPI payment failed");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Enter your UPI ID"
        value={upiId}
        onChange={(e) => setUpiId(e.target.value)}
        className="border px-3 py-2 w-full"
      />
      <button onClick={handlePay} disabled={processing || !upiId} className="bg-green-600 text-white px-4 py-2 rounded">
        {processing ? "Processing..." : "Pay via UPI"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
