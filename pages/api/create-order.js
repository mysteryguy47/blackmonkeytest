// pages/api/create-order.js
import { Cashfree, CFEnvironment } from "cashfree-pg";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { order_amount, customer_name, customer_email, customer_phone } = req.body;

    // VALIDATION
    if (!order_amount || Number(order_amount) < 1) {
      return res.status(400).json({ error: "Invalid order amount" });
    }
    if (!customer_name) {
      return res.status(400).json({ error: "Missing customer name" });
    }
    if (!customer_email) {
      return res.status(400).json({ error: "Missing email" });
    }
    if (!customer_phone || customer_phone.length !== 10) {
      return res.status(400).json({ error: "Invalid phone number" });
    }

    // INITIALIZE CASHFREE
    const cf = new Cashfree(
      CFEnvironment.PRODUCTION, // you are using production keys
      process.env.CASHFREE_APP_ID,
      process.env.CASHFREE_SECRET_KEY
    );

    const requestBody = {
      order_amount: order_amount.toString(),
      order_currency: "INR",

      customer_details: {
        customer_id: "cust_" + Date.now(),
        customer_name,
        customer_email,
        customer_phone,
      },

      order_meta: {
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-result?order_id={order_id}`,
      },
    };

    console.log("REQUEST BODY TO CASHFREE:", requestBody);

    // CASHFREE ORDER
    const response = await cf.PGCreateOrder(requestBody);
    const data = response.data;
    console.log("CASHFREE RESPONSE DATA:", data);


    return res.status(200).json({
      orderId: data.order_id,
      paymentSessionId: data.payment_session_id,
    });
  } catch (error) {
    console.error("Error creating Cashfree order:", error.response?.data || error);
    return res.status(500).json({ error: "Cashfree order creation failed" });
  }
}
