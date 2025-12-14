import "@/lib/validate-env-on-startup"; // Validate env vars on module load
import { NextRequest, NextResponse } from "next/server";
import { Cashfree, CFEnvironment } from "cashfree-pg";
import { verifyOrderSchema } from "@/lib/validations";
import { logger } from "@/lib/logger";
import { getEnv } from "@/lib/env";

/**
 * POST /api/verify-order
 * 
 * Verifies the payment status of an order with Cashfree payment gateway.
 * 
 * @route POST /api/verify-order
 * @access Public (authentication to be added in future)
 * 
 * @param {Object} request - Next.js request object
 * @param {string} request.body.orderId - Cashfree order ID (required)
 * 
 * @returns {Promise<NextResponse>}
 * @returns {200} { status: string, orderId: string, orderAmount: string } - Order status retrieved
 * @returns {400} { error: string } - Validation error (missing orderId)
 * @returns {500} { error: string } - Server error or Cashfree API error
 * 
 * @example
 * ```typescript
 * const response = await fetch('/api/verify-order', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({ orderId: "order_123456" })
 * });
 * const data = await response.json();
 * // data.status: "PAID" | "ACTIVE" | "PENDING" | "FAILED"
 * ```
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // Parse and validate request body
    const body = await request.json();
    
    // Validate input using Zod schema
    const validationResult = verifyOrderSchema.safeParse(body);
    
    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0];
      logger.warn("Order verification validation failed", {
        errors: validationResult.error.errors,
      });
      
      return NextResponse.json(
        { error: firstError.message },
        { status: 400 }
      );
    }

    const { orderId } = validationResult.data;

    // Validate environment variables (validated at startup, but double-check here)
    let env;
    try {
      env = getEnv();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      logger.error("Environment validation failed", error, {
        message: errorMessage,
      });
      
      // Provide more helpful error message
      return NextResponse.json(
        { 
          error: "Server configuration error. Please contact support.",
          details: process.env.NODE_ENV === "development" 
            ? errorMessage 
            : undefined // Don't expose details in production
        },
        { status: 500 }
      );
    }

    const { CASHFREE_APP_ID: cashfreeAppId, CASHFREE_SECRET_KEY: cashfreeSecretKey } = env;

    // Initialize Cashfree SDK
    const cf = new Cashfree(
      CFEnvironment.PRODUCTION,
      cashfreeAppId,
      cashfreeSecretKey
    );

    // Fetch order status from Cashfree
    // Note: Cashfree API version "2023-08-01" is used
    logger.info("Verifying order status", { orderId });

    const response = await cf.PGFetchOrder("2023-08-01", orderId);
    const orderData = response.data;

    const duration = Date.now() - startTime;
    logger.info("Order verification successful", {
      orderId: orderData.order_id,
      status: orderData.order_status,
      duration: `${duration}ms`,
    });

    // Return order status
    return NextResponse.json({
      status: orderData.order_status,
      orderId: orderData.order_id,
      orderAmount: orderData.order_amount,
    });

  } catch (error: unknown) {
    const duration = Date.now() - startTime;
    
    // Handle Cashfree API errors
    if (error && typeof error === "object" && "response" in error) {
      const cashfreeError = error as { response?: { data?: { message?: string } } };
      const errorMessage = cashfreeError.response?.data?.message || "Unknown Cashfree error";
      
      logger.error("Cashfree API error during verification", error, {
        errorMessage,
        duration: `${duration}ms`,
      });

      return NextResponse.json(
        { error: "Could not fetch order status. Please try again later." },
        { status: 500 }
      );
    }

    // Handle other errors
    logger.error("Unexpected error in verify-order", error, {
      duration: `${duration}ms`,
    });

    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}

// Only allow POST method
export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed. Use POST to verify an order." },
    { status: 405 }
  );
}
