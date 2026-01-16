/**
 * [Component] Magnetic Button - Physical Interaction (Optimized)
 * [Design] Cursor-attracted magnetic effect with rAF
 * [Performance] 6-8px max movement, mobile disabled
 */

"use client";

import { useRef, useState, useEffect } from "react";
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
  const [isMobile, setIsMobile] = useState(false);
  const rafRef = useRef<number | null>(null);

  // Detect mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Disable on mobile
    if (isMobile || !buttonRef.current) return;
    
    // Cancel previous rAF
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      if (!buttonRef.current) return;
      
      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      
      // Reduced max pull to 7px (6-8px range)
      const maxPull = 7;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const pullStrength = Math.min(distance / 100, 1);
      
      const moveX = Math.max(-maxPull, Math.min(maxPull, deltaX * pullStrength * 0.2));
      const moveY = Math.max(-maxPull, Math.min(maxPull, deltaY * pullStrength * 0.2));
      
      setPosition({ x: moveX, y: moveY });
    });
  };

  const handleMouseLeave = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    setPosition({ x: 0, y: 0 });
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const baseStyles = variant === "primary" 
    ? "bg-blue-600 text-white border border-blue-400/50 hover:bg-blue-500 hover:border-blue-300"
    : "bg-transparent text-white border border-white/30 hover:border-white/50 hover:bg-white/5";

  const content = (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={isMobile ? {} : { x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.1 }}
      className={`group relative inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base cursor-pointer ${baseStyles} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      style={{ transform: isMobile ? 'none' : undefined }}
    >
      <span>{children}</span>
      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </motion.div>
  );

  if (href) {
    return <a href={href} onClick={onClick}>{content}</a>;
  }

  return <div onClick={onClick}>{content}</div>;
}
