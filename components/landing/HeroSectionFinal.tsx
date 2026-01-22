/**
 * [Section] Hero - Exact Reference Design
 * [Design] Google Premier Partner + Performance Architecture
 * [Animation] Cinematic Reveal
 */

"use client";

import { HeroButtons } from "./HeroButtons";
import { useScrollReveal } from "@/lib/hooks/useScrollReveal";
import { ScrollIndicator } from "./ScrollIndicator";

export function HeroSectionFinal() {
  const contentRef = useScrollReveal("active", { threshold: 0.1, once: true });

  return (
    <>
      <section 
        data-section="HERO" 
        className="relative w-full pt-40 pb-16 md:pt-36 md:pb-20 lg:pt-44 lg:pb-24"
      >
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          
          {/* Subtitle */}
          <p className="text-base md:text-lg lg:text-xl text-slate-400 font-light mb-3 md:mb-4">
            Performance Architecture
          </p>

          {/* Main Title - 모바일 최적화 */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 md:mb-8" style={{ lineHeight: '1.25' }}>
            <span className="block text-slate-900">구글 광고 대행사</span>
            <span className="block text-blue-600">피앤에이컴퍼니</span>
          </h1>

          {/* Bottom Section: 2 Columns - 모바일 최적화 */}
          <div 
            ref={contentRef as React.RefObject<HTMLDivElement>}
            className="reveal-hero-content grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start lg:items-end"
          >
            
            {/* Left: Description */}
            <div>
              <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-slate-900 mb-3 md:mb-4 hero-item-1">
                Data-Driven Growth Partner, PNA
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-slate-600 leading-relaxed mb-6 md:mb-8 hero-item-2">
                Google Ads, SEO & GEO, Headless WordPress를 하나의 유기적인 성장 엔진으로 통합 설계합니다.
              </p>
              
              {/* CTA Buttons - 모바일 터치 최적화 */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 hero-item-3">
                <HeroButtons />
              </div>
            </div>

            {/* Right: Award Badge - 모바일에서는 왼쪽 정렬 */}
            <div className="flex justify-start lg:justify-end items-start lg:items-end mt-4 lg:mt-0 hero-item-4">
              <div className="inline-flex flex-col items-start lg:items-end text-left lg:text-right">
                <p className="text-xs md:text-sm text-slate-600 mb-1">2023 Google Korea Top 100 Campaign</p>
                <p className="text-[10px] md:text-xs text-slate-500">Award Winning Agency</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </>
  );
}
