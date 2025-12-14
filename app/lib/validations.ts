import { z } from "zod";

/**
 * Validation schemas for API requests using Zod
 */

/**
 * Phone number cleaning function
 */
function cleanPhone(phone: string): string {
  return phone.replace(/\s|-/g, "").replace(/^\+91/, "");
}

/**
 * Schema for creating a payment order
 */
export const createOrderSchema = z.object({
  order_amount: z
    .number()
    .min(1, "Order amount must be at least ₹1")
    .max(1000000, "Order amount cannot exceed ₹10,00,000"),
  
  customer_name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters")
    .trim(),
  
  customer_email: z
    .string()
    .email("Please enter a valid email address")
    .toLowerCase()
    .trim(),
  
  customer_phone: z
    .string()
    .transform((val) => cleanPhone(val))
    .refine(
      (val) => val.length === 10 && /^[6-9]\d{9}$/.test(val),
      "Please enter a valid 10-digit Indian phone number (starting with 6-9)"
    ),
  
  course_id: z
    .string()
    .optional(),
});

/**
 * Schema for verifying a payment order
 */
export const verifyOrderSchema = z.object({
  orderId: z
    .string()
    .min(1, "Order ID is required"),
});

/**
 * Type exports for TypeScript
 */
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type VerifyOrderInput = z.infer<typeof verifyOrderSchema>;
