/**
 * [UI] Magnetic Button - Button with magnetic hover effect
 * [Effect] Button moves slightly towards cursor before clicking
 * [Performance] GPU-accelerated transforms
 */

"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface MagneticButtonProps {
  href: string;
  children?: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

export function MagneticButton({
  href,
  children,
  variant = "primary",
  className = "",
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate distance from center
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    // Apply magnetic effect (max 15px movement)
    const magnetStrength = 0.3;
    setPosition({
      x: deltaX * magnetStrength,
      y: deltaY * magnetStrength,
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles =
    variant === "primary"
      ? "group relative overflow-hidden px-7 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold text-base shadow-2xl shadow-blue-500/40"
      : "px-7 py-3.5 rounded-full bg-white/70 backdrop-blur-md border border-blue-200/50 text-slate-900 font-bold text-base shadow-lg hover:bg-white/90 hover:border-blue-300";

  return (
    <motion.a
      ref={buttonRef}
      href={href}
      className={`${baseStyles} transition-all duration-300 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1,
      }}
      whileTap={{ scale: 0.95 }}
    >
      {variant === "primary" ? (
        <>
          <span className="relative z-10 flex items-center gap-2">
            {children || "문의하기"}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-sky-600 to-blue-600"
            initial={{ x: "100%" }}
            whileHover={{ x: "0%" }}
            transition={{ duration: 0.3 }}
          />
        </>
      ) : (
        children || "성공 사례 보기"
      )}
    </motion.a>
  );
}
