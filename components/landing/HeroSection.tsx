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
        {/* 2-Column Layout: Title Left, Award Right */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center py-32 md:py-40 lg:py-48">
          
          {/* Left: Text Content */}
          <div>
            {/* English Slogan */}
            <p className="text-sm md:text-base font-semibold tracking-wider text-blue-400/90 mb-4 md:mb-6 uppercase">
              Data-Driven Online Marketing
            </p>

            {/* 🎯 LCP CRITICAL: Main Headline - Server Rendered (Google 최우선) */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6 md:mb-8" style={{ lineHeight: '1.15' }}>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 mb-2 md:mb-3 drop-shadow-[0_0_30px_rgba(96,165,250,0.5)]">
                구글 광고 대행사
              </span>
              <span className="block text-white">
                피앤에이컴퍼니
              </span>
            </h1>

            {/* 🎯 SNIPPET TRAP - Direct Answer for Google Featured Snippets & AI */}
            {/* Server Rendered - 즉시 표시 */}
            <p className="text-base md:text-lg lg:text-xl text-white/90 font-medium leading-relaxed mb-8 md:mb-10">
              구글애즈 · SEO · GEO 전문, 15년 경력의 구글 공식 파트너
              <br />
              데이터 기반 성과 마케팅으로 평균 ROAS 500% 달성
            </p>

            {/* CTA Buttons - Client Component (onClick handlers) */}
            <HeroButtons />
          </div>

          {/* Right: TOP 100 Award Card - Client Component (Motion) */}
          <div className="relative mt-8 md:mt-0">
            <GoogleAwardCard />
          </div>
        </div>

      </div>
    </section>
    </>
  );
}
