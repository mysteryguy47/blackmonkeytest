import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { getEnv } from "@/lib/env";
import crypto from "crypto";

/**
 * POST /api/webhooks/cashfree
 * 
 * Cashfree payment webhook handler.
 * Verifies webhook signature and processes payment status updates.
 * 
 * @route POST /api/webhooks/cashfree
 * @access Public (verified via signature)
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // Get webhook payload
    const body = await request.text();
    const payload = JSON.parse(body);
    
    // Get signature from headers
    const signature = request.headers.get("x-cashfree-signature");
    
    if (!signature) {
      logger.warn("Cashfree webhook received without signature", {
        payload: { ...payload, orderId: payload.order?.order_id },
      });
      return NextResponse.json(
        { error: "Missing signature" },
        { status: 401 }
      );
    }

    // Verify webhook signature
    let env;
    try {
      env = getEnv();
    } catch (error) {
      logger.error("Environment validation failed in webhook", error);
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const { CASHFREE_SECRET_KEY: secretKey } = env;
    
    // Calculate expected signature
    const expectedSignature = crypto
      .createHmac("sha256", secretKey)
      .update(body)
      .digest("hex");
    
    // Verify signature (use constant-time comparison to prevent timing attacks)
    const isValid = crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
    
    if (!isValid) {
      logger.warn("Cashfree webhook signature verification failed", {
        orderId: payload.order?.order_id,
      });
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 401 }
      );
    }

    // Process webhook payload
    const { order, payment } = payload;
    
    if (!order || !order.order_id) {
      logger.warn("Cashfree webhook received invalid payload", { payload });
      return NextResponse.json(
        { error: "Invalid payload" },
        { status: 400 }
      );
    }

    const orderId = order.order_id;
    const orderStatus = order.order_status;
    const paymentStatus = payment?.payment_status;
    
    logger.info("Cashfree webhook received", {
      orderId,
      orderStatus,
      paymentStatus,
      event: payload.type || "unknown",
    });

    // TODO: Update order status in database
    // Example:
    // await updateOrderStatus(orderId, {
    //   orderStatus,
    //   paymentStatus,
    //   paymentId: payment?.cf_payment_id,
    //   updatedAt: new Date(),
    // });

    // TODO: Send confirmation email if payment successful
    // if (paymentStatus === "SUCCESS") {
    //   await sendPaymentConfirmationEmail(order.customer_details);
    // }

    const duration = Date.now() - startTime;
    logger.info("Cashfree webhook processed successfully", {
      orderId,
      duration: `${duration}ms`,
    });

    // Return 200 OK to acknowledge receipt
    return NextResponse.json({ 
      success: true,
      message: "Webhook processed",
      orderId,
    });

  } catch (error: unknown) {
    const duration = Date.now() - startTime;
    
    logger.error("Error processing Cashfree webhook", error, {
      duration: `${duration}ms`,
    });

    // Return 500 but don't expose error details
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}

// Only allow POST method
export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed. Webhooks must use POST." },
    { status: 405 }
  );
}

