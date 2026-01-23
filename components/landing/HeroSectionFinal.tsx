/**
 * [Section] Hero - Exact Reference Design
 * [Design] Google Premier Partner + Performance Architecture
 * [Animation] Cinematic Reveal + Wave Background
 */

"use client";

import { HeroButtons } from "./HeroButtons";
import { ScrollIndicator } from "./ScrollIndicator";
import { WavyBackground } from "@/components/ui/wavy-background";
import { useEffect, useRef } from "react";

export function HeroSectionFinal() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 페이지 로드 시 애니메이션 즉시 시작 (성능 최적화)
    if (contentRef.current) {
      contentRef.current.classList.add('active');
    }
  }, []);

  return (
    <>
      <section 
        data-section="HERO" 
        className="sticky top-0 w-full h-screen z-0 bg-[#0a0f1e]"
      >
        <WavyBackground
          containerClassName="!h-screen !flex !flex-col !items-start !justify-end pb-20 md:pb-24 lg:pb-32"
          className="w-full"
          colors={["#0c1e3d", "#1e3a8a", "#1e40af", "#2563eb", "#1d4ed8"]}
          waveWidth={240}
          backgroundFill="#0a0f1e"
          blur={60}
          speed="fast"
          waveOpacity={0.85}
        >
          <div className="container relative z-10 mx-auto px-6 md:px-6 max-w-7xl w-full">
            
            <div className="max-w-3xl">
              {/* Slogan */}
              <p className="text-base md:text-lg lg:text-xl text-blue-200/80 font-light mb-4 md:mb-6 tracking-wide">
                Data-Driven Growth Partner, PNA
              </p>

              {/* Main Title - Prompture Style */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 text-white" style={{ lineHeight: '1.25' }}>
                구글 광고 대행사<br/>
                피앤에이컴퍼니
              </h1>

              {/* Description */}
              <div 
                ref={contentRef}
                className="reveal-hero-content"
              >
                <p className="text-lg md:text-xl lg:text-2xl text-blue-100/90 leading-relaxed mb-8 md:mb-10 hero-item-1" style={{ maxWidth: '600px' }}>
                  Google Ads, SEO & GEO, Headless WordPress를 하나의 유기적인 성장 엔진으로 통합 설계합니다.
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 hero-item-2">
                  <HeroButtons />
                </div>
              </div>
            </div>

            {/* Award Badge - Bottom Right */}
            <div className="absolute bottom-8 right-8 hidden lg:block hero-item-3">
              <div className="text-right">
                <p className="text-sm text-blue-200/80 mb-1">Trusted by</p>
                <p className="text-xs text-blue-300/60">2023 Google Korea Top 100 Campaign</p>
              </div>
            </div>

          </div>
        </WavyBackground>
      </section>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </>
  );
}
