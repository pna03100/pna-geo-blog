/**
 * [Design] GlassCard - Glassmorphism design system
 * [Interactive] Hover effects with Framer Motion
 */

"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function GlassCard({
  children,
  className = "",
  hover = true,
  onClick,
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, y: -4 } : {}}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={cn(
        "relative overflow-hidden rounded-3xl",
        "bg-white/60 backdrop-blur-md",
        "border border-white/40",
        "shadow-xl shadow-black/5",
        hover && "cursor-pointer",
        className
      )}
    >
      {/* Gradient Overlay on Hover */}
      {hover && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-sky-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
