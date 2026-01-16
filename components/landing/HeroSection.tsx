/**
 * [Section] Hero - Dark Tech 2026 with Integrated Award Card
 * [Design] Clean Typography + Dashboard Preview
 * [Performance] LCP Optimized - Server Component (H1 즉시 렌더링)
 */

import { HeroBackground } from "@/components/ui/hero-background";
import { GoogleAwardCard } from "@/components/ui/google-award-card";
import { HeroButtons } from "./HeroButtons";

export function HeroSection() {
  return (
    <>
      {/* SECTION: #HERO */}
      <section data-section="HERO" className="relative w-full overflow-hidden bg-[#0B0B0D]">
      
      {/* 🎯 Background - Client Component (Canvas + Motion) */}
      <HeroBackground />
      
      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-slate-900 z-[5] pointer-events-none" />
      
      {/* 🎯 LCP CRITICAL: Server-Rendered Content (JavaScript 없이 즉시 표시) */}
      <div className="container relative z-10 mx-auto px-4 md:px-6 max-w-7xl">
        {/* Main Content with Top Spacing */}
        <div 
          className="max-w-5xl mx-auto text-center pt-32 pb-12 sm:pt-36 md:pt-40 lg:pt-48 space-y-6 md:space-y-8"
        >
          
          {/* 🎯 LCP CRITICAL: Main Headline - Server Rendered (Google 최우선) */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight" style={{ lineHeight: '1.15' }}>
            <span className="block text-white mb-2">
              구글 광고 대행사
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 mb-2 drop-shadow-[0_0_30px_rgba(96,165,250,0.5)]">
              데이터로 증명하는
            </span>
            <span className="block text-white">
              피앤에이컴퍼니
            </span>
          </h1>

          {/* 🎯 SNIPPET TRAP - Direct Answer for Google Featured Snippets & AI */}
          {/* Server Rendered - 즉시 표시 */}
          <p className="text-lg text-white/90 font-medium max-w-2xl mx-auto leading-relaxed mb-6">
            피앤에이컴퍼니는 15년 경력의 구글 공식 파트너로,
            <br />
            데이터 기반 성과 마케팅을 통해 평균 ROAS 500%를 달성합니다.
            <br />
            Google Ads, SEO, GEO 최적화로 검증된 광고 전략을 제공합니다.
          </p>

          {/* CTA Buttons - Client Component (onClick handlers) */}
          <HeroButtons />
        </div>

        {/* TOP 100 Award Card - Client Component (Motion) */}
        <div className="relative w-full max-w-[1040px] mx-auto pb-12 md:pb-16 mt-16 md:mt-20">
          <GoogleAwardCard />
        </div>

      </div>
    </section>
    </>
  );
}
