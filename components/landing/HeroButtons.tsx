/**
 * [Component] Hero CTA Buttons
 * [Performance] Client-only for onClick handlers
 */

"use client";

import { MagneticButton } from "@/components/ui/magnetic-button";

export function HeroButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-20">
      <MagneticButton
        variant="primary"
        onClick={() => {
          const contactSection = document.getElementById('contact');
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }}
      >
        무료 상담 시작하기
      </MagneticButton>

      <MagneticButton
        variant="secondary"
        onClick={() => {
          const solutionsSection = document.getElementById('solutions');
          if (solutionsSection) {
            solutionsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }}
      >
        서비스 둘러보기
      </MagneticButton>
    </div>
  );
}
