/**
 * Redis-based Rate Limiting
 * 
 * Production-ready rate limiting using Upstash Redis.
 * 
 * SETUP REQUIRED:
 * 1. Create free Upstash Redis account: https://upstash.com/
 * 2. Create a Redis database
 * 3. Add environment variables:
 *    - UPSTASH_REDIS_REST_URL
 *    - UPSTASH_REDIS_REST_TOKEN
 * 4. Install package: npm install @upstash/ratelimit @upstash/redis
 * 
 * USAGE:
 * import { checkRateLimit } from "@/lib/rate-limit-redis";
 * const result = await checkRateLimit(ip, pathname);
 */

// Uncomment when Upstash is set up:
/*
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Create rate limiters
const apiRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "1 m"), // 10 requests per minute
  analytics: true,
  prefix: "@upstash/ratelimit/api",
});

const generalRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, "1 m"), // 100 requests per minute
  analytics: true,
  prefix: "@upstash/ratelimit/general",
});

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
}

export async function checkRateLimit(
  ip: string,
  pathname: string
): Promise<RateLimitResult> {
  const isApiRoute = pathname.startsWith("/api/");
  const limiter = isApiRoute ? apiRateLimiter : generalRateLimiter;
  
  const key = `${ip}:${pathname}`;
  const result = await limiter.limit(key);
  
  return {
    allowed: result.success,
    remaining: result.remaining,
    resetTime: result.reset,
  };
}
*/

// Fallback implementation (in-memory) until Redis is configured
// This will be used if Upstash is not configured
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_CONFIG = {
  api: {
    maxRequests: 10,
    windowMs: 60 * 1000,
  },
  general: {
    maxRequests: 100,
    windowMs: 60 * 1000,
  },
};

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
}

export async function checkRateLimit(
  ip: string,
  pathname: string
): Promise<RateLimitResult> {
  // Check if Upstash Redis is configured
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    // Use Redis-based rate limiting (uncomment the code above)
    // For now, fall back to in-memory
    console.warn("Upstash Redis configured but code not uncommented. Using in-memory fallback.");
  }

  // Fallback: In-memory rate limiting (not production-ready for distributed systems)
  const isApiRoute = pathname.startsWith("/api/");
  const config = isApiRoute ? RATE_LIMIT_CONFIG.api : RATE_LIMIT_CONFIG.general;
  
  const key = `${ip}:${pathname}`;
  const now = Date.now();
  const record = rateLimitStore.get(key);
  
  // Clean up expired entries periodically
  if (rateLimitStore.size > 10000) {
    for (const [k, v] of rateLimitStore.entries()) {
      if (v.resetTime < now) {
        rateLimitStore.delete(k);
      }
    }
  }
  
  if (!record || record.resetTime < now) {
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + config.windowMs,
    });
    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      resetTime: now + config.windowMs,
    };
  }
  
  if (record.count >= config.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: record.resetTime,
    };
  }
  
  record.count++;
  rateLimitStore.set(key, record);
  
  return {
    allowed: true,
    remaining: config.maxRequests - record.count,
    resetTime: record.resetTime,
  };
}

