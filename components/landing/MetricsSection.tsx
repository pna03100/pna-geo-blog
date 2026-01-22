/**
 * [Section] Our Impact - Careons Style
 * [Design] Image background cards with overlay
 * [Animation] Smooth fade-in effect
 */

"use client";

import { CountUpNumber } from "./CountUpNumber";
import Image from "next/image";

const metrics = [
  {
    id: "roas",
    label: "평균 ROAS",
    value: 500,
    suffix: "%",
    description: "데이터 최적화 기반 실적",
    image: "/images/hero/google-ads-hero-bg.jpg"
  },
  {
    id: "spend",
    label: "누적 광고 집행액",
    value: 470,
    suffix: "억+",
    description: "검증된 운용 능력",
    image: "/images/hero/performance-hero-bg.jpg"
  },
  {
    id: "experience",
    label: "실전 경력",
    value: 15,
    suffix: "년+",
    description: "업계를 선도해온 마케팅 노하우",
    image: "/images/hero/seo-hero-bg.jpg"
  },
];

export function MetricsSection() {
  return (
    <section data-section="METRICS" className="py-20 md:py-32 relative z-10">
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
        
        {/* [Careons] Small Badge */}
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            우리의 성과
          </span>
        </div>
        
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-3" style={{ lineHeight: '1.2' }}>
              데이터로 기록된<br/>파트너사의 성장 궤적
            </h2>
          </div>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-xl">
            추측이 아닌 실제 수치로 증명된 성과. 우리의 전문성은 파트너사의 성장으로 말합니다.
          </p>
        </div>

        {/* [Careons] Image Background Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metrics.map((stat) => (
            <div key={stat.id} className="group relative overflow-hidden rounded-3xl aspect-[4/5]">
              {/* Background Image */}
              <Image
                src={stat.image}
                alt={stat.label}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />
              
              {/* Content */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end text-white">
                <div className="mb-2">
                  <div className="flex items-baseline gap-1">
                    <CountUpNumber 
                      end={stat.value} 
                      suffix="" 
                      className="text-5xl md:text-6xl font-bold tracking-tight"
                    />
                    <span className="text-3xl md:text-4xl font-bold">
                      {stat.suffix}
                    </span>
                  </div>
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold mb-2">
                  {stat.label}
                </h3>
                
                <p className="text-sm md:text-base text-white/80 leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
