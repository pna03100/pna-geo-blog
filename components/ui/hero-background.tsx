/**
 * [Component] Hero Background - Apple-style Gradient Mesh
 * [Design] Ultra-smooth, premium gradient mesh like Apple.com
 * [Performance] Optimized with large blur and subtle opacity
 */

"use client";

import { motion } from "framer-motion";

export function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Apple-style Gradient Mesh */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        
        {/* Blob 1 - Top Left - Slow float */}
        <motion.div
          className="absolute"
          style={{
            top: '-20%',
            left: '-10%',
            width: '60%',
            height: '60%',
            background: 'radial-gradient(circle, rgba(147, 197, 253, 0.4) 0%, rgba(147, 197, 253, 0) 70%)',
            filter: 'blur(80px)',
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Blob 2 - Top Right - Opposite movement */}
        <motion.div
          className="absolute"
          style={{
            top: '-10%',
            right: '-10%',
            width: '55%',
            height: '55%',
            background: 'radial-gradient(circle, rgba(191, 219, 254, 0.35) 0%, rgba(191, 219, 254, 0) 70%)',
            filter: 'blur(90px)',
          }}
          animate={{
            x: [0, -30, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Blob 3 - Center - Subtle pulse */}
        <motion.div
          className="absolute"
          style={{
            top: '30%',
            left: '20%',
            width: '50%',
            height: '50%',
            background: 'radial-gradient(circle, rgba(96, 165, 250, 0.25) 0%, rgba(96, 165, 250, 0) 70%)',
            filter: 'blur(100px)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.25, 0.35, 0.25],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Blob 4 - Bottom Right - Gentle drift */}
        <motion.div
          className="absolute"
          style={{
            bottom: '-15%',
            right: '10%',
            width: '45%',
            height: '45%',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0) 70%)',
            filter: 'blur(70px)',
          }}
          animate={{
            x: [0, -20, 0],
            y: [0, -25, 0],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

      </div>

    </div>
  );
}
