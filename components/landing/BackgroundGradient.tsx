/**
 * [Design] Background Gradient - Animated Orbs
 * [Purpose] Creates a unified, continuous atmosphere
 */

"use client";

import { motion } from "framer-motion";

export function BackgroundGradient() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/20 to-sky-50/25">
      {/* Animated Gradient Orbs - 더 넓게 퍼진 배치 */}
      {/* Top Left */}
      <motion.div
        className="absolute -top-1/4 -left-1/4 w-[48rem] h-[48rem] bg-blue-500/20 rounded-full blur-3xl"
        animate={{
          x: [0, 150, 0],
          y: [0, 100, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Top Right */}
      <motion.div
        className="absolute -top-1/4 -right-1/4 w-[52rem] h-[52rem] bg-blue-600/18 rounded-full blur-3xl"
        animate={{
          x: [0, -120, 0],
          y: [0, 150, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Bottom Left */}
      <motion.div
        className="absolute -bottom-1/4 -left-1/4 w-[44rem] h-[44rem] bg-sky-400/20 rounded-full blur-3xl"
        animate={{
          x: [0, 180, 0],
          y: [0, -80, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Bottom Right */}
      <motion.div
        className="absolute -bottom-1/3 -right-1/3 w-[50rem] h-[50rem] bg-sky-500/15 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, -120, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Grain Texture Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-30" />
    </div>
  );
}
