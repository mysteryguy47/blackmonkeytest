import "@/lib/validate-env-on-startup"; // Validate env vars on module load
import { NextRequest, NextResponse } from "next/server";
import { Cashfree, CFEnvironment } from "cashfree-pg";
import { createOrderSchema } from "@/lib/validations";
import { logger } from "@/lib/logger";
import { getEnv } from "@/lib/env";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth-config";

/**
 * POST /api/create-order
 * 
 * Creates a payment order with Cashfree payment gateway.
 * 
 * @route POST /api/create-order
 * @access Public (authentication to be added in future)
 * 
 * @param {Object} request - Next.js request object
 * @param {number} request.body.order_amount - Order amount in INR (required, min: 1, max: 1,000,000)
 * @param {string} request.body.customer_name - Customer full name (required, 2-100 chars)
 * @param {string} request.body.customer_email - Valid email address (required)
 * @param {string} request.body.customer_phone - 10-digit Indian phone number starting with 6-9 (required)
 * @param {string} [request.body.course_id] - Optional course ID for tracking
 * 
 * @returns {Promise<NextResponse>}
 * @returns {200} { orderId: string, paymentSessionId: string } - Order created successfully
 * @returns {400} { error: string } - Validation error
 * @returns {500} { error: string } - Server error
 * 
 * @example
 * ```typescript
 * const response = await fetch('/api/create-order', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({
 *     order_amount: 2999,
 *     customer_name: "John Doe",
 *     customer_email: "john@example.com",
 *     customer_phone: "9876543210",
 *     course_id: "shunya"
 *   })
 * });
 * ```
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // Verify authentication
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      logger.warn("Unauthorized order creation attempt", {
        hasSession: !!session,
      });
      return NextResponse.json(
        { error: "Authentication required. Please log in to continue." },
        { status: 401 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    
    // Validate input using Zod schema
    const validationResult = createOrderSchema.safeParse(body);
    
    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0];
      logger.warn("Order creation validation failed", {
        errors: validationResult.error.errors,
        body: { ...body, customer_phone: "[REDACTED]" }, // Don't log full phone
      });
      
      return NextResponse.json(
        { error: firstError.message },
        { status: 400 }
      );
    }

    const {
      order_amount,
      customer_name,
      customer_email,
      customer_phone,
      course_id,
    } = validationResult.data;

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

    const { CASHFREE_APP_ID: cashfreeAppId, CASHFREE_SECRET_KEY: cashfreeSecretKey, NEXT_PUBLIC_BASE_URL: baseUrl } = env;

    // Determine Cashfree environment from env var (defaults to production)
    const cashfreeEnv = process.env.CASHFREE_ENV === "sandbox" 
      ? CFEnvironment.SANDBOX 
      : CFEnvironment.PRODUCTION;

    // Initialize Cashfree SDK
    const cf = new Cashfree(
      cashfreeEnv,
      cashfreeAppId,
      cashfreeSecretKey
    );

    // Generate unique customer ID
    const customerId = `cust_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;

    // Prepare order request
    // Note: Cashfree SDK expects order_amount as number, but converts internally
    const orderRequest = {
      order_amount: order_amount,
      order_currency: "INR",
      customer_details: {
        customer_id: customerId,
        customer_name: customer_name.trim(),
        customer_email: customer_email.trim().toLowerCase(),
        customer_phone: customer_phone, // Already validated and cleaned by schema
      },
      order_meta: {
        return_url: `${baseUrl}/payment-result?order_id={order_id}`,
        ...(course_id && { course_id }),
      },
    };

    // Create order with Cashfree
    logger.info("Creating Cashfree order", {
      customerId,
      orderAmount: order_amount,
      courseId: course_id || "none",
    });

    const response = await cf.PGCreateOrder(orderRequest);
    const orderData = response.data;

    const duration = Date.now() - startTime;
    logger.info("Order created successfully", {
      orderId: orderData.order_id,
      duration: `${duration}ms`,
    });

    // Return success response
    return NextResponse.json({
      orderId: orderData.order_id,
      paymentSessionId: orderData.payment_session_id,
    });

  } catch (error: unknown) {
    const duration = Date.now() - startTime;
    
    // Handle Cashfree API errors
    if (error && typeof error === "object" && "response" in error) {
      const cashfreeError = error as { response?: { data?: { message?: string } } };
      const errorMessage = cashfreeError.response?.data?.message || "Unknown Cashfree error";
      
      logger.error("Cashfree API error", error, {
        errorMessage,
        duration: `${duration}ms`,
      });

      return NextResponse.json(
        { error: "Unable to process payment. Please try again later or contact support." },
        { status: 500 }
      );
    }

    // Handle other errors
    logger.error("Unexpected error in create-order", error, {
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
    { error: "Method not allowed. Use POST to create an order." },
    { status: 405 }
  );
}
