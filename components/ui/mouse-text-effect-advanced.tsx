/**
 * [Design] Advanced MouseTextEffect - Character-by-Character Animation
 * [Source] Inspired by Framer Motion
 * [Security] Client Component
 */

"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";

interface MouseTextEffectAdvancedProps {
  children: string;
  className?: string;
  intensity?: number; // 0.1 = subtle, 0.5 = strong
}

export function MouseTextEffectAdvanced({ 
  children, 
  className = "",
  intensity = 0.2
}: MouseTextEffectAdvancedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chars = children.split("");

  return (
    <div ref={containerRef} className={`inline-flex ${className}`}>
      {chars.map((char, index) => (
        <Character
          key={index}
          char={char}
          index={index}
          intensity={intensity}
        />
      ))}
    </div>
  );
}

interface CharacterProps {
  char: string;
  index: number;
  intensity: number;
}

function Character({ char, index, intensity }: CharacterProps) {
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

    x.set(offsetX * intensity);
    y.set(offsetY * intensity);
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
      className="inline-block cursor-pointer"
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
}
