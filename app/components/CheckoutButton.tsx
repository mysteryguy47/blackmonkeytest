// components/CheckoutButton.tsx
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getCoursePrice } from "./PaymentForm";
import { Course } from "@shared/schema";

interface CheckoutButtonProps {
  course?: Course;
  className?: string;
}

export default function CheckoutButton({ course, className }: CheckoutButtonProps) {
  const router = useRouter();

  // If no course provided, this is a demo/test button - should be removed or hidden in production
  if (!course) {
    return null; // Hide button if no course selected
  }

  const orderAmount = getCoursePrice(course.id);

  const handleEnroll = () => {
    // Redirect to payment page which handles profile setup and payment flow
    router.push(`/payment/${course.id}`);
  };

  return (
    <Button
      onClick={handleEnroll}
      className={className}
      style={{
        background: `linear-gradient(135deg, ${course.neonColor}, ${course.neonColor}dd)`,
      }}
    >
      Enroll Now - ₹{orderAmount.toLocaleString("en-IN")}
    </Button>
  );
}
