/**
 * [Component] Hero CTA Buttons - Careons Style (Blue + White Border)
 * [Performance] Client-only for onClick handlers
 */

"use client";

import { ArrowRight } from "lucide-react";

export function HeroButtons() {
  return (
    <>
      {/* Primary Button */}
      <button
        onClick={() => {
          const contactSection = document.getElementById('contact');
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }}
        className="btn-primary group cursor-pointer"
      >
        <span>무료 성과 진단 신청</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>

      {/* Secondary Button */}
      <button
        onClick={() => {
          const solutionsSection = document.getElementById('solutions');
          if (solutionsSection) {
            solutionsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }}
        className="btn-outline group cursor-pointer"
      >
        <span>서비스 둘러보기</span>
      </button>
    </>
  );
}
