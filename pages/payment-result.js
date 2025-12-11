// pages/payment-result.js
import { useEffect, useState } from "react";

export default function PaymentResult() {
  const [status, setStatus] = useState("Verifying payment...");

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const orderId = query.get("order_id");
    if (!orderId) {
      setStatus("No order ID returned");
      return;
    }

    (async () => {
      const resp = await fetch("/api/verify-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });
      const data = await resp.json();
      if (data.status === "PAID") {
        setStatus("Payment successful ✅");
      } else {
        setStatus("Payment not successful — status: " + data.status);
      }
    })();
  }, []);

  return <div>{status}</div>;
}
