// components/CheckoutButton.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PaymentForm, getCoursePrice } from "./PaymentForm";
import { Course } from "@shared/schema";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface CheckoutButtonProps {
  course?: Course;
  className?: string;
}

export default function CheckoutButton({ course, className }: CheckoutButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  // If no course provided, this is a demo/test button - should be removed or hidden in production
  if (!course) {
    return null; // Hide button if no course selected
  }

  const orderAmount = getCoursePrice(course.id);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className={className}
        style={{
          background: `linear-gradient(135deg, ${course.neonColor}, ${course.neonColor}dd)`,
        }}
      >
        Enroll Now - ₹{orderAmount.toLocaleString("en-IN")}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Your Enrollment</DialogTitle>
          </DialogHeader>
          <PaymentForm
            course={course}
            orderAmount={orderAmount}
            onSuccess={() => setIsOpen(false)}
            onCancel={() => setIsOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
