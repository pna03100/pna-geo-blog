/**
 * [Component] Award + Metrics + Clients Unified Card
 * [Design] Exact reference image design with proper fonts and spacing
 */

"use client";

import Image from "next/image";
import { CountUpNumber } from "./CountUpNumber";
import { useScrollReveal } from "@/lib/hooks/useScrollReveal";
import { useState, useEffect } from "react";

const clients = [
  { name: "Samsung", logo: "/images/partners/samsung.png" },
  { name: "LG U+", logo: "/images/partners/lg-uplus.png" },
  { name: "SK Broadband", logo: "/images/partners/sk-broadband.png" },
  { name: "Hyundai", logo: "/images/partners/hyundai.png" },
  { name: "Google", logo: "/images/partners/google.png" },
  { name: "Naver", logo: "/images/partners/naver.png" },
  { name: "Kakao", logo: "/images/partners/kakao.png" },
  { name: "YouTube", logo: "/images/partners/youtube.png" },
  { name: "당근", logo: "/images/partners/danggeun.png" },
  { name: "KCB", logo: "/images/partners/kcb.png" },
];

export function AwardMetricsUnified() {
  const cardRef = useScrollReveal("active", { threshold: 0.4, once: true });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

          {/* Right: Google Logo Card - 모바일 최적화 */}
          <div className="relative group">
            <div className="relative aspect-[4/3] rounded-2xl md:rounded-3xl overflow-hidden border border-slate-800/50 shadow-2xl transition-all duration-500 group-hover:border-slate-700 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
              
              {/* Background: Google Marketing Live */}
              <Image
                src="/images/google/google-marketing-live.jpg"
                alt="Google Marketing Live 행사"
                fill
                className="object-cover opacity-20"
                priority
                sizes="50vw"
              />
              
              {/* Google Logo - 상단 중앙 */}
              <div className="absolute inset-0 flex items-start justify-center pt-4 md:pt-6 lg:pt-8 z-10">
                <svg className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 272 92" xmlns="http://www.w3.org/2000/svg" style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
                  <path d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#EA4335"/>
                  <path d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#FBBC05"/>
                  <path d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z" fill="#4285F4"/>
                  <path d="M225 3v65h-9.5V3h9.5z" fill="#34A853"/>
                  <path d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z" fill="#EA4335"/>
                  <path d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z" fill="#4285F4"/>
                </svg>
              </div>
              
              {/* Content - 하단 */}
              <div className="absolute inset-0 flex flex-col items-start justify-end p-6 md:p-8 lg:p-10 z-10">
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
        <div className="grid grid-cols-3 md:grid-cols-3 gap-4 md:gap-12 mb-12 md:mb-16 lg:mb-20">
          
          {/* Metric 1: 광고주 평균 ROAS */}
          <div className="text-center">
            <p className="text-xs md:text-sm lg:text-base text-blue-400 font-bold uppercase tracking-wider mb-2 md:mb-4">광고주 평균 ROAS</p>
            <div className="flex items-baseline justify-center gap-0 mb-2 md:mb-3">
              {isMobile ? (
                <span className="text-3xl font-bold text-white" style={{ fontWeight: 700, letterSpacing: '-0.02em' }}>500</span>
              ) : (
                <CountUpNumber 
                  end={500} 
                  suffix="" 
                  className="text-7xl font-bold text-white" 
                  style={{ fontWeight: 700, letterSpacing: '-0.02em' }}
                />
              )}
              <span className={`${isMobile ? 'text-2xl' : 'text-5xl'} font-bold text-white`} style={{ fontWeight: 700 }}>%</span>
            </div>
            <p className="text-[10px] md:text-sm text-slate-600 hidden md:block" style={{ fontWeight: 400 }}>업계 평균 대비 3.5배 높은 성과</p>
          </div>

          {/* Metric 2: 누적 광고 집행 금액 */}
          <div className="text-center">
            <p className="text-xs md:text-sm lg:text-base text-blue-400 font-bold uppercase tracking-wider mb-2 md:mb-4">누적 광고 집행 금액</p>
            <div className="flex items-baseline justify-center gap-0 mb-2 md:mb-3">
              {isMobile ? (
                <span className="text-3xl font-bold text-white" style={{ fontWeight: 700, letterSpacing: '-0.02em' }}>470</span>
              ) : (
                <CountUpNumber 
                  end={470} 
                  suffix="" 
                  className="text-7xl font-bold text-white" 
                  style={{ fontWeight: 700, letterSpacing: '-0.02em' }}
                />
              )}
              <span className={`${isMobile ? 'text-2xl' : 'text-5xl'} font-bold text-white`} style={{ fontWeight: 700 }}>억+</span>
            </div>
            <p className="text-[10px] md:text-sm text-slate-600 hidden md:block" style={{ fontWeight: 400 }}>데이터로 검증된 집행 노하우</p>
          </div>

          {/* Metric 3: 월 구글 애즈 집행 예산 */}
          <div className="text-center">
            <p className="text-xs md:text-sm lg:text-base text-blue-400 font-bold uppercase tracking-wider mb-2 md:mb-4">월 구글 애즈 집행 예산</p>
            <div className="flex items-baseline justify-center gap-0 mb-2 md:mb-3">
              {isMobile ? (
                <span className="text-3xl font-bold text-white" style={{ fontWeight: 700, letterSpacing: '-0.02em' }}>30</span>
              ) : (
                <CountUpNumber 
                  end={30} 
                  suffix="" 
                  className="text-7xl font-bold text-white" 
                  style={{ fontWeight: 700, letterSpacing: '-0.02em' }}
                />
              )}
              <span className={`${isMobile ? 'text-2xl' : 'text-5xl'} font-bold text-white`} style={{ fontWeight: 700 }}>억</span>
            </div>
            <p className="text-[10px] md:text-sm text-slate-600 hidden md:block" style={{ fontWeight: 400 }}>대규모 예산 운영 최적화</p>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-slate-700/50 to-transparent mb-12 lg:mb-16" />

        {/* BOTTOM SECTION: Client Logos */}
        <div className="text-center">
          <p className="text-xs md:text-sm lg:text-base text-blue-400 font-bold uppercase tracking-[0.15em] mb-10 md:mb-12">주요 클라이언트</p>
          
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-14">
            {clients.map((client) => {
              return (
                <div 
                  key={client.name} 
                  className="relative w-24 h-16 md:w-32 md:h-20 lg:w-36 lg:h-24 group cursor-pointer"
                  style={{
                    willChange: 'transform',
                    transform: 'translateZ(0)',
                  }}
                >
                  <Image
                    src={client.logo}
                    alt={client.name}
                    fill
                    className="object-contain transition-all duration-200 group-hover:scale-110 group-hover:opacity-90"
                    style={{
                      filter: 'brightness(0) invert(1)',
                      opacity: 0.6
                    }}
                    loading="lazy"
                    sizes="(max-width: 768px) 96px, (max-width: 1024px) 128px, 144px"
                  />
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
