/**
 * Sentry Error Tracking Setup
 * 
 * This file prepares Sentry integration for production error tracking.
 * To enable Sentry:
 * 
 * 1. Install Sentry: npm install @sentry/nextjs
 * 2. Run: npx @sentry/wizard@latest -i nextjs
 * 3. Add SENTRY_DSN to your environment variables
 * 4. Uncomment the code below
 */

// Uncomment when Sentry is installed:
/*
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV || "development",
  tracesSampleRate: 1.0, // Adjust based on your needs (1.0 = 100% of transactions)
  debug: process.env.NODE_ENV === "development",
  beforeSend(event, hint) {
    // Filter out sensitive data
    if (event.request) {
      delete event.request.cookies;
      if (event.request.headers) {
        delete event.request.headers["authorization"];
        delete event.request.headers["cookie"];
      }
    }
    return event;
  },
});
*/

/**
 * Capture exception for server-side code
 */
export function captureException(error: unknown, context?: Record<string, unknown>): void {
  // Uncomment when Sentry is installed:
  /*
  if (error instanceof Error) {
    Sentry.captureException(error, { extra: context });
  } else {
    Sentry.captureException(new Error(String(error)), { extra: context });
  }
  */
  
  // Fallback logging
  if (process.env.NODE_ENV !== "production") {
    console.error("Exception captured:", error, context);
  }
}

/**
 * Capture message for server-side code
 */
export function captureMessage(message: string, level: "info" | "warning" | "error" = "info", context?: Record<string, unknown>): void {
  // Uncomment when Sentry is installed:
  /*
  Sentry.captureMessage(message, {
    level: level === "info" ? "info" : level === "warning" ? "warning" : "error",
    extra: context,
  });
  */
  
  // Fallback logging
  if (process.env.NODE_ENV !== "production") {
    console[level === "error" ? "error" : level === "warning" ? "warn" : "log"](message, context);
  }
}
