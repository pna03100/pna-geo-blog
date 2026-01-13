/**
 * Google-Themed Ambient Background
 * Floating blurred shapes using Google's brand colors
 * [Performance] GPU-optimized with hardware acceleration
 * [Optimization] No initial fade-in, passive load
 */

'use client'
import { motion } from "framer-motion";

const shapes = [
  { color: '#4285F4', size: 300, top: '10%', left: '10%', delay: 0 }, // Blue - 왼쪽 상단
  { color: '#DB4437', size: 250, top: '60%', left: '5%', delay: 2 }, // Red - 왼쪽 하단
  { color: '#F4B400', size: 280, top: '5%', right: '15%', delay: 1 }, // Yellow - 오른쪽 상단
  { color: '#0F9D58', size: 200, bottom: '15%', right: '20%', delay: 3 }, // Green - 오른쪽 하단
  { color: '#4285F4', size: 180, top: '50%', left: '50%', delay: 1.5 }, // Blue - 중앙
];

export function GoogleShapesBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full mix-blend-multiply filter blur-3xl md:blur-3xl"
          style={{
            backgroundColor: shape.color,
            width: shape.size,
            height: shape.size,
            top: shape.top,
            left: shape.left,
            right: shape.right,
            bottom: shape.bottom,
            opacity: 0.25,
            // [Performance] Force hardware acceleration & passive rendering
            transform: 'translate3d(0, 0, 0)',
            willChange: 'transform',
            // [Optimization] Start visible, no fade-in
          }}
          // [Optimization] Subtle animation only, no initial state
          animate={{
            y: [0, -40, 0],
            rotate: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: shape.delay,
          }}
        />
      ))}
    </div>
  );
}
