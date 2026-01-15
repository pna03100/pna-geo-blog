/**
 * [Component] Google Award Card - Glass Morphism with Light Reflection
 * [Design] Premium Glass Effect with Animated Light
 * [Purpose] Highlight "2023 Google Top 100 Campaign" Achievement
 */

"use client";

import { motion } from "framer-motion";

export function GoogleAwardCard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative w-full max-w-2xl mx-auto"
    >
      {/* Glass Card - Top & Bottom Border Only */}
      <div className="relative bg-transparent border-t border-b border-white/10 overflow-hidden">
        {/* Animated Light Reflection */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(110deg, transparent 30%, rgba(255, 255, 255, 0.15) 50%, transparent 70%)',
          }}
          animate={{
            x: ['-200%', '200%'],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatDelay: 0,
            ease: "easeInOut",
          }}
        />
        
        {/* Top Border Highlight */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        
        {/* Content */}
        <div className="relative p-8 md:p-10 text-center">
          {/* Icon */}
          <div className="mb-6">
            <span className="text-4xl drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">🏆</span>
          </div>
          
          {/* Title */}
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 drop-shadow-lg" style={{ lineHeight: '1.4' }}>
            2023년 구글 100대
            <br />
            우수 캠페인 선정
          </h3>
        </div>

        {/* Bottom Border Highlight */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </div>
    </motion.div>
  );
}
