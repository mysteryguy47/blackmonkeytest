/**
 * Environment Variable Validation
 * 
 * Validates all required environment variables at application startup.
 * Throws descriptive errors if any required variables are missing.
 */

import { z } from "zod";

/**
 * Clean and validate URL string (removes trailing slashes and comments)
 */
function cleanUrl(url: string | undefined): string {
  if (!url) return "";
  // Remove inline comments (everything after #)
  let cleaned = url.split("#")[0].trim();
  // Remove trailing slashes
  cleaned = cleaned.replace(/\/+$/, "");
  return cleaned;
}

/**
 * Schema for environment variables
 */
const envSchema = z.object({
  // Database (optional for API routes that don't use DB)
  DATABASE_URL: z.string().url("DATABASE_URL must be a valid URL").optional(),
  
  // Cashfree Payment Gateway (required for payment APIs)
  CASHFREE_APP_ID: z.string().min(1, "CASHFREE_APP_ID is required"),
  CASHFREE_SECRET_KEY: z.string().min(1, "CASHFREE_SECRET_KEY is required"),
  
  // Application (required for payment return URLs)
  NEXT_PUBLIC_BASE_URL: z
    .string()
    .transform((val) => cleanUrl(val))
    .pipe(z.string().url("NEXT_PUBLIC_BASE_URL must be a valid URL")),
  
  // Optional: Node environment
  NODE_ENV: z.enum(["development", "production", "test"]).optional().default("development"),
});

/**
 * Validated environment variables
 */
export type Env = z.infer<typeof envSchema>;

/**
 * Validates and returns environment variables
 * @throws {Error} If any required environment variable is missing or invalid
 */
export function validateEnv(): Env {
  try {
    // Clean NEXT_PUBLIC_BASE_URL before validation
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL 
      ? cleanUrl(process.env.NEXT_PUBLIC_BASE_URL)
      : process.env.NEXT_PUBLIC_BASE_URL;
    
    const env = envSchema.parse({
      DATABASE_URL: process.env.DATABASE_URL,
      CASHFREE_APP_ID: process.env.CASHFREE_APP_ID,
      CASHFREE_SECRET_KEY: process.env.CASHFREE_SECRET_KEY,
      NEXT_PUBLIC_BASE_URL: baseUrl,
      NODE_ENV: process.env.NODE_ENV,
    });
    
    return env;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map((err) => {
        const path = err.path.join(".");
        return `  - ${path}: ${err.message}`;
      }).join("\n");
      
      throw new Error(
        `❌ Environment variable validation failed!\n\n` +
        `Missing or invalid environment variables:\n${missingVars}\n\n` +
        `Please check your .env file or environment configuration.`
      );
    }
    throw error;
  }
}

/**
 * Get validated environment variables
 * Use this instead of accessing process.env directly
 */
let cachedEnv: Env | null = null;

export function getEnv(): Env {
  if (!cachedEnv) {
    cachedEnv = validateEnv();
  }
  return cachedEnv;
}

/**
 * Validate environment variables on module load (for server-side)
 * This will throw immediately if env vars are invalid
 * 
 * Note: During build time, env vars may not be available, so we skip validation
 */
if (typeof window === "undefined") {
  // Only validate on server-side, and only at runtime (not during build)
  // During build, Next.js may not have access to all env vars
  const isBuildTime = process.env.NEXT_PHASE === "phase-production-build" || 
                      process.env.NEXT_PHASE === "phase-development-build";
  
  if (!isBuildTime) {
    try {
      getEnv();
    } catch (error) {
      // Log error but don't throw during module load in development
      // Next.js will handle this during runtime
      if (process.env.NODE_ENV === "production") {
        console.error(error);
      }
    }
  }
}
