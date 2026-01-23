/**
 * [Section] CEO Profile - Dark Theme Design
 * [Design] Left: Image Card with Badges | Right: Expert Content
 */

"use client";

import Image from "next/image";
import { useScrollReveal } from "@/lib/hooks/useScrollReveal";

export function CEOSection() {
  const ceoRef = useScrollReveal("active", { threshold: 0.4, once: true });

  return (
    <section 
      ref={ceoRef as React.RefObject<HTMLElement>}
      className="reveal-blur-focus py-16 md:py-20 lg:py-32 relative bg-slate-950 overflow-hidden" 
      data-section="CEO"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-indigo-500 rounded-full blur-[150px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* 2 Column Layout - 모바일 갭 축소 */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr,1fr] gap-8 md:gap-12 lg:gap-20 items-center">
          
          {/* Left: Image Card - 모바일 비율 조정 */}
          <div className="relative w-full max-w-sm mx-auto lg:max-w-none">
            <div className="relative w-full aspect-[4/5] md:aspect-[1/1] rounded-2xl md:rounded-3xl overflow-hidden bg-slate-800">
              <Image
                src="/images/hero/company-hero-bg.jpg"
                alt="CEO 안태민"
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
            </div>

            {/* Top Badge - Outside Image - 모바일 최적화 */}
            <div className="absolute -top-2 -left-2 md:-top-3 md:-left-3">
              <div className="px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white text-slate-900 text-xs md:text-sm font-semibold shadow-xl">
                Google 전문가
              </div>
            </div>

            {/* Bottom Badge - Outside Image - 모바일 최적화 */}
            <div className="absolute -bottom-2 -right-2 md:-bottom-3 md:-right-3">
              <div className="px-4 py-3 md:px-6 md:py-4 rounded-xl md:rounded-2xl bg-blue-600 text-white shadow-2xl">
                <p className="text-[10px] md:text-xs text-blue-200 font-semibold mb-0.5 md:mb-1">경력</p>
                <p className="text-2xl md:text-3xl font-bold">15년+</p>
              </div>
            </div>
          </div>

          {/* Right: Content - 모바일 최적화 */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 text-blue-400 font-semibold text-xs md:text-sm mb-4 md:mb-6">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-400"></span>
              EXPERT
            </div>

            {/* Title */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6 md:mb-8 tracking-tight" style={{ lineHeight: '1.3' }}>
              실무 전문가의 직접 관리가<br/>만드는 <span className="text-blue-400">압도적인 차이</span>
            </h2>

            {/* Quote */}
            <div className="relative pl-4 md:pl-6 mb-6 md:mb-8">
              <div className="absolute left-0 top-0 bottom-0 w-0.5 md:w-1 bg-gradient-to-b from-blue-600 to-blue-400 rounded-full"></div>
              <p className="text-sm md:text-lg lg:text-xl text-slate-300 italic tracking-normal" style={{ lineHeight: '1.7' }}>
                "영업 사원에게 귀사의 운명을 맡기지 마세요. 15년 차 전문가가 비즈니스의 본질에 집중한 전략을 직접 리딩합니다."
              </p>
            </div>

            {/* Description */}
            <p className="text-sm md:text-base lg:text-lg text-slate-400 tracking-normal mb-6 md:mb-8" style={{ lineHeight: '1.7' }}>
              우리는 대행사가 아닌, 성장의 길을 함께 걷는 <span className="text-white font-semibold">파트너</span>입니다. 담당자만 수시로 바뀌는 대행사 대신, 15년 실전 데이터로 무장한 구글 공식 파트너를 만나보세요. 우리는 수치로 말하고 실적으로 전문성을 약속드립니다.
            </p>

            {/* Profile Card */}
            <div className="flex items-center gap-3 md:gap-4 p-4 md:p-6 rounded-xl md:rounded-2xl bg-slate-800/50 border border-slate-700/50">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                <span className="text-lg md:text-2xl font-bold text-blue-400">AT</span>
              </div>
              <div>
                <h4 className="text-lg md:text-xl font-bold text-white mb-1">안태민</h4>
                <p className="text-xs md:text-sm text-slate-400">대표 / 구글 광고 전문가</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
