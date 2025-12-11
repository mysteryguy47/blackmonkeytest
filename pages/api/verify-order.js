// pages/api/verify-order.js
import { Cashfree, CFEnvironment } from "cashfree-pg";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Only POST allowed" });
    return;
  }
  const { orderId } = req.body;

  const cf = new Cashfree(
    CFEnvironment.PRODUCTION,  // Use SANDBOX for testing. Use PRODUCTION when live
    process.env.CASHFREE_APP_ID,
    process.env.CASHFREE_SECRET_KEY
  );

  
  try {
    const resp = await cf.PGFetchOrder("2023-08-01", orderId);  // or latest version in docs
    const orderData = resp.data;
    res.status(200).json({ status: orderData.order_status });
  } catch (err) {
    console.error("Error fetching order:", err);
    res.status(500).json({ error: "Could not fetch order status" });
  }
}
    