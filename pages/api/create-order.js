// pages/api/create-order.js
import { Cashfree, CFEnvironment } from "cashfree-pg";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { order_amount, customer_name, customer_email, customer_phone, course_id } = req.body;

    // VALIDATION
    if (!order_amount || Number(order_amount) < 1) {
      return res.status(400).json({ error: "Invalid order amount" });
    }
    if (!customer_name || typeof customer_name !== "string" || customer_name.trim().length < 2) {
      return res.status(400).json({ error: "Please enter a valid name" });
    }
    if (!customer_email || typeof customer_email !== "string") {
      return res.status(400).json({ error: "Please enter a valid email" });
    }
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customer_email)) {
      return res.status(400).json({ error: "Please enter a valid email address" });
    }
    if (!customer_phone || typeof customer_phone !== "string") {
      return res.status(400).json({ error: "Please enter a valid phone number" });
    }
    
    // Clean and sanitize inputs first
    const cleanPhone = customer_phone.replace(/\s|-/g, "").replace(/^\+91/, "");
    const cleanEmail = customer_email.trim().toLowerCase();
    const cleanName = customer_name.trim();
    
    // Phone validation (10 digits for Indian numbers)
    if (cleanPhone.length !== 10 || !/^[6-9]\d{9}$/.test(cleanPhone)) {
      return res.status(400).json({ error: "Please enter a valid 10-digit Indian phone number" });
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
        customer_id: `cust_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        customer_name: cleanName,
        customer_email: cleanEmail,
        customer_phone: cleanPhone,
      },

      order_meta: {
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-result?order_id={order_id}`,
        ...(course_id && { course_id }), // Add course_id to metadata if provided
      },
    };

    // CASHFREE ORDER
    const response = await cf.PGCreateOrder(requestBody);
    const data = response.data;


    return res.status(200).json({
      orderId: data.order_id,
      paymentSessionId: data.payment_session_id,
    });
  } catch (error) {
    // Log error details server-side only (not exposed to client)
    const errorMessage = error.response?.data?.message || error.message || "Unknown error";
    console.error("[API Error] Order creation failed:", {
      message: errorMessage,
      timestamp: new Date().toISOString(),
      // Don't log sensitive data
    });

    // Return generic error message to client
    return res.status(500).json({ 
      error: "Unable to process payment. Please try again later or contact support." 
    });
  }
}
