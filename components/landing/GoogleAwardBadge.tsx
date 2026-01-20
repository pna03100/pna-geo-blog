/**
 * [Component] Google Award Badge with Sensory Effects
 * [Design] Interactive 3D tilt and glow effects
 * [Performance] Client Component for mouse tracking
 */

"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export function GoogleAwardBadge() {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="inline-flex items-center gap-6 md:gap-8 px-10 md:px-16 py-8 md:py-12 rounded-3xl md:rounded-[2rem] bg-white border-2 border-blue-100 shadow-xl shadow-blue-500/10 cursor-pointer relative overflow-hidden"
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.25)"
      }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
    >
      {/* Animated Gradient Overlay */}
      <motion.div
        className="absolute inset-0 opacity-0 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50"
        whileHover={{ opacity: 0.5 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Sparkle Effect */}
      <motion.div
        className="absolute top-4 right-4 w-2 h-2 rounded-full bg-blue-400"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-6 left-6 w-1.5 h-1.5 rounded-full bg-indigo-400"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          delay: 1,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Trophy Icon with 3D effect */}
      <motion.div 
        className="flex items-center justify-center w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 relative"
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(30px)"
        }}
        whileHover={{ 
          rotate: [0, -10, 10, -10, 0],
        }}
        transition={{ duration: 0.5 }}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-blue-400/20 blur-xl" />
        <span className="text-5xl md:text-7xl relative z-10">🏆</span>
      </motion.div>
      
      {/* Text Content */}
      <div 
        className="text-left relative z-10"
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(20px)"
        }}
      >
        <motion.p 
          className="text-xl md:text-3xl font-bold text-slate-900 mb-2"
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          2023 Google Top 100 Campaign
        </motion.p>
        <p className="text-base md:text-lg text-slate-600">구글 공식 인증 우수 캠페인 선정</p>
      </div>
    </motion.div>
  );
}
