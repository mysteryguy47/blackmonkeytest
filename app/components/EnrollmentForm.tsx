import { motion } from "framer-motion";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSound } from "@/hooks/use-sound";
import { Check } from "lucide-react";

interface EnrollmentFormProps {
  courseId: string;
  courseName: string;
  onSuccess?: () => void;
}

export function EnrollmentForm({ courseId, courseName, onSuccess }: EnrollmentFormProps) {
  const { play } = useSound();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    studentName: "",
    parentName: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    play("click");

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSuccess(true);
      play("success");
      setTimeout(() => {
        onSuccess?.();
      }, 2000);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 border border-green-500/50 mb-4"
        >
          <Check className="w-8 h-8 text-green-500" />
        </motion.div>
        <h3 className="text-xl font-bold mb-2">Enrolled Successfully!</h3>
        <p className="text-muted-foreground">You'll receive a confirmation email shortly</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" data-testid={`form-enroll-${courseId}`}>
      <div>
        <label className="text-sm text-muted-foreground mb-2 block">Student Name</label>
        <Input
          name="studentName"
          value={formData.studentName}
          onChange={handleChange}
          placeholder="Your name"
          required
          data-testid="input-student-name"
        />
      </div>

      <div>
        <label className="text-sm text-muted-foreground mb-2 block">Parent/Guardian Name</label>
        <Input
          name="parentName"
          value={formData.parentName}
          onChange={handleChange}
          placeholder="Parent's name"
          data-testid="input-parent-name"
        />
      </div>

      <div>
        <label className="text-sm text-muted-foreground mb-2 block">Email</label>
        <Input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
          required
          data-testid="input-email"
        />
      </div>

      <div>
        <label className="text-sm text-muted-foreground mb-2 block">Phone</label>
        <Input
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+91 98765 43210"
          required
          data-testid="input-phone"
        />
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full"
        data-testid={`button-submit-enroll-${courseId}`}
      >
        {isLoading ? (
          <motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1, repeat: Infinity }}>
            Enrolling...
          </motion.span>
        ) : (
          "Confirm Enrollment"
        )}
      </Button>
    </form>
  );
}
