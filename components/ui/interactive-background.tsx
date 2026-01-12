/**
 * [UI] Interactive Background - Data Grid Network
 * [Effect] Grid illuminates near mouse cursor (200px radius)
 * [Performance] GPU-accelerated with CSS transforms
 */

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function InteractiveBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/20 to-sky-50/25">
      {/* Animated Gradient Orbs */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/4 right-1/4 w-[32rem] h-[32rem] bg-blue-600/18 rounded-full blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, 100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/3 w-[28rem] h-[28rem] bg-sky-400/20 rounded-full blur-3xl"
        animate={{
          x: [0, 120, 0],
          y: [0, -60, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Interactive Data Grid */}
      {isMounted && (
        <div className="absolute inset-0">
          {/* Grid Pattern */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />

          {/* Mouse Glow Effect */}
          <div
            className="absolute pointer-events-none transition-opacity duration-300"
            style={{
              left: mousePosition.x - 200,
              top: mousePosition.y - 200,
              width: "400px",
              height: "400px",
              background: `radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.08) 30%, transparent 70%)`,
              opacity: mousePosition.x > 0 ? 1 : 0,
            }}
          />

          {/* Animated Data Nodes */}
          <svg className="absolute inset-0 w-full h-full opacity-40">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Data Points */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i / 12) * 2 * Math.PI;
              const radius = 200 + Math.sin(i) * 50;
              const cx = 50 + Math.cos(angle) * (radius / 10);
              const cy = 50 + Math.sin(angle) * (radius / 10);
              
              return (
                <motion.circle
                  key={i}
                  cx={`${cx}%`}
                  cy={`${cy}%`}
                  r="2"
                  fill="#3b82f6"
                  filter="url(#glow)"
                  initial={{ opacity: 0.3, scale: 0.8 }}
                  animate={{
                    opacity: [0.3, 0.8, 0.3],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 3 + i * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              );
            })}
          </svg>
        </div>
      )}

      {/* Grain Texture Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-30" />
    </div>
  );
}
