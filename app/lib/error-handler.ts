/**
 * Standardized Error Handling Utility
 * 
 * Provides consistent error handling patterns across the application.
 */

import { logger } from "./logger";
import { clientLogger } from "./client-logger";

export interface AppError {
  message: string;
  code?: string;
  statusCode?: number;
  details?: unknown;
  isUserFriendly?: boolean;
}

/**
 * Create a standardized error object
 */
export function createError(
  message: string,
  options?: {
    code?: string;
    statusCode?: number;
    details?: unknown;
    isUserFriendly?: boolean;
  }
): AppError {
  return {
    message,
    code: options?.code,
    statusCode: options?.statusCode || 500,
    details: options?.details,
    isUserFriendly: options?.isUserFriendly ?? false,
  };
}

/**
 * Handle API errors consistently
 */
export function handleApiError(error: unknown, context?: string): AppError {
  // Log error
  if (typeof window === "undefined") {
    // Server-side
    logger.error(context || "API error", error);
  } else {
    // Client-side
    clientLogger.error(context || "API error", error);
  }

  // Return user-friendly error
  if (error instanceof Error) {
    // Check if it's a known error type
    if (error.message.includes("Network") || error.message.includes("fetch")) {
      return createError(
        "Network error. Please check your connection and try again.",
        { code: "NETWORK_ERROR", statusCode: 0, isUserFriendly: true }
      );
    }

    if (error.message.includes("401") || error.message.includes("Unauthorized")) {
      return createError(
        "Authentication required. Please log in and try again.",
        { code: "UNAUTHORIZED", statusCode: 401, isUserFriendly: true }
      );
    }

    if (error.message.includes("429") || error.message.includes("rate limit")) {
      return createError(
        "Too many requests. Please wait a moment and try again.",
        { code: "RATE_LIMITED", statusCode: 429, isUserFriendly: true }
      );
    }

    // Return error message if it's user-friendly, otherwise generic message
    return createError(
      error.message.includes("Please") || error.message.includes("required")
        ? error.message
        : "An unexpected error occurred. Please try again later.",
      { isUserFriendly: error.message.includes("Please") || error.message.includes("required") }
    );
  }

  // Unknown error type
  return createError(
    "An unexpected error occurred. Please try again later.",
    { isUserFriendly: true }
  );
}

/**
 * Format error for API response
 */
export function formatErrorResponse(error: AppError, includeDetails = false) {
  return {
    error: error.message,
    ...(error.code && { code: error.code }),
    ...(includeDetails && error.details && { details: error.details }),
  };
}

/**
 * Check if error is retryable
 */
export function isRetryableError(error: unknown): boolean {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    return (
      message.includes("network") ||
      message.includes("timeout") ||
      message.includes("econnreset") ||
      message.includes("econnrefused") ||
      message.includes("503") ||
      message.includes("502") ||
      message.includes("504")
    );
  }
  return false;
}

/**
 * Calculate retry delay with exponential backoff
 */
export function calculateRetryDelay(attempt: number, baseDelay = 1000): number {
  return Math.min(baseDelay * Math.pow(2, attempt), 30000); // Max 30 seconds
}

