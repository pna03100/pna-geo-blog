/**
 * [Test] 매우 간단한 테스트 페이지
 */

"use client";

import { motion } from "framer-motion";

export default function TestSimplePage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
      <div className="text-center space-y-8">
        <h1 className="text-4xl font-bold">
          간단한 테스트 페이지
        </h1>
        
        {/* 기본 Framer Motion 테스트 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl text-purple-400"
        >
          Framer Motion 작동 확인 ✅
        </motion.div>

        {/* 호버 테스트 */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-purple-600 rounded-lg text-xl font-bold"
        >
          호버해보세요!
        </motion.button>

        <p className="text-slate-400 text-sm">
          이 페이지가 보인다면 Framer Motion은 정상 작동 중입니다.
        </p>
      </div>
    </div>
  );
}
