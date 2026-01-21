/**
 * [Component] Hero Content - Careons Style (Left Aligned, White Text)
 * [Design] Left-aligned with white text on dark background
 * [Performance] Server-side rendering for LCP & SEO
 */

"use client";

import { HeroButtons } from "./HeroButtons";
import { motion } from "framer-motion";

export function HeroContent() {
  return (
    <div className="max-w-3xl">
      {/* [Careons] Small Top Badge - Blue */}
      <motion.p 
        className="text-blue-400 font-semibold text-sm md:text-base mb-6 tracking-wide"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        데이터로 증명하는 성과 마케팅
      </motion.p>

      {/* 🎯 SEO OPTIMIZED: H1 - White Text, Left Aligned */}
      <motion.h1 
        className="mb-6 md:mb-8 text-5xl md:text-6xl lg:text-7xl font-extrabold text-white relative" 
        style={{ lineHeight: '1.2', letterSpacing: '-0.02em' }}
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="block">
          구글 광고 대행사.
        </span>
        <span className="block">
          피앤에이컴퍼니.
        </span>
      </motion.h1>

      {/* 🎯 SNIPPET TRAP - Direct Answer - White Text */}
      <motion.p 
        className="text-base md:text-lg text-white/90 leading-relaxed mb-10 md:mb-12 max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        구글애즈 · SEO · GEO 전문, 15년 경력의 구글 공식 파트너로 데이터 기반 성과 마케팅을 통해 평균 ROAS 500%를 달성합니다.
      </motion.p>

      {/* [Careons] CTA Buttons - Left Aligned */}
      <motion.div 
        className="flex flex-col sm:flex-row gap-4 mb-16 md:mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <HeroButtons />
      </motion.div>
      
      {/* [Careons] Bottom Stats - White Text, Left Aligned */}
      <motion.div 
        className="flex flex-wrap items-center gap-8 md:gap-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <div className="stat-item">
          <p className="text-3xl md:text-4xl font-bold text-white mb-1">15<span className="text-xl text-white/60">년</span></p>
          <p className="text-sm text-white/70">구글 파트너십</p>
        </div>
        <div className="h-12 w-px bg-white/20" />
        <div className="stat-item">
          <p className="text-3xl md:text-4xl font-bold text-blue-400 mb-1">500<span className="text-xl text-white/60">%</span></p>
          <p className="text-sm text-white/70">평균 ROAS</p>
        </div>
        <div className="h-12 w-px bg-white/20" />
        <div className="stat-item">
          <p className="text-3xl md:text-4xl font-bold text-white mb-1">1,000<span className="text-xl text-white/60">+</span></p>
          <p className="text-sm text-white/70">성공 캠페인</p>
        </div>
      </motion.div>
    </div>
  );
}
