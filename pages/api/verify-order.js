// pages/api/verify-order.js
import { Cashfree, CFEnvironment } from "cashfree-pg";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Only POST allowed" });
    return;
  }
  const { orderId } = req.body;

  if (!orderId || typeof orderId !== "string") {
    return res.status(400).json({ error: "Order ID is required" });
  }

  const cf = new Cashfree(
    CFEnvironment.PRODUCTION,  // Use SANDBOX for testing. Use PRODUCTION when live
    process.env.CASHFREE_APP_ID,
    process.env.CASHFREE_SECRET_KEY
  );

  try {
    const resp = await cf.PGFetchOrder("2023-08-01", orderId);
    const orderData = resp.data;
    res.status(200).json({ 
      status: orderData.order_status,
      orderId: orderData.order_id,
      orderAmount: orderData.order_amount,
    });
  } catch (err) {
    console.error("[API Error] Order verification failed:", {
      orderId,
      error: err.message || "Unknown error",
      timestamp: new Date().toISOString(),
    });
    res.status(500).json({ error: "Could not fetch order status" });
  }
}
    