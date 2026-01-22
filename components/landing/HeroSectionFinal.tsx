/**
 * [Section] Hero - Exact Reference Design
 * [Design] Google Premier Partner + Performance Architecture
 */

"use client";

import { HeroButtons } from "./HeroButtons";

export function HeroSectionFinal() {
  return (
    <section 
      data-section="HERO" 
      className="relative w-full pt-36 pb-20 md:pt-44 md:pb-24"
    >
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        
        {/* Subtitle */}
        <p className="text-lg md:text-xl text-slate-400 font-light mb-4">
          Performance Architecture
        </p>

        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8" style={{ lineHeight: '1.25' }}>
          <span className="block text-slate-900">구글 광고 대행사</span>
          <span className="block text-blue-600">피앤에이컴퍼니</span>
        </h1>

        {/* Bottom Section: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
          
          {/* Left: Description */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">
              Data-Driven Growth Partner, PNA
            </h2>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-8">
              Google Ads, SEO & GEO, Headless WordPress를<br/>
              하나의 유기적인 성장 엔진으로 통합 설계합니다.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <HeroButtons />
            </div>
          </div>

          {/* Right: Award Badge */}
          <div className="flex justify-end items-end">
            <div className="inline-flex flex-col items-end text-right">
              <p className="text-sm text-slate-600 mb-1">2023 Google Korea Top 100 Campaign</p>
              <p className="text-xs text-slate-500">Award Winning Agency</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
