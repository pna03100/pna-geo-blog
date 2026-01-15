/**
 * [Page] Thank You - Contact Form Success Page
 * [Design] Clean, centered, animated confirmation
 * [UX] Reassures user, provides next actions
 */

"use client";

import { motion } from "framer-motion";
import { CheckCircle, Home, Lightbulb } from "lucide-react";
import Link from "next/link";
import { GridBackground } from "@/components/ui/grid-background";

export default function ThankYouPage() {
  return (
    <main className="relative min-h-screen pt-16 flex items-center justify-center bg-white">
      {/* Background */}
      <GridBackground />

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 md:px-6 max-w-3xl text-center py-20">
        {/* Animated Checkmark Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            duration: 0.6,
          }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-blue-600 shadow-2xl shadow-blue-600/50">
            <CheckCircle className="w-14 h-14 text-white" strokeWidth={2.5} />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight"
        >
          문의가 성공적으로 접수되었습니다.
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-base md:text-lg text-slate-600 mb-4 leading-relaxed"
        >
          담당자가 내용을 확인 후, 24시간 이내에
          <br />
          남겨주신 연락처로 안내해 드리겠습니다.
        </motion.p>

        {/* Emergency Contact */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-sm md:text-base text-slate-500 mb-12"
        >
          급한 문의는{" "}
          <a
            href="tel:010-6318-4601"
            className="font-semibold text-blue-600 hover:text-blue-700 underline decoration-2 underline-offset-4"
          >
            010-6318-4601
          </a>
          로 연락주세요.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          {/* Primary Button */}
          <Link
            href="/"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold text-base shadow-2xl shadow-blue-500/40 hover:shadow-blue-500/60 transition-all duration-300"
          >
            <Home className="w-5 h-5" />
            메인으로 돌아가기
          </Link>

          {/* Secondary Link */}
          <Link
            href="/insights"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white border-2 border-slate-200 text-slate-700 font-semibold text-base hover:border-blue-300 hover:text-blue-600 transition-all duration-300"
          >
            <Lightbulb className="w-5 h-5" />
            최신 마케팅 인사이트 보기
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
