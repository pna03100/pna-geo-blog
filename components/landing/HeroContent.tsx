/**
 * [Component] Hero Content - Server Component
 * [Design] CSS animations for performance
 * [Performance] Server-side rendering for LCP & SEO
 */

import { HeroButtons } from "./HeroButtons";

export function HeroContent() {
  return (
    <div className="max-w-3xl hero-content-animate">
      {/* 🎯 LCP CRITICAL: Main Headline - Server Rendered */}
      <h1 className="mb-6 md:mb-8 text-left text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900" style={{ lineHeight: '1.3', letterSpacing: '-0.02em' }}>
        <span className="block">
          구글 광고 대행사
        </span>
        <span 
          className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 relative hero-title-shine"
          style={{
            filter: 'drop-shadow(0 4px 20px rgba(59, 130, 246, 0.25))'
          }}
        >
          피앤에이컴퍼니는
        </span>
        <span className="block">
          데이터로 증명합니다.
        </span>
      </h1>

      {/* 🎯 SNIPPET TRAP - Direct Answer */}
      <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-10 md:mb-12 max-w-2xl text-left hero-description">
        <span className="text-slate-900 font-semibold">구글애즈 · SEO · GEO 전문</span>, 15년 경력의 구글 공식 파트너로 데이터 기반 성과 마케팅을 통해 <span className="text-blue-600 font-semibold">평균 ROAS 500%</span>를 달성합니다.
      </p>

      {/* CTA Buttons - Left Aligned */}
      <div className="flex justify-start mb-12 md:mb-16 hero-buttons">
        <HeroButtons />
      </div>
      
      {/* Bottom Stats */}
      <div className="flex flex-wrap items-center justify-start gap-8 md:gap-12 hero-stats">
        <div className="stat-item">
          <p className="text-3xl md:text-4xl font-bold text-slate-900 mb-1">15<span className="text-xl text-slate-500">년</span></p>
          <p className="text-sm text-slate-500">구글 파트너십</p>
        </div>
        <div className="h-12 w-px bg-slate-200" />
        <div className="stat-item">
          <p className="text-3xl md:text-4xl font-bold text-blue-600 mb-1">500<span className="text-xl text-slate-500">%</span></p>
          <p className="text-sm text-slate-500">평균 ROAS</p>
        </div>
        <div className="h-12 w-px bg-slate-200" />
        <div className="stat-item">
          <p className="text-3xl md:text-4xl font-bold text-slate-900 mb-1">1,000<span className="text-xl text-slate-500">+</span></p>
          <p className="text-sm text-slate-500">성공 캠페인</p>
        </div>
      </div>
    </div>
  );
}
