/**
 * [Component] Scroll Indicator
 * [Performance] Pure CSS — no JS scroll listener, no re-renders
 * [Animation] Bouncing animation + auto-fade via CSS animation
 */

import { ChevronDown } from "lucide-react";

export function ScrollIndicator() {
  return (
    <div
      className="fixed left-1/2 bottom-12 z-50 hidden md:flex animate-scroll-indicator-fade"
      style={{
        transform: 'translateX(-50%)',
        pointerEvents: 'none',
      }}
    >
      <div className="flex flex-col items-center gap-1.5 md:gap-2">
        {/* 텍스트 */}
        <p className="text-xs font-medium text-white/80 uppercase tracking-widest">
          Scroll
        </p>

        {/* 아이콘 + 애니메이션 */}
        <div className="relative">
          {/* 외곽 원 */}
          <div className="w-10 h-10 rounded-full border-2 border-white/40 bg-white/10 backdrop-blur-sm shadow-lg flex items-center justify-center animate-bounce">
            <ChevronDown className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>

          {/* 펄스 효과 */}
          <div className="absolute inset-0 rounded-full border-2 border-white/40 animate-ping opacity-20"></div>
        </div>
      </div>
    </div>
  );
}
