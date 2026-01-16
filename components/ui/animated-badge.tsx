/**
 * [Component] AnimatedBadge - Unified Hero Badge Animation
 * [Design] Consistent entrance animation across all pages
 * [A11y] Respects prefers-reduced-motion
 */

"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface AnimatedBadgeProps {
  icon?: LucideIcon;
  text: string;
  className?: string;
}

export function AnimatedBadge({ icon: Icon, text, className = "" }: AnimatedBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.5,
        ease: "easeOut"
      }}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 ${className}`}
    >
      {Icon && <Icon className="w-4 h-4 text-white" />}
      <span className="text-sm font-bold text-white">{text}</span>
    </motion.div>
  );
}
