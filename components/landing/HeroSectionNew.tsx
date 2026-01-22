/**
 * [Section] Hero - Clean Modern Design
 * [Design] 2-column layout with simple white background
 */

"use client";

import { HeroButtons } from "./HeroButtons";

export function HeroSectionNew() {
  return (
    <section 
      data-section="HERO" 
      className="relative w-full bg-white pt-32 pb-20 md:pt-40 md:pb-32"
    >
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        
        {/* 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr,1fr] gap-12 lg:gap-16 items-end mb-16">
          
          {/* Left: Badge + Title */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              데이터로 증명하는 성과 마케팅
            </div>
            
            {/* H1 Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.1] mb-0">
              구글 광고 대행사<br/>
              데이터로 증명하는<br/>
              피앤에이컴퍼니
            </h1>
          </div>

          {/* Right: Description (Aligned to Bottom & Right) */}
          <div className="flex items-end justify-end">
            <p className="text-base md:text-lg text-slate-600 leading-relaxed text-right max-w-md">
              담당자만 수시로 바뀌는 대행사 대신, 15년 실전 데이터로 무장한 구글 공식 파트너를 만나보세요. 우리는 수치로 말하고 실적으로 전문성을 증명합니다.
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <HeroButtons />
        </div>

        {/* Bottom Stats */}
        <div className="flex flex-wrap items-center gap-8 md:gap-12 pt-8 border-t border-slate-200">
          <div>
            <p className="text-3xl md:text-4xl font-bold text-slate-900 mb-1">
              15<span className="text-xl text-slate-600">년</span>
            </p>
            <p className="text-sm text-slate-600">구글 파트너십</p>
          </div>
          <div className="h-12 w-px bg-slate-200" />
          <div>
            <p className="text-3xl md:text-4xl font-bold text-blue-600 mb-1">
              500<span className="text-xl text-slate-600">%</span>
            </p>
            <p className="text-sm text-slate-600">평균 ROAS</p>
          </div>
          <div className="h-12 w-px bg-slate-200" />
          <div>
            <p className="text-3xl md:text-4xl font-bold text-slate-900 mb-1">
              1,000<span className="text-xl text-slate-600">+</span>
            </p>
            <p className="text-sm text-slate-600">성공 캠페인</p>
          </div>
        </div>

      </div>
    </section>
  );
}
