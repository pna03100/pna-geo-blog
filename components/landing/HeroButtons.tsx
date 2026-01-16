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
        className="group btn-premium-primary"
      >
        <span>무료 상담 시작하기</span>
        <ArrowRight className="w-5 h-5 arrow-premium" />
      </button>

      <button
        onClick={() => {
          const solutionsSection = document.getElementById('solutions');
          if (solutionsSection) {
            solutionsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }}
        className="group btn-premium-secondary"
      >
        <span>서비스 둘러보기</span>
        <ArrowRight className="w-5 h-5 arrow-premium" />
      </button>
    </div>
  );
}
