/**
 * [Component] Award + Metrics + Clients Unified Card
 * [Design] Exact reference image design with proper fonts and spacing
 */

"use client";

import Image from "next/image";
import { CountUpNumber } from "./CountUpNumber";

const clients = [
  { name: "Samsung", logo: "/images/partners/samsung.jpg", font: "serif" },
  { name: "LG Electronics", logo: "/images/partners/hyundai.jpg", font: "sans" },
  { name: "SK telecom", logo: "/images/partners/google.jpg", font: "mono" },
  { name: "Hyundai", logo: "/images/partners/naver.jpg", font: "serif" },
  { name: "KRAFTON", logo: "/images/partners/kakao.jpg", font: "sans" },
  { name: "Woowa Bros", logo: "/images/partners/youtube.jpg", font: "mono" },
];

export function AwardMetricsUnified() {
  return (
    <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#0a0e1a] via-[#0f1420] to-[#0a0e1a] p-12 md:p-16 lg:p-20 border border-slate-800/30 shadow-2xl">
      
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10">
        
        {/* TOP SECTION: 2 Columns (Text + Image) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,1fr] gap-12 lg:gap-16 mb-16 lg:mb-20">
          
          {/* Left: Text Content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-600/10 border border-blue-500/30 text-blue-400 text-[10px] font-bold uppercase tracking-[0.1em] mb-8">
              Verified Authority
            </div>

            {/* Title - 3 lines */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white" style={{ 
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: '1.35'
            }}>
              2023<br/>
              Google Korea<br/>
              TOP 100 선정
            </h2>

            {/* Description */}
            <p className="text-base md:text-lg text-slate-400 leading-relaxed" style={{ 
              fontWeight: 400,
              lineHeight: '1.7'
            }}>
              Google이 성과로 인정한 구조. 단순 노출이 아닌, 비즈니스의 실질적<br className="hidden lg:block"/>
              성장을 증명했습니다.
            </p>
          </div>

          {/* Right: Image Card */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-800/30 border border-slate-700/50 shadow-xl">
              <Image
                src="/images/hero/performance-hero-bg.jpg"
                alt="Campaign Performance"
                fill
                className="object-cover opacity-30"
              />
              
              {/* Overlay Content */}
              <div className="absolute inset-0 flex flex-col items-start justify-end p-6 md:p-8 bg-gradient-to-t from-slate-900/95 via-slate-900/50 to-transparent">
                <p className="text-[10px] text-slate-500 font-medium uppercase tracking-[0.15em] mb-2">Campaign Performance</p>
                <p className="text-white font-semibold text-lg md:text-xl mb-4">Verified by Google Korea</p>
                <div className="inline-flex px-4 py-1.5 rounded-md bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider">
                  Official Partner
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-slate-700/50 to-transparent mb-16 lg:mb-20" />

        {/* MIDDLE SECTION: 3 Metrics - 이미지와 완전히 동일 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 mb-16 lg:mb-20">
          
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
