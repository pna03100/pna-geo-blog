/**
 * [Section] Hero - 2026 Trendy SaaS Design
 * [Design] Clean, Readable, High-Tech with 3D Visual
 */

"use client";

import { motion } from "framer-motion";
import { Trophy, ArrowRight, CheckCircle2 } from "lucide-react";
import dynamic from "next/dynamic";
import { GoogleShapesBackground } from "@/components/ui/google-shapes-background";

// ✅ SEO Optimized: Dynamic Import
const HeroVisual3D = dynamic(() => import("@/components/ui/hero-visual-3d"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] flex items-center justify-center">
      <div className="w-[360px] md:w-[420px] aspect-[4/5] rounded-[32px] bg-gradient-to-br from-white/40 to-white/10 border border-white/50 backdrop-blur-xl animate-pulse" />
    </div>
  ),
});

export function HeroSection() {
  return (
    <section className="relative md:min-h-screen w-full bg-transparent">
      {/* Google Ambient Background - Desktop Only */}
      <div className="hidden md:block absolute inset-0 -z-10 opacity-70">
        <GoogleShapesBackground />
      </div>
      
      {/* Extended Background for Seamless Flow - Desktop Only */}
      <div className="hidden md:block absolute left-0 right-0 top-full h-32 -z-10 bg-gradient-to-b from-transparent via-blue-50/20 to-transparent" />

      {/* Layer 3: Content - Alignment Fix: Match Header width */}
      <div className="container relative z-10 mx-auto px-4 md:px-6 max-w-7xl pt-36 pb-0 md:pt-52 md:pb-48 bg-transparent">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-start">
          
          {/* Left Column: Text Content */}
          <div
            className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 md:space-y-8 max-w-2xl relative z-30"
          >
            {/* 1. Main Headline - NO ANIMATION for LCP */}
            <h1
              className="text-[2.4rem] md:text-[3.375rem] lg:text-[4.05rem] font-bold tracking-tight text-slate-900 !leading-[1.28]"
            >
              구글애즈 광고 대행사,
              <br />
              {/* Linear-style Text Shimmer (Flowing Data Effect) */}
              <span 
                className="inline-block bg-clip-text text-transparent bg-[linear-gradient(110deg,#2563EB,45%,#93C5FD,55%,#2563EB)] bg-[length:250%_100%] animate-text-shimmer"
              >
                데이터로 증명하는
              </span>
              <br />
              피앤에이컴퍼니
            </h1>

            {/* 2. Trust Badge (Below Title) - NO INITIAL ANIMATION for SEO */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 md:gap-3 md:px-6 md:py-3 rounded-full bg-white border border-slate-200 shadow-lg shadow-slate-900/5 relative overflow-hidden cursor-default"
            >
              {/* Shimmer Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50 to-transparent"
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
              
              <Trophy className="w-4 h-4 md:w-5 md:h-5 text-blue-600 relative z-10" />
              
              <span className="text-[0.72rem] md:text-lg font-semibold relative z-10 whitespace-nowrap">
                <span className="bg-clip-text text-transparent bg-[linear-gradient(110deg,#2563EB,45%,#93C5FD,55%,#2563EB)] bg-[length:250%_100%] animate-text-shimmer">
                  구글 공식 파트너
                </span>
                <span className="mx-1 md:mx-2 text-slate-300">|</span>
                <span className="text-slate-900">2023 구글 선정 우수 100대 캠페인</span>
              </span>
            </motion.div>

            {/* 3. Subtext - NO ANIMATION for immediate visibility */}
            <p
              className="text-sm md:text-xl text-slate-600 font-medium leading-relaxed max-w-lg mb-4"
            >
              검색 의도 선점 타겟팅과 ROAS 최적화로
              <br /> 광고주 평균 <strong className="text-[#2563EB]">500% ROAS</strong>를 달성합니다.
            </p>
          </div>

          {/* Right Column: 3D Visual + Social Proof */}
          <div className="hidden lg:flex flex-col items-center gap-6 relative -translate-y-[10%]">
            <div className="scale-90 lg:translate-x-0">
              <HeroVisual3D />
            </div>
            
            {/* Social Proof - Below 3D Element (NO ANIMATION) */}
            <div
              className="flex flex-col gap-3 text-sm font-semibold text-slate-600 lg:translate-x-[5%] -translate-y-[20%]"
            >
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>15년+ 데이터 노하우</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>상위 1% 구글 파트너</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>평균 ROAS 500%</span>
              </div>
            </div>
          </div>

        </div>

        {/* Social Proof - Mobile Only (NO ANIMATION) */}
        <div
          className="flex lg:hidden flex-col gap-2.5 text-xs md:text-sm font-semibold text-slate-600 mt-6 mb-6 items-center lg:items-start"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-500" />
            <span>15년+ 데이터 노하우</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-500" />
            <span>상위 1% 구글 파트너</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-500" />
            <span>평균 ROAS 500%</span>
          </div>
        </div>

        {/* CTA Buttons - NO INITIAL ANIMATION for immediate CTA visibility */}
        <div
          className="flex flex-wrap gap-3 md:gap-4 justify-center lg:justify-start mt-4 md:mt-8 xl:-mt-48"
        >
          {/* Primary CTA */}
          <motion.a
            href="tel:07077337905"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-6 py-3 md:px-8 md:py-4 rounded-full bg-blue-600 text-white text-sm md:text-base font-bold shadow-2xl shadow-blue-900/20 hover:shadow-blue-900/30 transition-all overflow-hidden"
          >
            {/* Hover gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <span className="relative flex items-center gap-2">
              무료 상담 신청하기 
              <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.a>
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
        className="hidden md:flex absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
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
