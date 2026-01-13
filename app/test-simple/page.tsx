/**
 * [Test] 매우 간단한 테스트 페이지
 * [Performance] LCP 최적화 - 애니메이션 제거
 * [Design] 브랜드 컬러 준수 - Purple 제거
 */

"use client";

import { motion } from "framer-motion";
import { BlueprintBackground } from "@/components/ui/blueprint-background";

export default function TestSimplePage() {
  return (
    <>
      <BlueprintBackground />
      
      <div className="min-h-screen relative text-slate-900 flex items-center justify-center pt-[73px]">
        <div className="text-center space-y-8 bg-white/80 backdrop-blur-sm p-12 rounded-2xl border border-slate-200 shadow-lg">
          <h1 className="text-4xl font-bold text-slate-900">
            간단한 테스트 페이지
          </h1>
          
          {/* 기본 Framer Motion 테스트 - NO ENTRANCE ANIMATION */}
          <div className="text-2xl text-blue-600 font-semibold">
            Framer Motion 작동 확인 ✅
          </div>

          {/* 호버 테스트 - HOVER ONLY */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-blue-600 rounded-full text-xl font-bold text-white hover:bg-blue-700 transition-colors"
          >
            호버해보세요!
          </motion.button>

          <p className="text-slate-600 text-sm">
            이 페이지가 보인다면 Framer Motion은 정상 작동 중입니다.
          </p>
        </div>
      </div>
    </>
  );
}
