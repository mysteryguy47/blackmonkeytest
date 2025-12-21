"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, Loader2, ArrowLeft, Home, Mail, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import DarkVeil from "@/components/DarkVeil";
import { Footer } from "@/components/Footer";
import { clientLogger } from "@/lib/client-logger";

type PaymentStatus = "verifying" | "success" | "failed" | "pending";

function PaymentResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<PaymentStatus>("verifying");
  const [orderId, setOrderId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (!searchParams) {
      setStatus("failed");
      setError("Unable to read payment response.");
      return;
    }
    
    const orderIdParam = searchParams.get("order_id");
    
    if (!orderIdParam) {
      setStatus("failed");
      setError("No order ID found in the payment response.");
      return;
    }

    setOrderId(orderIdParam);

    // Verify payment status
    (async () => {
      try {
        const resp = await fetch("/api/verify-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId: orderIdParam }),
        });

        const data = await resp.json();

        if (!resp.ok) {
          throw new Error(data.error || "Failed to verify payment");
        }

        if (data.status === "PAID") {
          setStatus("success");
        } else if (data.status === "ACTIVE" || data.status === "PENDING") {
          setStatus("pending");
        } else {
          setStatus("failed");
          setError(`Payment status: ${data.status}`);
        }
      } catch (err) {
        clientLogger.error("Payment verification failed", err, {
          orderId: orderIdParam,
        });
        setStatus("failed");
        setError(err instanceof Error ? err.message : "Failed to verify payment status");
      }
    })();
  }, [searchParams]);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <div
        className="glass-container"
        style={{ width: "100vw", height: "100vh", position: "fixed" }}
      >
        <DarkVeil />
      </div>

      <main className="relative z-10 pt-32 pb-20">
        <div className="max-w-2xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 md:p-12 text-center border-border/30 backdrop-blur-xl">
              {status === "verifying" && (
                <>
                  <Loader2 className="w-16 h-16 mx-auto mb-6 animate-spin text-neon-purple" />
                  <h1 className="text-3xl font-display font-bold mb-4">
                    Verifying Payment...
                  </h1>
                  <p className="text-muted-foreground">
                    Please wait while we confirm your payment.
                  </p>
                </>
              )}

              {status === "success" && (
                <>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.6 }}
                    className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 border-2 border-green-500/50 mb-6"
                  >
                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-6"
                  >
                    <h1 className="text-3xl md:text-4xl font-display font-bold mb-4 bg-gradient-to-r from-green-400 via-green-500 to-emerald-500 bg-clip-text text-transparent">
                      Payment Successful! 🎉
                    </h1>
                    <p className="text-lg text-foreground mb-4 font-medium">
                      Your enrollment has been confirmed!
                    </p>
                  </motion.div>
                  
                  {/* Email Confirmation Notice */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/20 mb-6"
                  >
                    <Mail className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div className="text-left">
                      <p className="text-sm font-semibold text-foreground mb-1">Confirmation Email Sent</p>
                      <p className="text-xs text-muted-foreground">
                        We've sent a detailed confirmation email with your order details, course access information, and next steps. Please check your inbox (and spam folder).
                      </p>
                    </div>
                  </motion.div>

                  {orderId && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 mb-8"
                    >
                      <p className="text-xs text-muted-foreground mb-1">Order Reference</p>
                      <p className="text-sm font-mono text-foreground font-semibold">{orderId}</p>
                    </motion.div>
                  )}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      onClick={() => router.push("/")}
                      className="bg-gradient-to-r from-neon-purple to-neon-cyan"
                    >
                      <Home className="w-5 h-5 mr-2" />
                      Back to Home
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => router.push("/courses")}
                    >
                      Browse Courses
                    </Button>
                  </div>
                </>
              )}

              {status === "pending" && (
                <>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.6 }}
                    className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-500/20 border-2 border-yellow-500/50 mb-6"
                  >
                    <Loader2 className="w-12 h-12 text-yellow-500 animate-spin" />
                  </motion.div>
                  <h1 className="text-3xl md:text-4xl font-display font-bold mb-4 text-yellow-500">
                    Payment Pending
                  </h1>
                  <p className="text-lg text-muted-foreground mb-6">
                    Your payment is being processed. This may take a few minutes.
                  </p>
                  <p className="text-sm text-muted-foreground mb-8">
                    You'll receive a confirmation email once the payment is confirmed.
                  </p>
                  <Button
                    size="lg"
                    onClick={() => router.push("/")}
                    variant="outline"
                  >
                    <Home className="w-5 h-5 mr-2" />
                    Back to Home
                  </Button>
                </>
              )}

              {status === "failed" && (
                <>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.6 }}
                    className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-destructive/20 border-2 border-destructive/50 mb-6"
                  >
                    <XCircle className="w-12 h-12 text-destructive" />
                  </motion.div>
                  <h1 className="text-3xl md:text-4xl font-display font-bold mb-4 text-destructive">
                    Payment Failed
                  </h1>
                  <p className="text-lg text-muted-foreground mb-4">
                    {error || "Your payment could not be processed."}
                  </p>
                  {orderId && (
                    <p className="text-sm text-muted-foreground mb-6">
                      Order ID: <span className="font-mono">{orderId}</span>
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground mb-8">
                    If you were charged, please contact support with your order ID.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      onClick={() => router.back()}
                      className="bg-gradient-to-r from-neon-purple to-neon-cyan"
                    >
                      <ArrowLeft className="w-5 h-5 mr-2" />
                      Try Again
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => router.push("/")}
                    >
                      <Home className="w-5 h-5 mr-2" />
                      Back to Home
                    </Button>
                  </div>
                </>
              )}
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function PaymentResultPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background">
          <Loader2 className="w-8 h-8 animate-spin text-neon-purple" />
        </div>
      }
    >
      <PaymentResultContent />
    </Suspense>
  );
}
