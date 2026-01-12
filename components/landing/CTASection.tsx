/**
 * [Section] CTA - Final call to action
 * [Design] Bold, gradient, high contrast
 */

"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { FadeIn } from "./FadeIn";
import { SectionWrapper } from "./SectionWrapper";

export function CTASection() {
  return (
    <SectionWrapper id="contact" className="py-16 md:py-20">
      <FadeIn>
        <div className="relative overflow-hidden rounded-[3rem] bg-black p-12 md:p-20">
          {/* Animated background elements */}
          <motion.div
            className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl"
            style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)' }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl"
            style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)' }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <div className="relative z-10 text-center space-y-8">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="inline-flex items-center justify-center"
            >
              <motion.div 
                className="p-4 rounded-3xl bg-blue-600/30 backdrop-blur-sm border border-blue-400/50"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(59, 130, 246, 0.4)',
                    '0 0 40px rgba(59, 130, 246, 0.6)',
                    '0 0 20px rgba(59, 130, 246, 0.4)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Sparkles className="w-12 h-12 text-blue-300" />
              </motion.div>
            </motion.div>

            {/* Heading */}
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
              지금 바로 시작하세요
            </h2>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              무료 마케팅 진단으로 우리 회사의 성장 가능성을 확인하세요
            </p>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <motion.a
                href="mailto:pna0310@naver.com"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-10 py-5 rounded-full bg-blue-600 border-2 border-blue-400 text-white font-bold text-lg transition-all duration-300 flex items-center gap-2"
                style={{
                  boxShadow: '0 0 30px rgba(59, 130, 246, 0.6), 0 0 60px rgba(59, 130, 246, 0.3), inset 0 0 20px rgba(147, 197, 253, 0.2)'
                }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full bg-blue-400/20"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  무료 상담 신청하기
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.a>

              <motion.a
                href="tel:070-7733-7905"
                whileHover={{ 
                  scale: 1.05, 
                  y: -2,
                  boxShadow: '0 0 20px rgba(255, 255, 255, 0.3), inset 0 0 10px rgba(255, 255, 255, 0.1)'
                }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 rounded-full bg-white/5 backdrop-blur-md border-2 border-white/40 text-white font-bold text-lg transition-all duration-300"
                style={{
                  boxShadow: '0 0 15px rgba(255, 255, 255, 0.1), inset 0 0 10px rgba(255, 255, 255, 0.05)'
                }}
              >
                전화 상담하기
              </motion.a>
            </div>

            {/* Trust Signals */}
            <div className="flex flex-wrap justify-center gap-8 pt-8 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Google 공식 파트너</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>15년+ 실전 경험</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>평균 ROAS 500%</span>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </SectionWrapper>
  );
}
