import { motion } from "framer-motion";
import { ReactNode } from "react";
interface MotionDivProps {
  className?: string;
  children: ReactNode;
}

export const MotionDiv = ({ children, className }: MotionDivProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.15 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
