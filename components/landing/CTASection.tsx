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
    <SectionWrapper id="contact" className="py-32">
      <FadeIn>
        <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-blue-600 via-blue-500 to-sky-500 p-12 md:p-20">
          {/* Animated background elements */}
          <motion.div
            className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
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
              <div className="p-4 rounded-3xl bg-white/20 backdrop-blur-sm">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
            </motion.div>

            {/* Heading */}
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              지금 바로 시작하세요
            </h2>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              무료 마케팅 진단으로 우리 회사의 성장 가능성을 확인하세요
            </p>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <motion.a
                href="mailto:contact@pnamarketing.co.kr"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group px-10 py-5 rounded-full bg-white text-purple-600 font-bold text-lg shadow-2xl hover:shadow-white/20 transition-all duration-300 flex items-center gap-2"
              >
                무료 상담 신청하기
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <motion.a
                href="tel:02-1234-5678"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 rounded-full bg-white/10 backdrop-blur-md border-2 border-white/30 text-white font-bold text-lg hover:bg-white/20 transition-all duration-300"
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
