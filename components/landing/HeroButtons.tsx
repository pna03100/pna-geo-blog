/**
 * [Component] Hero CTA Buttons - Careons Style (Blue + White Border)
 * [Performance] Client-only for onClick handlers
 */

"use client";

import { ArrowRight } from "lucide-react";

export function HeroButtons() {
  return (
    <>
      {/* [Careons] Primary Button - Blue with Arrow */}
      <button
        onClick={() => {
          const contactSection = document.getElementById('contact');
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }}
        className="group inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base cursor-pointer gradient-blue text-white hover:shadow-xl hover:shadow-blue-500/50 hover:scale-105 active:scale-[0.98] transition-all duration-200"
      >
        <span>무료 상담 시작하기</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>

      {/* [Careons] Secondary Button - White Border Only (Transparent) */}
      <button
        onClick={() => {
          const solutionsSection = document.getElementById('solutions');
          if (solutionsSection) {
            solutionsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }}
        className="group inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base cursor-pointer bg-transparent text-white border-2 border-white hover:bg-white hover:text-slate-900 active:scale-[0.98] transition-all duration-200"
      >
        <span>서비스 둘러보기</span>
      </button>
    </>
  );
}
