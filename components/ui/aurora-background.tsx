/**
 * [UI] Aurora Background - Kinetic Ambient Layer
 * [Purpose] Premium texture with noise + drifting orbs
 * [Design] 2026 Trendy SaaS aesthetic
 */

"use client";

import { motion } from "framer-motion";

export function AuroraBackground() {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Noise Texture Overlay */}
      <svg className="fixed inset-0 w-full h-full opacity-[0.05]">
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      {/* Drifting Orb 1 - Blue */}
      <motion.div
        className="absolute top-0 -left-1/4 w-[800px] h-[800px] rounded-full bg-blue-500/30 blur-3xl"
        animate={{
          x: [0, 100, -50, 0],
          y: [0, 150, 50, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Drifting Orb 2 - Purple */}
      <motion.div
        className="absolute top-1/3 -right-1/4 w-[700px] h-[700px] rounded-full bg-purple-500/20 blur-3xl"
        animate={{
          x: [0, -150, 100, 0],
          y: [0, 100, -80, 0],
          scale: [1, 1.1, 1.3, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Drifting Orb 3 - Sky */}
      <motion.div
        className="absolute -bottom-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-sky-400/20 blur-3xl"
        animate={{
          x: [0, 120, -100, 0],
          y: [0, -100, 80, 0],
          scale: [1, 0.9, 1.2, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Gradient Mesh Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.08),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(147,51,234,0.05),transparent_50%)]" />
    </div>
  );
}
