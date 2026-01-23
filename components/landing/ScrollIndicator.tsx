/**
 * [Component] Scroll Indicator
 * [Animation] Bouncing animation + Auto hide on scroll
 */

"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export function ScrollIndicator() {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      // 스크롤 위치에 따라 opacity 계산
      const scrollY = window.scrollY;
      const fadeStart = 0; // 스크롤 시작 지점
      const fadeEnd = 300; // 완전히 사라지는 지점 (300px)
      
      if (scrollY <= fadeStart) {
        setOpacity(1);
      } else if (scrollY >= fadeEnd) {
        setOpacity(0);
      } else {
        // 스크롤에 따라 선형적으로 감소
        const newOpacity = 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart);
        setOpacity(newOpacity);
      }
    };

    // 초기 실행
    handleScroll();

    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="fixed left-1/2 bottom-12 z-50 hidden md:flex transition-opacity duration-300 ease-out"
      style={{ 
        opacity: opacity,
        transform: `translateX(-50%) translateY(${(1 - opacity) * 20}px)`,
        pointerEvents: opacity < 0.1 ? 'none' : 'auto'
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
