// components/CheckoutButton.tsx
"use client";

import { useState } from "react";

export default function CheckoutButton() {
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    const resp = await fetch("/api/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        order_amount: 11,  // your amount
        customer_name: "John Doe",
        customer_email: "john@example.com",
        customer_phone: "9999999999",
      }),
    });
    const data = await resp.json();
    console.log("API Response:", data);

    setLoading(false);

    if (data.paymentSessionId) {
      const script = document.createElement("script");
      script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
      script.onload = () => {
        const cashfree = window.Cashfree({ mode: "production" });
        cashfree.checkout({ paymentSessionId: data.paymentSessionId, redirectTarget: "_self" });
      };
      document.body.appendChild(script);
    } else {
      alert("Payment initialization failed");
    }
  };

  return (
    <button onClick={handlePay} disabled={loading}>
      {loading ? "Please wait..." : "Pay Now"}
    </button>
  );
}
