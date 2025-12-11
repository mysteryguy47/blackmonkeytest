import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { useSound } from "@/hooks/use-sound";

interface ColorShiftButtonProps {
  children: ReactNode;
  colors: string[];
  onClick?: () => void;
  className?: string;
  "data-testid"?: string;
}

export function ColorShiftButton({
  children,
  colors,
  onClick,
  className,
  "data-testid": testId,
}: ColorShiftButtonProps) {
  const { play } = useSound();

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => play("hover")}
    >
      <Button
        onClick={() => {
          play("click");
          onClick?.();
        }}
        className={`relative overflow-hidden ${className}`}
        style={{
          background: `linear-gradient(90deg, ${colors.join(", ")})`,
          backgroundSize: "200% 200%",
        }}
        data-testid={testId}
      >
        <motion.span
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className="absolute inset-0 opacity-20"
        />
        <span className="relative">{children}</span>
      </Button>
    </motion.div>
  );
}
