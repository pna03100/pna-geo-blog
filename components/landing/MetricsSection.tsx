/**
 * [Section] Key Metrics - Open Layout (Card Diet)
 * [Design] Remove card containers, let numbers breathe on background
 * [Animation] Count-up effect on scroll
 */

"use client";

import { CountUpNumber } from "./CountUpNumber";
import { SectionTitle } from "./SectionTitle";

const metrics = [
  {
    id: "roas",
    label: "광고주 평균 ROAS",
    value: 500,
    suffix: "%",
    description: "업계 평균 대비 3.5배 높은 성과",
  },
  {
    id: "spend",
    label: "누적 광고 집행 금액",
    value: 470,
    suffix: "억+",
    description: "데이터로 검증된 집행 노하우",
  },
  {
    id: "budget",
    label: "월 구글 애즈 집행 예산",
    value: 30,
    suffix: "억",
    description: "대규모 예산 운영 최적화",
  },
  {
    id: "projects",
    label: "성공 프로젝트",
    value: 500,
    suffix: "+",
    description: "15년간 검증된 실전 경험",
  },
];

export function MetricsSection() {
  return (
    <section data-section="METRICS" className="py-20 md:py-32 relative z-10 overflow-hidden bg-[#0B0B0D]">
      {/* Top Gradient Fade */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[#0B0B0D] to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
        
        {/* Header */}
        <div className="mb-12 md:mb-16 text-center">
          {/* Badge */}
          <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-blue-600/20 border border-blue-500/30 shadow-lg shadow-blue-600/20 text-blue-400 text-xs md:text-sm font-semibold mb-5 md:mb-7">
            Proven Results
          </span>
          
          {/* Title */}
          <h2 className="text-3xl md:text-6xl font-bold text-white mb-4 md:mb-6 tracking-tight" style={{ letterSpacing: '-1.5px', lineHeight: '1.3' }}>
            숫자로 증명하는 퍼포먼스
          </h2>
          
          {/* Description */}
          <p className="text-base md:text-xl text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto">
            감각에 의존하지 않습니다. 오직 정확한 데이터만이 비즈니스의 성장을 만듭니다.
          </p>
        </div>

        {/* Open Layout with Vertical Dividers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-0 mt-16 md:mt-20">
          {metrics.map((stat, index) => (
            <div key={stat.id} className="relative text-center px-4 md:px-6">
                {/* Vertical Divider (Hidden on mobile, shown after first item on desktop) */}
                {index > 0 && (
                  <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 h-32 w-px bg-slate-800" />
                )}

                {/* Label */}
                <dt className="text-sm md:text-base font-semibold text-slate-400 mb-4 md:mb-5 leading-relaxed">
                  {stat.label}
                </dt>
                
                {/* Giant Number */}
                <dd className="mb-4 md:mb-6 relative">
                  {/* Trending Up Icon Background with Blue Glow */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                    <svg className="w-20 h-20 md:w-24 md:h-24 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
                    </svg>
                  </div>
                  
                  <div className="relative flex items-baseline justify-center gap-1">
                    {/* Electric Blue Numbers with Glow */}
                    <span className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#2563EB] tracking-tight drop-shadow-[0_0_20px_rgba(37,99,235,0.5)]">
                      <CountUpNumber end={stat.value} suffix="" />
                    </span>
                    <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2563EB]/70">
                      {stat.suffix}
                    </span>
                  </div>
                </dd>
                
                {/* Description Badge - Cyber Style */}
                <div className="inline-flex items-center justify-center px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-blue-600/10 border border-blue-500/30">
                  <span className="text-xs md:text-sm font-semibold text-blue-400 leading-relaxed">
                    {stat.description}
                  </span>
                </div>
              </div>
          ))}
        </div>
      </div>
    </section>
  );
}
