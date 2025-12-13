"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Course } from "@shared/schema";
import { useSound } from "@/hooks/use-sound";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Script from "next/script";

interface PaymentFormProps {
  course: Course;
  orderAmount: number;
  onSuccess?: () => void;
  onCancel?: () => void;
}

// Course pricing configuration (in INR)
const COURSE_PRICES: Record<string, number> = {
  shunya: 2999,
  chakra: 4999,
  yantra: 6999,
  ananta: 8999,
  garuda: 9999,
};

export function PaymentForm({ course, orderAmount, onSuccess, onCancel }: PaymentFormProps) {
  const { play } = useSound();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
  });
  const [cashfreeLoaded, setCashfreeLoaded] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError(null); // Clear error on input change
  };

  const validateForm = (): boolean => {
    if (!formData.customer_name.trim()) {
      setError("Please enter your name");
      return false;
    }
    if (!formData.customer_email.trim()) {
      setError("Please enter your email");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customer_email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!formData.customer_phone.trim()) {
      setError("Please enter your phone number");
      return false;
    }
    // Indian phone number validation (10 digits, optionally with +91)
    const cleanPhone = formData.customer_phone.replace(/\s|-/g, "").replace(/^\+91/, "");
    if (cleanPhone.length !== 10 || !/^[6-9]\d{9}$/.test(cleanPhone)) {
      setError("Please enter a valid 10-digit Indian phone number (starting with 6-9)");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    play("click");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Clean phone number (remove spaces, dashes, +91 prefix)
      const cleanPhone = formData.customer_phone.replace(/\s|-/g, "").replace(/^\+91/, "");

      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_amount: orderAmount,
          customer_name: formData.customer_name.trim(),
          customer_email: formData.customer_email.trim().toLowerCase(),
          customer_phone: cleanPhone,
          course_id: course.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create order");
      }

      if (!data.paymentSessionId) {
        throw new Error("Payment session not created");
      }

      // Wait for Cashfree SDK to load if not already loaded (with timeout)
      if (!cashfreeLoaded) {
        let attempts = 0;
        const maxAttempts = 50; // 5 seconds max wait
        await new Promise((resolve, reject) => {
          const checkCashfree = () => {
            attempts++;
            if (window.Cashfree) {
              setCashfreeLoaded(true);
              resolve(true);
            } else if (attempts >= maxAttempts) {
              reject(new Error("Cashfree SDK failed to load. Please refresh the page and try again."));
            } else {
              setTimeout(checkCashfree, 100);
            }
          };
          checkCashfree();
        });
      }

      // Initialize Cashfree checkout
      if (!window.Cashfree) {
        throw new Error("Cashfree SDK not available");
      }
      
      const cashfree = window.Cashfree({ mode: "production" });
      cashfree.checkout({
        paymentSessionId: data.paymentSessionId,
        redirectTarget: "_self",
      });

      play("success");
      onSuccess?.();
    } catch (err) {
      console.error("Payment error:", err);
      setError(err instanceof Error ? err.message : "Payment initialization failed. Please try again.");
      play("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Load Cashfree SDK */}
      <Script
        src="https://sdk.cashfree.com/js/v3/cashfree.js"
        onLoad={() => {
          setCashfreeLoaded(true);
        }}
        onError={() => {
          setError("Failed to load payment gateway. Please refresh the page.");
        }}
        strategy="afterInteractive"
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Order Summary */}
        <div className="p-4 rounded-lg border border-border/20 bg-card/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Course</span>
            <span className="font-semibold">{course.name}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Amount</span>
            <span className="text-xl font-bold" style={{ color: course.neonColor }}>
              ₹{orderAmount.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label htmlFor="customer_name" className="text-sm font-medium text-foreground mb-2 block">
              Full Name <span className="text-destructive">*</span>
            </label>
            <Input
              id="customer_name"
              name="customer_name"
              type="text"
              value={formData.customer_name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              disabled={loading}
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="customer_email" className="text-sm font-medium text-foreground mb-2 block">
              Email Address <span className="text-destructive">*</span>
            </label>
            <Input
              id="customer_email"
              name="customer_email"
              type="email"
              value={formData.customer_email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
              disabled={loading}
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="customer_phone" className="text-sm font-medium text-foreground mb-2 block">
              Phone Number <span className="text-destructive">*</span>
            </label>
            <Input
              id="customer_phone"
              name="customer_phone"
              type="tel"
              value={formData.customer_phone}
              onChange={handleChange}
              placeholder="9876543210"
              required
              disabled={loading}
              className="w-full"
              maxLength={13}
            />
            <p className="text-xs text-muted-foreground mt-1">Enter 10-digit Indian phone number</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={loading}
              className="flex-1"
            >
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            disabled={loading}
            className="flex-1"
            style={{
              background: `linear-gradient(135deg, ${course.neonColor}, ${course.neonColor}dd)`,
            }}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Pay ₹{orderAmount.toLocaleString("en-IN")}
              </>
            )}
          </Button>
        </div>
      </form>
    </>
  );
}

// Export helper function to get course price
export function getCoursePrice(courseId: string): number {
  return COURSE_PRICES[courseId] || 4999; // Default price
}
