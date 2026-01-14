/**
 * [Component] Magnetic Button - Physical Interaction
 * [Design] Cursor-attracted with shining sheen effect
 * [Behavior] Neo-Tech 2026 Standard
 */

"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
}

export function MagneticButton({ 
  children, 
  href, 
  onClick, 
  variant = "primary",
  className = "" 
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from center
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    
    // Magnetic pull (max 12px)
    const maxPull = 12;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const pullStrength = Math.min(distance / 100, 1);
    
    setPosition({
      x: deltaX * pullStrength * 0.3,
      y: deltaY * pullStrength * 0.3,
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles = variant === "primary" 
    ? "bg-blue-600 text-white shadow-2xl shadow-blue-600/30 hover:shadow-blue-600/50 border-2 border-blue-600"
    : "bg-white text-slate-900 border-2 border-slate-300 hover:border-slate-400";

  const content = (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`group relative inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg overflow-hidden cursor-pointer ${baseStyles} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Shining Sheen Effect */}
      <motion.div
        className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
        }}
      />
      
      {/* Content */}
      <span className="relative z-10">{children}</span>
      <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </motion.div>
  );

  if (href) {
    return <a href={href} onClick={onClick}>{content}</a>;
  }

  return <div onClick={onClick}>{content}</div>;
}
