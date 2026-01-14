/**
 * [Section] Hero - Neo-Tech 2026 Standard
 * [Design] Kinetic Typography + Magnetic Interactions
 * [Performance] Optimized animations with framer-motion
 */

"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { TextReveal } from "@/components/ui/text-reveal";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Content Container */}
      <div className="container relative z-10 mx-auto px-4 md:px-6 max-w-7xl py-20 md:py-0">
        <div className="max-w-5xl mx-auto text-center space-y-8 md:space-y-12">
          
          {/* Badge - Minimal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-200 bg-blue-50/50 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">
              2023 구글 코리아 우수 100대 캠페인 선정
            </span>
          </motion.div>

          {/* Main Headline - Kinetic Typography */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            <TextReveal 
              className="text-slate-900" 
              staggerDelay={0.05}
              style={{ lineHeight: '1.15', marginBottom: '0.5rem' }}
            >
              구글애즈 광고 대행사,
            </TextReveal>
            <TextReveal 
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700"
              delay={0.3}
              staggerDelay={0.1}
              style={{ lineHeight: '1.15', marginBottom: '0.5rem' }}
            >
              데이터로 증명하는
            </TextReveal>
            <TextReveal 
              className="text-slate-900"
              delay={0.6}
              staggerDelay={0.08}
              style={{ lineHeight: '1.15' }}
            >
              피앤에이컴퍼니
            </TextReveal>
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-xl lg:text-2xl text-slate-600 font-medium max-w-3xl mx-auto leading-relaxed">
            데이터 기반 성과 마케팅 전문
            <br />
            Google Ads, SEO, GEO 최적화로 평균 ROAS 500% 달성
          </p>

          {/* CTA Buttons - Magnetic Interaction */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
          >
            <MagneticButton
              variant="primary"
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              무료 상담 시작하기
            </MagneticButton>

            <MagneticButton
              variant="secondary"
              onClick={() => {
                const solutionsSection = document.getElementById('solutions');
                if (solutionsSection) {
                  solutionsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              서비스 둘러보기
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-6 h-10 border-2 border-slate-300 rounded-full flex items-start justify-center p-2"
        >
          <div className="w-1.5 h-3 bg-slate-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
