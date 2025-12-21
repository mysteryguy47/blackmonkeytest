"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Course } from "@shared/schema";
import { useSound } from "@/hooks/use-sound";
import { Loader2, AlertCircle, CheckCircle2, CreditCard, Lock, Shield, ShieldCheck, BadgeCheck, Verified, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Script from "next/script";
import { clientLogger } from "@/lib/client-logger";
import type { ProfileData } from "./ProfileSetup";
import { handleApiError, isRetryableError, calculateRetryDelay } from "@/lib/error-handler";

interface PaymentFormProps {
  course: Course;
  orderAmount: number;
  profileData: ProfileData | null;
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

export function PaymentForm({ course, orderAmount, profileData, onSuccess, onCancel }: PaymentFormProps) {
  const { play } = useSound();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cashfreeLoaded, setCashfreeLoaded] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (!profileData) {
      setError("Profile information is required. Please complete the profile setup.");
    }
  }, [profileData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    play("click");

    if (!profileData) {
      setError("Profile information is required");
      return;
    }

    setLoading(true);

    try {
      // Clean phone number (remove spaces, dashes, +91 prefix)
      const cleanPhone = profileData.parentPhone.replace(/\s|-/g, "").replace(/^\+91/, "");

      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_amount: orderAmount,
          customer_name: profileData.parentName.trim(),
          customer_email: profileData.parentEmail.trim().toLowerCase(),
          customer_phone: cleanPhone,
          course_id: course.id,
          child_name: profileData.childName.trim(),
          child_age: profileData.childAge,
          child_grade: profileData.childGrade?.trim() || null,
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
      setRetryCount(0);
      onSuccess?.();
    } catch (err) {
      const appError = handleApiError(err, "Payment initialization");
      clientLogger.error("Payment initialization failed", err, {
        courseId: course.id,
        orderAmount,
        retryCount,
      });
      setError(appError.message);
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
              className="flex items-center gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <p>{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Premium Order Summary */}
        <div 
          className="p-6 rounded-xl border-2 bg-gradient-to-br from-background/40 via-background/30 to-background/40 backdrop-blur-sm"
          style={{
            borderColor: `${course.neonColor}30`,
            background: `linear-gradient(135deg, ${course.neonColor}12 0%, ${course.neonColor}06 50%, transparent 100%)`,
            boxShadow: `0 4px 20px -4px ${course.neonColor}30`,
          }}
        >
          <div className="flex items-center justify-between mb-4 pb-4 border-b" style={{ borderColor: `${course.neonColor}20` }}>
            <span className="text-sm text-muted-foreground font-medium">Course</span>
            <span className="font-semibold text-foreground">{course.name}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground font-medium">Total Amount</span>
            <span className="text-3xl font-bold" style={{ color: course.neonColor }}>
              ₹{orderAmount.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        {/* Premium Profile Summary */}
        {profileData && (
          <div className="space-y-4">
            <div className="p-6 rounded-xl border-2 bg-gradient-to-br from-background/40 via-background/30 to-background/40 backdrop-blur-sm" style={{ borderColor: `${course.neonColor}30` }}>
              <h3 className="text-base font-semibold mb-5 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" style={{ color: course.neonColor }} />
                Profile Information
              </h3>
              <div className="space-y-4 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-muted-foreground text-xs">Parent Name</span>
                    <p className="font-semibold mt-1">{profileData.parentName}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-xs">Email</span>
                    <p className="font-semibold mt-1">{profileData.parentEmail}</p>
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">Phone</span>
                  <p className="font-semibold mt-1">{profileData.parentPhone}</p>
                </div>
                <div className="pt-4 border-t border-border/30 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-muted-foreground text-xs">Child Name</span>
                      <p className="font-semibold mt-1">{profileData.childName}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">Age</span>
                      <p className="font-semibold mt-1">{profileData.childAge} years</p>
                    </div>
                  </div>
                  {profileData.childGrade && (
                    <div className="mt-4">
                      <span className="text-muted-foreground text-xs">Grade</span>
                      <p className="font-semibold mt-1">{profileData.childGrade}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Email Confirmation Notice */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/20"
        >
          <Mail className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-muted-foreground">
            <p className="font-semibold text-foreground mb-1">Email Confirmation</p>
            <p>After successful payment, you'll receive a confirmation email with course access details and enrollment information.</p>
          </div>
        </motion.div>

        {/* Premium Security Badges */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20"
            >
              <ShieldCheck className="w-5 h-5 text-green-400 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-foreground">SSL Secured</p>
                <p className="text-[10px] text-muted-foreground">256-bit encryption</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="flex items-center gap-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20"
            >
              <Verified className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-foreground">PCI Compliant</p>
                <p className="text-[10px] text-muted-foreground">Payment security</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20"
            >
              <BadgeCheck className="w-5 h-5 text-purple-400 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-foreground">Cashfree</p>
                <p className="text-[10px] text-muted-foreground">Trusted gateway</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="flex items-center gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20"
            >
              <Lock className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-foreground">No Storage</p>
                <p className="text-[10px] text-muted-foreground">We don't save cards</p>
              </div>
            </motion.div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-border/30 backdrop-blur-sm">
            <Shield className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-muted-foreground">
              <p className="font-semibold text-foreground mb-1">100% Secure Payment</p>
              <p>Your payment is processed securely through Cashfree's PCI-DSS compliant infrastructure. We never store or access your payment details.</p>
            </div>
          </div>
        </div>

        {/* Action Buttons - Premium */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={loading}
              className="flex-1 h-11 font-medium border-border/50 hover:border-border transition-all"
            >
              Cancel
            </Button>
          )}
          <motion.button
            type="submit"
            disabled={loading || !profileData}
            className="flex-1 h-12 font-semibold text-white rounded-lg transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: loading || !profileData 
                ? 'linear-gradient(135deg, #64748b, #475569)'
                : `linear-gradient(135deg, ${course.neonColor}, ${course.neonColor}dd)`,
              boxShadow: loading || !profileData 
                ? 'none'
                : `0 4px 20px -4px ${course.neonColor}50`,
            }}
            whileHover={!loading && profileData ? { scale: 1.02 } : {}}
            whileTap={!loading && profileData ? { scale: 0.98 } : {}}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Processing Payment...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-5 h-5" />
                <span>Proceed to Secure Payment</span>
                <span className="text-sm opacity-90">₹{orderAmount.toLocaleString("en-IN")}</span>
              </>
            )}
          </motion.button>
        </div>
      </form>
    </>
  );
}

// Export helper function to get course price
export function getCoursePrice(courseId: string): number {
  return COURSE_PRICES[courseId] || 4999; // Default price
}
