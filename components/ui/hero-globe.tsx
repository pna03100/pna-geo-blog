/**
 * [UI] Interactive Holographic Globe - PNA Global Reach
 * [Tech] Cobe WebGL Globe with Smooth Drag Interaction
 * [SEO] Lazy loaded via dynamic import to prevent LCP blocking
 * [Purpose] Visual proof of international expertise with Seoul HQ marker
 */

"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function HeroGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null);
  const pointerInteractionMovement = useRef({ x: 0, y: 0 }); // ✅ Track both X and Y

  useEffect(() => {
    let phi = 0;
    let width = 0;

    if (!canvasRef.current) return;

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };
    
    window.addEventListener('resize', onResize);
    onResize();

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3, // Starting tilt
      dark: 0, // Light mode
      diffuse: 3, // ✅ Soft light spread
      mapSamples: 16000, // Dot density
      mapBrightness: 12, // ✅ High brightness to make dots pop
      baseColor: [0.93, 0.96, 1], // ✅ Pale Blue Ocean
      markerColor: [0.1, 0.4, 1], // ✅ Electric Blue Dots
      glowColor: [0.8, 0.9, 1], // ✅ Strong Sky Atmosphere
      markers: [
        // Seoul, South Korea (PNA HQ)
        { location: [37.5665, 126.978], size: 0.1 },
      ],
      onRender: (state) => {
        // ✅ SMOOTH PHYSICS: Only auto-rotate if NOT dragging
        if (!pointerInteracting.current) {
          phi += 0.005;
        }
        
        // ✅ 2-AXIS ROTATION
        // Horizontal spin (phi)
        state.phi = phi + pointerInteractionMovement.current.x;
        
        // Vertical tilt (theta) with safe constraints
        // Keep theta in a range where the map is always visible
        const thetaValue = 0.4 + pointerInteractionMovement.current.y;
        state.theta = Math.min(Math.max(thetaValue, 0.2), 0.8); // ✅ Safe range: 0.2 ~ 0.8
        
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    return () => {
      globe.destroy();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
      className="relative w-full max-w-[600px] aspect-square mx-auto cursor-grab active:cursor-grabbing"
      onPointerDown={(e) => {
        // ✅ Capture start position for both X and Y
        pointerInteracting.current = {
          x: e.clientX - pointerInteractionMovement.current.x,
          y: e.clientY - pointerInteractionMovement.current.y,
        };
      }}
      onPointerUp={() => {
        pointerInteracting.current = null;
      }}
      onPointerOut={() => {
        pointerInteracting.current = null;
      }}
      onMouseMove={(e) => {
        if (pointerInteracting.current !== null) {
          // ✅ Calculate both horizontal (X) and vertical (Y) deltas
          const deltaX = e.clientX - pointerInteracting.current.x;
          const deltaY = e.clientY - pointerInteracting.current.y;
          
          pointerInteractionMovement.current = {
            x: deltaX * 0.005, // Horizontal sensitivity
            y: deltaY * -0.001, // ✅ Reduced vertical sensitivity for stability
          };
        }
      }}
      onTouchMove={(e) => {
        if (pointerInteracting.current !== null && e.touches[0]) {
          // ✅ Touch support for both axes
          const deltaX = e.touches[0].clientX - pointerInteracting.current.x;
          const deltaY = e.touches[0].clientY - pointerInteracting.current.y;
          
          pointerInteractionMovement.current = {
            x: deltaX * 0.005,
            y: deltaY * -0.001, // ✅ Reduced for stability
          };
        }
      }}
    >
      {/* Holographic Glow Effect - Enhanced Blue */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/40 via-sky-400/30 to-blue-500/40 blur-3xl rounded-full -z-10 animate-pulse" />
      
      {/* Additional Ring Glow - Stronger Blue */}
      <motion.div
        className="absolute inset-0 rounded-full border-4 border-blue-300/30"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          maxWidth: "100%",
          aspectRatio: "1",
          contain: "layout paint size",
          opacity: 1,
        }}
      />

      {/* Floating Label - Seoul HQ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-blue-300 shadow-xl pointer-events-none"
      >
        <div className="flex items-center gap-2">
          <motion.div
            className="w-2 h-2 rounded-full bg-blue-600"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <span className="text-sm font-semibold text-slate-900">
            📍 Seoul, Korea
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
