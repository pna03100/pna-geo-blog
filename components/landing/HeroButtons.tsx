/**
 * [Component] Hero CTA Buttons
 * [Performance] Client-only for onClick handlers
 */

"use client";

import { ArrowRight } from "lucide-react";

export function HeroButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-20">
      <button
        onClick={() => {
          const contactSection = document.getElementById('contact');
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }}
        className="group inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base cursor-pointer bg-blue-600 text-white border border-blue-400/50 hover:bg-blue-500 hover:border-blue-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-600/30 transition-all duration-300"
      >
        <span>무료 상담 시작하기</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>

      <button
        onClick={() => {
          const solutionsSection = document.getElementById('solutions');
          if (solutionsSection) {
            solutionsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }}
        className="group inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base cursor-pointer bg-transparent text-white border border-white/30 hover:border-white/50 hover:bg-white/5 hover:scale-105 transition-all duration-300"
      >
        <span>서비스 둘러보기</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
