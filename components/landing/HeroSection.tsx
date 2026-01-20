/**
 * [Section] Hero - Fizens-inspired SaaS Style
 * [Design] Center-aligned with stats
 * [Performance] LCP Optimized - Server Component (H1 즉시 렌더링)
 */

import { HeroButtons } from "./HeroButtons";

export function HeroSection() {
  return (
    <>
      {/* SECTION: #HERO */}
      <section data-section="HERO" className="relative w-full overflow-hidden">
      
      {/* Background Text Watermark - Full Width, Bottom Right */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
        <div 
          className="absolute bottom-0 right-0 text-right w-full"
          style={{
            lineHeight: '0.85'
          }}
        >
          <div 
            className="font-black text-slate-900"
            style={{
              fontSize: 'clamp(8rem, 20vw, 24rem)',
              letterSpacing: '-0.05em'
            }}
          >
            PNA
          </div>
          <div 
            className="font-black text-slate-900"
            style={{
              fontSize: 'clamp(8rem, 20vw, 24rem)',
              letterSpacing: '-0.05em'
            }}
          >
            MARKETING
          </div>
        </div>
      </div>
      
      {/* 🎯 LCP CRITICAL: Server-Rendered Content (JavaScript 없이 즉시 표시) */}
      <div className="container relative z-10 mx-auto px-4 md:px-6 lg:px-8 max-w-7xl pt-24 md:pt-32 lg:pt-40 pb-20 md:pb-28 lg:pb-32">
        <div className="max-w-3xl">
        
        {/* 🎯 LCP CRITICAL: Main Headline */}
        <h1 className="mb-6 md:mb-8 text-left text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900" style={{ lineHeight: '1.3', letterSpacing: '-0.02em' }}>
          <span className="block">구글 광고 대행사</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">피앤에이컴퍼니는</span>
          <span className="block">데이터로 증명합니다.</span>
        </h1>

        {/* 🎯 SNIPPET TRAP - Direct Answer */}
        <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-10 md:mb-12 max-w-2xl text-left">
          <span className="text-slate-900 font-semibold">구글애즈 · SEO · GEO 전문</span>, 15년 경력의 구글 공식 파트너로 데이터 기반 성과 마케팅을 통해 <span className="text-blue-600 font-semibold">평균 ROAS 500%</span>를 달성합니다.
        </p>

        {/* CTA Buttons - Left Aligned */}
        <div className="flex justify-start mb-12 md:mb-16">
          <HeroButtons />
        </div>
        
        {/* Bottom Stats */}
        <div className="flex flex-wrap items-center justify-start gap-8 md:gap-12">
          <div>
            <p className="text-3xl md:text-4xl font-bold text-slate-900 mb-1">15<span className="text-xl text-slate-500">년</span></p>
            <p className="text-sm text-slate-500">구글 파트너십</p>
          </div>
          <div className="h-12 w-px bg-slate-200" />
          <div>
            <p className="text-3xl md:text-4xl font-bold text-blue-600 mb-1">500<span className="text-xl text-slate-500">%</span></p>
            <p className="text-sm text-slate-500">평균 ROAS</p>
          </div>
          <div className="h-12 w-px bg-slate-200" />
          <div>
            <p className="text-3xl md:text-4xl font-bold text-slate-900 mb-1">1,000<span className="text-xl text-slate-500">+</span></p>
            <p className="text-sm text-slate-500">성공 캠페인</p>
          </div>
        </div>
        </div>
      </div>
    </section>
    </>
  );
}
