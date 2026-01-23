/**
 * [Component] Award + Metrics + Clients Unified Card
 * [Design] Exact reference image design with proper fonts and spacing
 */

"use client";

import Image from "next/image";
import { CountUpNumber } from "./CountUpNumber";
import { useScrollReveal } from "@/lib/hooks/useScrollReveal";

const clients = [
  { name: "Samsung", logo: "/images/partners/samsung.jpg", font: "serif" },
  { name: "LG Electronics", logo: "/images/partners/hyundai.jpg", font: "sans" },
  { name: "SK telecom", logo: "/images/partners/google.jpg", font: "mono" },
  { name: "Hyundai", logo: "/images/partners/naver.jpg", font: "serif" },
  { name: "KRAFTON", logo: "/images/partners/kakao.jpg", font: "sans" },
  { name: "Woowa Bros", logo: "/images/partners/youtube.jpg", font: "mono" },
];

export function AwardMetricsUnified() {
  const cardRef = useScrollReveal("active", { threshold: 0.4, once: true });

  return (
    <div 
      ref={cardRef as React.RefObject<HTMLDivElement>}
      data-section="AUTHORITY"
      className="reveal-3d-lift relative rounded-2xl md:rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#0a0e1a] via-[#0f1420] to-[#0a0e1a] p-6 md:p-12 lg:p-16 xl:p-20 border border-slate-800/30 shadow-2xl"
    >
      
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10">
        
        {/* TOP SECTION: 2 Columns (Text + Image) - 모바일 최적화 */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,1fr] gap-8 md:gap-12 lg:gap-16 mb-12 md:mb-16 lg:mb-20">
          
          {/* Left: Text Content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 text-blue-400 font-semibold text-xs md:text-sm mb-4 md:mb-6">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-400"></span>
              VERIFIED AUTHORITY
            </div>

            {/* Title - 모바일 폰트 크기 조정 */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 tracking-tight" style={{ lineHeight: '1.3' }}>
              2023<br/>
              Google Korea<br/>
              우수 캠페인 TOP 100
            </h2>

            {/* Description */}
            <p className="text-sm md:text-base lg:text-lg text-slate-400 tracking-normal" style={{ 
              lineHeight: '1.7'
            }}>
              Google Korea가 직접 선정한 우수 캠페인 TOP 100에 이름을 올렸습니다. 단순한 광고 노출이나 클릭수가 아닌, 실제 비즈니스 성장과 ROI 개선이라는 명확한 성과를 인정받았습니다. 이는 데이터 기반의 정밀한 전략과 지속적인 최적화가 만들어낸 결과입니다.
            </p>
          </div>

          {/* Right: Image Card - 모바일 최적화 */}
          <div className="relative group">
            <div className="relative aspect-[4/3] rounded-2xl md:rounded-3xl overflow-hidden border border-slate-800/50 shadow-2xl transition-all duration-500 group-hover:border-slate-700">
              {/* Background Image */}
              <Image
                src="/images/hero/performance-hero-bg.jpg"
                alt="Campaign Performance"
                fill
                className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:opacity-40"
                style={{ opacity: 0.3 }}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 1200px"
              />
              
              {/* Dark Overlay - 호버 시 밝아짐 */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/60 transition-opacity duration-500 group-hover:from-slate-900 group-hover:via-slate-900/70 group-hover:to-slate-900/40" />
              
              {/* Content - 모바일 패딩 조정 */}
              <div className="absolute inset-0 flex flex-col items-start justify-end p-6 md:p-8 lg:p-10">
                <p className="text-[10px] md:text-xs text-slate-500 font-medium uppercase tracking-widest mb-2 md:mb-3 transition-colors duration-300 group-hover:text-slate-400">
                  Campaign Performance
                </p>
                <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-white mb-4 md:mb-6 transition-all duration-300 group-hover:text-white">
                  Verified by Google Korea
                </h3>
                <div className="inline-flex px-4 md:px-5 py-1.5 md:py-2 rounded-lg bg-blue-600/90 backdrop-blur-sm text-white text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 group-hover:bg-blue-600 group-hover:shadow-lg group-hover:shadow-blue-600/50">
                  Official Partner
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-slate-700/50 to-transparent mb-12 md:mb-16 lg:mb-20" />

        {/* MIDDLE SECTION: 3 Metrics - 모바일 최적화 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 mb-12 md:mb-16 lg:mb-20">
          
          {/* Metric 1: 광고주 평균 ROAS */}
          <div className="text-center">
            <p className="text-xs text-blue-400 font-bold uppercase tracking-wider mb-4">광고주 평균 ROAS</p>
            <div className="flex items-baseline justify-center gap-0 mb-3">
              <CountUpNumber 
                end={500} 
                suffix="" 
                className="text-7xl font-bold text-white" 
                style={{ fontWeight: 700, letterSpacing: '-0.02em' }}
              />
              <span className="text-5xl font-bold text-white" style={{ fontWeight: 700 }}>%</span>
            </div>
            <p className="text-sm text-slate-600" style={{ fontWeight: 400 }}>업계 평균 대비 3.5배 높은 성과</p>
          </div>

          {/* Metric 2: 누적 광고 집행 금액 */}
          <div className="text-center">
            <p className="text-xs text-blue-400 font-bold uppercase tracking-wider mb-4">누적 광고 집행 금액</p>
            <div className="flex items-baseline justify-center gap-0 mb-3">
              <CountUpNumber 
                end={470} 
                suffix="" 
                className="text-7xl font-bold text-white" 
                style={{ fontWeight: 700, letterSpacing: '-0.02em' }}
              />
              <span className="text-5xl font-bold text-white" style={{ fontWeight: 700 }}>억+</span>
            </div>
            <p className="text-sm text-slate-600" style={{ fontWeight: 400 }}>데이터로 검증된 집행 노하우</p>
          </div>

          {/* Metric 3: 월 구글 애즈 집행 예산 */}
          <div className="text-center">
            <p className="text-xs text-blue-400 font-bold uppercase tracking-wider mb-4">월 구글 애즈 집행 예산</p>
            <div className="flex items-baseline justify-center gap-0 mb-3">
              <CountUpNumber 
                end={30} 
                suffix="" 
                className="text-7xl font-bold text-white" 
                style={{ fontWeight: 700, letterSpacing: '-0.02em' }}
              />
              <span className="text-5xl font-bold text-white" style={{ fontWeight: 700 }}>억</span>
            </div>
            <p className="text-sm text-slate-600" style={{ fontWeight: 400 }}>대규모 예산 운영 최적화</p>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-slate-700/50 to-transparent mb-12 lg:mb-16" />

        {/* BOTTOM SECTION: Client Logos */}
        <div className="text-center">
          <p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em] mb-10">Trusted by Industry Leaders</p>
          
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-14 lg:gap-16">
            {clients.map((client) => {
              const fontClass = 
                client.font === 'serif' ? 'font-serif' : 
                client.font === 'mono' ? 'font-mono' : 
                'font-sans font-bold';
              const fontWeight = client.font === 'sans' ? 'font-black' : '';
              
              return (
                <div key={client.name} className={`${fontClass} ${fontWeight} text-slate-500 hover:text-slate-400 transition-colors duration-300`}>
                  <span className="text-lg md:text-xl tracking-wider opacity-60 hover:opacity-80" style={{
                    letterSpacing: client.font === 'mono' ? '0.05em' : '0.02em'
                  }}>
                    {client.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
