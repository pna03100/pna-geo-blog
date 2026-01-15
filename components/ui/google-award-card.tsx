/**
 * [Component] Google Award Card - Glass Morphism with Light Reflection
 * [Design] Premium Glass Effect with Animated Light
 * [Purpose] Highlight "2023 Google Top 100 Campaign" Achievement
 */

"use client";

import { motion } from "framer-motion";

export function GoogleAwardCard() {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Glass Card - Top & Bottom Border Only */}
      <div className="relative bg-transparent border-t border-b border-white/10 overflow-hidden">
        {/* Animated Light Reflection - Performance: 더 느리게 */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(110deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
            willChange: 'transform',
          }}
          animate={{
            x: ['-200%', '200%'],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "linear",
          }}
        />
        
        {/* Top Border Highlight */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        
        {/* Content */}
        <div className="relative p-8 md:p-10 text-center">
          {/* Icon */}
          <div className="mb-6">
            <span className="text-4xl">🏆</span>
          </div>
          
          {/* Title */}
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1" style={{ lineHeight: '1.4' }}>
            2023년 구글 100대
            <br />
            우수 캠페인 선정
          </h3>
        </div>

        {/* Bottom Border Highlight */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </div>
    </div>
  );
}
