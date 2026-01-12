/**
 * [UI] Velocity Scroll Banner - Infinite Horizontal Marquee
 * [Animation] GPU-accelerated smooth scrolling with Framer Motion
 * [Purpose] Subtle brand messaging separator
 */

"use client";

import { useRef } from "react";
import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";

interface VelocityScrollBannerProps {
  text?: string;
  speed?: number;
  className?: string;
}

export function VelocityScrollBanner({
  text = "PNA COMPANY • DATA DRIVEN • GOOGLE PARTNER • ROAS 500%",
  speed = 0.00625,
  className = "",
}: VelocityScrollBannerProps) {
  const baseX = useMotionValue(0);

  // Smooth infinite scroll animation
  useAnimationFrame((t, delta) => {
    // Move left continuously (negative direction)
    let moveBy = -speed * (delta / 16); // Normalize to ~60fps
    baseX.set(baseX.get() + moveBy);

    // Reset position when scrolled past full width (seamless loop)
    if (baseX.get() <= -100) {
      baseX.set(0);
    }
  });

  // Transform for smooth motion
  const x = useTransform(baseX, (v) => `${v}%`);

  // Single text item with proper spacing
  const TextItem = () => (
    <span className="inline-block whitespace-nowrap mx-16 md:mx-24">
      {text}
    </span>
  );

  return (
    <section className={`relative overflow-hidden py-8 md:py-12 ${className}`}>
      {/* Gradient Fade Mask */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to right, rgba(248, 250, 252, 1) 0%, transparent 10%, transparent 90%, rgba(248, 250, 252, 1) 100%)",
        }}
      />

      {/* Scrolling Text Container */}
      <div className="relative flex">
        <motion.div
          style={{ x }}
          className="flex whitespace-nowrap text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-wider"
        >
          <div 
            className="flex text-white"
            style={{ 
              WebkitTextStroke: '1px #cbd5e1'
            }}
          >
            <TextItem />
            <TextItem />
            <TextItem />
            <TextItem />
            <TextItem />
            <TextItem />
            <TextItem />
            <TextItem />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
