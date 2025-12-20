/**
 * Environment Variable Validation on Startup
 * 
 * This file validates environment variables when imported.
 * Import this file early in your application to ensure env vars are valid.
 * 
 * Usage: Import this file in your root layout or API routes.
 */

import { validateEnv } from "./env";

/**
 * Validate environment variables on module load
 * This will throw an error immediately if env vars are invalid
 * 
 * Note: During build time, env vars may not be available, so we skip validation
 */
const isBuildTime = process.env.NEXT_PHASE === "phase-production-build" || 
                    process.env.NEXT_PHASE === "phase-development-build";

if (!isBuildTime) {
  try {
    validateEnv();
    if (process.env.NODE_ENV !== "production") {
      console.log("✅ Environment variables validated successfully");
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("❌ Environment variable validation failed:");
    console.error(errorMessage);
    
    // In production runtime, we want the app to fail fast if env vars are missing
    if (process.env.NODE_ENV === "production") {
      throw error;
    }
    
    // In development, log but don't crash (allows dev server to start)
    console.warn("⚠️  Continuing in development mode, but the app may not work correctly.");
  }
}
