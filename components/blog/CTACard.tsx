/**
 * [Sidebar] CTA Card
 * Call-to-action widget for lead generation
 */

"use client";

import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export function CTACard() {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 p-8 text-white shadow-lg min-h-[359px] flex flex-col justify-between">
      <div>
        {/* Icon */}
        <div className="inline-flex p-3 rounded-xl bg-white/20 backdrop-blur-sm mb-4">
          <Sparkles className="w-6 h-6" />
        </div>

        {/* Heading */}
        <h3 className="text-xl font-bold mb-3">
          광고 효율,<br />
          지금 바로 개선하세요
        </h3>

        {/* Description */}
        <p className="text-blue-50 text-sm leading-relaxed mb-6">
          구글 공식 파트너가 직접 분석하는 <strong className="text-white">무료 광고 진단</strong>을 받아보세요.
        </p>
      </div>

      <div>
        {/* CTA Button */}
        <a
          href="tel:07077337905"
          className="group inline-flex items-center justify-center w-full gap-2 px-6 py-3 rounded-full bg-white text-blue-600 font-bold hover:bg-blue-50 hover:scale-105 transition-all duration-300 shadow-lg mb-4"
        >
          <span>무료 상담 신청하기</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>

        {/* Trust Badge */}
        <div className="pt-4 border-t border-white/20 flex items-center justify-center gap-2 text-xs text-blue-100">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>Google 공식 파트너 | 상위 1%</span>
        </div>
      </div>
    </div>
  );
}
