/**
 * [Design] MouseTextEffect - Framer Motion Component
 * [Source] https://framer.com/m/MouseTextEffect-3ze5.js@ibzteRIivtvpXUT3XNGy
 * [Security] Client Component
 */

"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";

interface MouseTextEffectProps {
  children: string;
  className?: string;
}

export function MouseTextEffect({ children, className = "" }: MouseTextEffectProps) {
  const ref = useRef<HTMLSpanElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 700 };
  const translateX = useSpring(x, springConfig);
  const translateY = useSpring(y, springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLSpanElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const offsetX = event.clientX - centerX;
    const offsetY = event.clientY - centerY;

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
      }}
      className={`inline-block cursor-pointer ${className}`}
    >
      {children}
    </motion.span>
  );
}
