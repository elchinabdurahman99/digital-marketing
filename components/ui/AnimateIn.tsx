"use client";
import { motion, type Variants } from "framer-motion";

export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

export const staggerContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
};

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variants?: Variants;
}

export default function AnimateIn({ children, className, delay = 0, variants }: Props) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={variants ?? fadeUp}
      transition={{ delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
}

export function AnimateStagger({ children, className, delay = 0 }: Props) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={staggerContainer}
      transition={{ delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
}
