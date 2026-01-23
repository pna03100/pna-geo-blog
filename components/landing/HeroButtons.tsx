/**
 * [Component] Hero CTA Buttons - Careons Style (Blue + White Border)
 * [Performance] Client-only for onClick handlers
 */

"use client";

import { ArrowRight } from "lucide-react";

export function HeroButtons() {
  return (
    <>
      {/* Primary Button - Glass Morphism */}
      <button
        onClick={() => {
          window.location.href = '/contact';
        }}
        className="group cursor-pointer inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-base bg-white text-slate-900 border-2 border-white/50 hover:bg-white hover:border-white hover:shadow-xl hover:shadow-white/20 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300"
      >
        <span>무료 상담 시작하기</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
      </button>

      {/* Secondary Button - Glass Morphism Outline */}
      <button
        onClick={() => {
          const solutionsSection = document.getElementById('solutions');
          if (solutionsSection) {
            solutionsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }}
        className="group cursor-pointer inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-base bg-white/10 backdrop-blur-md text-white border-2 border-white/30 hover:bg-white/20 hover:border-white/50 hover:shadow-xl hover:shadow-white/10 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300"
      >
        <span>서비스 둘러보기</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
      </button>
    </>
  );
}
