"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Course } from "@shared/schema";
import { motion, AnimatePresence } from "framer-motion";
import { useSound } from "@/hooks/use-sound";
import { User, Users, Phone, Mail, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

interface ProfileSetupProps {
  course: Course;
  onComplete: (profileData: ProfileData) => void;
  onCancel?: () => void;
  userEmail?: string;
  userName?: string;
}

export interface ProfileData {
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  childName: string;
  childAge: string;
  childGrade?: string;
}

export function ProfileSetup({ course, onComplete, onCancel, userEmail, userName }: ProfileSetupProps) {
  const { play } = useSound();
  const [step, setStep] = useState<"parent" | "child">("parent");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  
  const [formData, setFormData] = useState<ProfileData>({
    parentName: userName || "",
    parentEmail: userEmail || "",
    parentPhone: "",
    childName: "",
    childAge: "",
    childGrade: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError(null);
  };

  const validateParent = (): boolean => {
    if (!formData.parentName.trim()) {
      setError("Please enter parent name");
      return false;
    }
    if (!formData.parentEmail.trim()) {
      setError("Please enter email address");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.parentEmail)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!formData.parentPhone.trim()) {
      setError("Please enter phone number");
      return false;
    }
    const cleanPhone = formData.parentPhone.replace(/\s|-/g, "").replace(/^\+91/, "");
    if (cleanPhone.length !== 10 || !/^[6-9]\d{9}$/.test(cleanPhone)) {
      setError("Please enter a valid 10-digit Indian phone number");
      return false;
    }
    return true;
  };

  const validateChild = (): boolean => {
    if (!formData.childName.trim()) {
      setError("Please enter child's name");
      return false;
    }
    if (!formData.childAge.trim()) {
      setError("Please enter child's age");
      return false;
    }
    const age = parseInt(formData.childAge);
    if (isNaN(age) || age < 4 || age > 18) {
      setError("Please enter a valid age between 4 and 18");
      return false;
    }
    return true;
  };

  const handleSendOTP = async () => {
    if (!validateParent()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // TODO: Implement OTP sending API
      // For now, simulate OTP sending
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOtpSent(true);
      play("click");
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // TODO: Implement OTP verification API
      // For now, accept any 6-digit code
      await new Promise(resolve => setTimeout(resolve, 500));
      setOtpVerified(true);
      play("click");
    } catch (err) {
      setError("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleParentNext = () => {
    if (!validateParent()) return;
    if (!otpVerified) {
      setError("Please verify your phone number with OTP");
      return;
    }
    setStep("child");
    play("click");
  };

  const handleChildSubmit = () => {
    if (!validateChild()) return;
    play("click");
    onComplete(formData);
  };

  return (
    <div className="space-y-6">
      {/* Premium Progress Indicator */}
      <div className="flex items-center gap-2 mb-8">
        <div className="flex-1 relative">
          <div className="h-1.5 rounded-full bg-border/30 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${course.neonColor}, ${course.neonColor}dd)`,
                boxShadow: `0 0 10px ${course.neonColor}40`,
              }}
              initial={{ width: step === "parent" ? "50%" : "100%" }}
              animate={{ width: step === "parent" ? "50%" : "100%" }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="absolute top-0 left-0 w-full flex justify-between mt-2">
            <span className={`text-xs font-medium ${step === "parent" ? "text-foreground" : "text-muted-foreground"}`}>
              Parent Details
            </span>
            <span className={`text-xs font-medium ${step === "child" ? "text-foreground" : "text-muted-foreground"}`}>
              Child Details
            </span>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === "parent" ? (
          <motion.div
            key="parent"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-8 md:p-10 border-2 border-border/30 bg-gradient-to-br from-background/50 via-background/40 to-background/50 backdrop-blur-sm relative overflow-hidden">
              {/* Subtle accent */}
              <div 
                className="absolute top-0 left-0 w-full h-px opacity-60"
                style={{
                  background: `linear-gradient(90deg, transparent, ${course.neonColor}60, transparent)`,
                  boxShadow: `0 0 15px ${course.neonColor}30`,
                }}
              />
              
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center border-2 shadow-lg" style={{ borderColor: course.neonColor, backgroundColor: `${course.neonColor}15`, boxShadow: `0 4px 20px -4px ${course.neonColor}40` }}>
                  <User className="w-6 h-6" style={{ color: course.neonColor }} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Parent Details</h3>
                  <p className="text-sm text-muted-foreground">Required for invoice and communication</p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <Label htmlFor="parentName" className="text-sm font-semibold mb-2.5 block flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    Parent Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="parentName"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleChange}
                    placeholder="Enter parent's full name"
                    className="h-11 bg-background/60 border-border/40 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="parentEmail" className="text-sm font-semibold mb-2.5 block flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    Email Address <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="parentEmail"
                    name="parentEmail"
                    type="email"
                    value={formData.parentEmail}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="h-11 bg-background/60 border-border/40 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="parentPhone" className="text-sm font-semibold mb-2.5 block flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    Phone Number <span className="text-destructive">*</span>
                  </Label>
                  <div className="flex gap-3">
                    <Input
                      id="parentPhone"
                      name="parentPhone"
                      type="tel"
                      value={formData.parentPhone}
                      onChange={handleChange}
                      placeholder="10-digit mobile number"
                      className="flex-1 h-11 bg-background/60 border-border/40 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      required
                    />
                    {!otpSent ? (
                      <Button
                        type="button"
                        onClick={handleSendOTP}
                        disabled={loading || !formData.parentPhone}
                        className="px-6 h-11 font-medium"
                        style={{
                          background: `linear-gradient(135deg, ${course.neonColor}, ${course.neonColor}dd)`,
                        }}
                      >
                        Send OTP
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        variant="outline"
                        disabled
                        className="px-6 h-11 font-medium"
                      >
                        OTP Sent
                      </Button>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">We'll send a verification code to this number</p>
                </div>

                {otpSent && !otpVerified && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-3 p-4 rounded-lg border border-border/30 bg-background/30"
                    style={{ borderColor: `${course.neonColor}30` }}
                  >
                    <Label htmlFor="otp" className="text-sm font-semibold mb-2.5 block">
                      Enter Verification Code <span className="text-destructive">*</span>
                    </Label>
                    <div className="flex gap-3">
                      <Input
                        id="otp"
                        type="text"
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                        placeholder="000000"
                        className="flex-1 h-11 bg-background/60 border-border/40 focus:border-primary focus:ring-2 focus:ring-primary/20 text-center text-lg tracking-widest font-mono"
                      />
                      <Button
                        type="button"
                        onClick={handleVerifyOTP}
                        disabled={loading || otp.length !== 6}
                        className="px-6 h-11 font-medium"
                        style={{
                          background: `linear-gradient(135deg, ${course.neonColor}, ${course.neonColor}dd)`,
                        }}
                      >
                        {loading ? "Verifying..." : "Verify"}
                      </Button>
                    </div>
                  </motion.div>
                )}

                {otpVerified && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2 text-sm p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-green-600"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="font-medium">Phone number verified successfully</span>
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg"
                  >
                    {error}
                  </motion.div>
                )}

                <div className="flex gap-3 pt-6 border-t border-border/20">
                  {onCancel && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onCancel}
                      className="flex-1 h-11 font-medium border-border/40 hover:border-border/80"
                    >
                      Cancel
                    </Button>
                  )}
                  <Button
                    type="button"
                    onClick={handleParentNext}
                    disabled={!otpVerified}
                    className="flex-1 h-11 font-semibold shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${course.neonColor}, ${course.neonColor}dd)`,
                      boxShadow: `0 4px 20px -4px ${course.neonColor}50`,
                    }}
                  >
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="child"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-8 md:p-10 border-2 border-border/30 bg-gradient-to-br from-background/50 via-background/40 to-background/50 backdrop-blur-sm relative overflow-hidden">
              {/* Subtle accent */}
              <div 
                className="absolute top-0 left-0 w-full h-px opacity-60"
                style={{
                  background: `linear-gradient(90deg, transparent, ${course.neonColor}60, transparent)`,
                  boxShadow: `0 0 15px ${course.neonColor}30`,
                }}
              />
              
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center border-2 shadow-lg" style={{ borderColor: course.neonColor, backgroundColor: `${course.neonColor}15`, boxShadow: `0 4px 20px -4px ${course.neonColor}40` }}>
                  <Users className="w-6 h-6" style={{ color: course.neonColor }} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Child Details</h3>
                  <p className="text-sm text-muted-foreground">Help us personalize the learning experience</p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <Label htmlFor="childName" className="text-sm font-semibold mb-2.5 block flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    Child's Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="childName"
                    name="childName"
                    value={formData.childName}
                    onChange={handleChange}
                    placeholder="Enter child's full name"
                    className="h-11 bg-background/60 border-border/40 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="childAge" className="text-sm font-semibold mb-2.5 block flex items-center gap-2">
                    <span className="text-muted-foreground">🎂</span>
                    Child's Age <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="childAge"
                    name="childAge"
                    type="number"
                    min="4"
                    max="18"
                    value={formData.childAge}
                    onChange={handleChange}
                    placeholder="Age (4-18 years)"
                    className="h-11 bg-background/60 border-border/40 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-2">Recommended age for {course.name}: {course.ageGroup}</p>
                </div>

                <div>
                  <Label htmlFor="childGrade" className="text-sm font-semibold mb-2.5 block flex items-center gap-2">
                    <span className="text-muted-foreground">📚</span>
                    Grade (Optional)
                  </Label>
                  <Input
                    id="childGrade"
                    name="childGrade"
                    value={formData.childGrade}
                    onChange={handleChange}
                    placeholder="e.g., Grade 5, Class 8"
                    className="h-11 bg-background/60 border-border/40 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg"
                  >
                    {error}
                  </motion.div>
                )}

                <div className="flex gap-3 pt-6 border-t border-border/20">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setStep("parent");
                      play("click");
                    }}
                    className="flex-1 h-11 font-medium border-border/40 hover:border-border/80"
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={handleChildSubmit}
                    className="flex-1 h-11 font-semibold shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${course.neonColor}, ${course.neonColor}dd)`,
                      boxShadow: `0 4px 20px -4px ${course.neonColor}50`,
                    }}
                  >
                    Complete Setup
                    <Sparkles className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

