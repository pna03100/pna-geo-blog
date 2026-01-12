/**
 * [Fixed] 더 간단한 MouseTextEffect
 * 무한 루프 방지 버전
 */

"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

interface MouseTextEffectSimpleProps {
  children: string;
  className?: string;
}

export function MouseTextEffectSimple({ 
  children, 
  className = "" 
}: MouseTextEffectSimpleProps) {
  const ref = useRef<HTMLSpanElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 300 };
  const translateX = useSpring(x, springConfig);
  const translateY = useSpring(y, springConfig);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const offsetX = e.clientX - centerX;
    const offsetY = e.clientY - centerY;
    
    x.set(offsetX * 0.1);
    y.set(offsetY * 0.1);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  
  return (
    <motion.span
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: translateX,
        y: translateY,
        display: "inline-block"
      }}
      className={className}
    >
      {children}
    </motion.span>
  );
}
