/**
 * [Section] Hero - Main impact section
 * [Design] Clean typography, floating elements
 */

"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { FadeIn } from "./FadeIn";
import { SectionWrapper } from "./SectionWrapper";

export function HeroSection() {
  return (
    <SectionWrapper className="pt-32 md:pt-40 pb-16 md:pb-24">
      <div className="text-center space-y-6">
        {/* Badge */}
        <FadeIn delay={0.1}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-md border border-blue-200/50 shadow-lg"
          >
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-slate-900">
              Google 공식 파트너 | AI & GEO Marketing
            </span>
          </motion.div>
        </FadeIn>

        {/* Main Heading */}
        <FadeIn delay={0.2}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-relaxed md:leading-loose">
            <span className="text-slate-950">구글애즈 광고 대행사,</span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-sky-500 bg-clip-text text-transparent">
              데이터로 증명하는
            </span>
            <br />
            <span className="text-slate-950">피앤에이컴퍼니</span>
          </h1>
        </FadeIn>

        {/* Subtitle */}
        <FadeIn delay={0.3}>
          <p className="text-lg md:text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed font-medium">
            검색 의도 선점 타겟팅과 ROAS 최적화로
            <br className="hidden md:block" />
            광고주 평균 <strong className="text-blue-600 font-bold">500% ROAS</strong>를 달성합니다
          </p>
        </FadeIn>

        {/* CTA Buttons */}
        <FadeIn delay={0.4}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            {/* Primary CTA */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden px-7 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold text-base shadow-2xl shadow-blue-500/40 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-2">
                무료 진단 신청하기
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-sky-600 to-blue-600"
                initial={{ x: "100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>

            {/* Secondary CTA */}
            <motion.a
              href="#cases"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-7 py-3.5 rounded-full bg-white/70 backdrop-blur-md border border-blue-200/50 text-slate-900 font-bold text-base shadow-lg hover:bg-white/90 hover:border-blue-300 transition-all duration-300"
            >
              성공 사례 보기
            </motion.a>
          </div>
        </FadeIn>

        {/* Floating Elements */}
        <div className="relative pt-12">
          <FadeIn delay={0.5}>
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-slate-800 font-medium">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-lg shadow-blue-500/50" />
                <span>실시간 캠페인 관리</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse shadow-lg shadow-blue-600/50" />
                <span>GA4 정밀 분석</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse shadow-lg shadow-sky-500/50" />
                <span>AI 최적화</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </SectionWrapper>
  );
}
