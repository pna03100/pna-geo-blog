/**
 * [Section] Hero - 2026 Trendy SaaS Design (Refined)
 * [Design] Clean, Readable, High-Tech
 */

"use client";

import { motion } from "framer-motion";
import { Trophy, ArrowRight, CheckCircle2 } from "lucide-react";
import dynamic from "next/dynamic";

// ✅ SEO Optimized: Dynamic Import
const ParticleNetwork = dynamic(() => import("@/components/ui/particle-network"), {
  ssr: false,
  loading: () => null,
});

export function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Layer 2: Particle Network (Strictly masked to RIGHT) */}
      <ParticleNetwork />

      {/* Layer 3: Content */}
      <div className="container relative z-10 mx-auto px-4 md:px-6 pt-32 pb-32 md:pt-48 md:pb-48">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Clean Text Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-start text-left space-y-8 max-w-2xl"
          >
            {/* 1. Main Headline (Fixed line-height for Korean) */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[2.5]"
            >
              구글애즈 광고 대행사,
              <br />
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-purple-500">
                  데이터로 증명하는
                </span>
                {/* Animated underline */}
                <motion.div
                  className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-blue-600 via-sky-500 to-purple-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 1 }}
                />
              </span>
              <br />
              피앤에이컴퍼니
            </motion.h1>

            {/* 2. Trust Badge (Moved to MIDDLE position) */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/60 backdrop-blur-xl border border-blue-200/60 shadow-lg relative overflow-hidden"
            >
              {/* Shimmer Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut",
                }}
              />
              
              <Trophy className="w-5 h-5 text-amber-500 relative z-10" />
              
              <span className="text-base md:text-lg font-semibold relative z-10">
                <span className="text-blue-700">구글 공식 파트너</span>
                <span className="mx-2 text-slate-300">|</span>
                <span className="text-slate-800">2023 구글 선정 우수 100대 캠페인</span>
              </span>
            </motion.div>

            {/* 3. Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed max-w-lg"
            >
              AI 마케팅, 구글 광고, 데이터 분석을 하나로 연결하여
              <br className="hidden md:block" />
              비즈니스의 확실한 성장을 설계합니다.
            </motion.p>

            {/* 4. Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              {/* Primary CTA */}
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold shadow-2xl shadow-blue-500/40 hover:shadow-blue-500/60 transition-all overflow-hidden"
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-sky-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <span className="relative flex items-center gap-2">
                  무료 진단 신청하기 
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.a>

              {/* Secondary CTA */}
              <motion.a
                href="#cases"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 rounded-full bg-white/60 backdrop-blur-lg border border-white/80 text-slate-700 font-bold hover:bg-white/80 hover:border-blue-200 transition-all shadow-lg"
              >
                성공 사례 보기
              </motion.a>
            </motion.div>
            
            {/* 5. Social Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-wrap gap-6 pt-2 text-sm font-semibold text-slate-600"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>15년+ 데이터 노하우</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>상위 1% 구글 파트너</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>평균 ROAS 500%</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: EMPTY SPACE (Filled by Particles) */}
          <div className="hidden lg:block h-full min-h-[600px]" />
          
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 1,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center gap-2 text-slate-400">
          <span className="text-xs font-medium">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-5 h-8 border-2 border-slate-300 rounded-full flex items-start justify-center p-1"
          >
            <div className="w-1 h-2 bg-slate-400 rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
