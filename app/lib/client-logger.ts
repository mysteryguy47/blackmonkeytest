/**
 * Client-side Logger
 * 
 * Structured logging utility for client-side code (React components).
 * In production, integrate with services like Sentry, DataDog, or CloudWatch.
 */

type LogLevel = "info" | "warn" | "error";

interface LogContext {
  [key: string]: unknown;
}

class ClientLogger {
  private formatMessage(level: LogLevel, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? ` ${JSON.stringify(context)}` : "";
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${contextStr}`;
  }

  /**
   * Log informational messages
   */
  info(message: string, context?: LogContext): void {
    if (process.env.NODE_ENV !== "production") {
      console.log(this.formatMessage("info", message, context));
    }
    // In production, send to logging service
    // Example: Sentry.captureMessage(message, { level: "info", extra: context });
  }

  /**
   * Log warning messages
   */
  warn(message: string, context?: LogContext): void {
    if (process.env.NODE_ENV !== "production") {
      console.warn(this.formatMessage("warn", message, context));
    }
    // In production, send to logging service
    // Example: Sentry.captureMessage(message, { level: "warning", extra: context });
  }

  /**
   * Log error messages
   */
  error(message: string, error?: unknown, context?: LogContext): void {
    const errorContext = {
      ...context,
      error: error instanceof Error 
        ? {
            name: error.name,
            message: error.message,
            stack: error.stack,
          }
        : String(error),
    };

    if (process.env.NODE_ENV !== "production") {
      console.error(this.formatMessage("error", message, errorContext));
      if (error instanceof Error) {
        console.error(error.stack);
      }
    }
    
    // In production, send to error tracking service
    // Import and use: import { captureException } from "@/lib/sentry";
    // captureException(error, context);
  }
}

export const clientLogger = new ClientLogger();
