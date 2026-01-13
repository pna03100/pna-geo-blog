/**
 * [Section] Key Metrics - Bento Grid Layout (Fizens Style)
 * [Design] Asymmetric, Clean, SEO-Optimized
 * [Animation] Count-up effect on scroll + Subtle entrance animation
 */

"use client";

import { FadeIn } from "@/components/ui/fade-in";
import { CountUpNumber } from "./CountUpNumber";
import { SectionTitle } from "./SectionTitle";

// Define data outside component (DRY principle)
const metrics = [
  {
    id: "roas",
    label: "광고주 평균 ROAS",
    value: 500,
    suffix: "%",
    description: "업계 평균 대비 3.5배 높은 성과",
    variant: "primary", // Blue Card
    colSpan: "lg:col-span-7",
  },
  {
    id: "spend",
    label: "누적 광고 집행 금액",
    value: 470,
    suffix: "억+",
    description: "데이터로 검증된 집행 노하우",
    variant: "default", // White Card
    colSpan: "lg:col-span-5",
  },
  {
    id: "budget",
    label: "월 구글 애즈 집행 예산",
    value: 30,
    suffix: "억",
    description: "대규모 예산 운영 최적화",
    variant: "default",
    colSpan: "lg:col-span-5",
  },
  {
    id: "campaign",
    label: "구글 선정 우수 캠페인",
    value: 100,
    suffix: "대",
    description: "2023년 Google 선정",
    variant: "default",
    colSpan: "lg:col-span-7",
  },
];

export function MetricsSection() {
  return (
    <section className="py-8 md:py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Header with Badge */}
        <SectionTitle
          badge="Proven Results"
          title="숫자로 증명하는 퍼포먼스"
          description="감각에 의존하지 않습니다. 오직 정확한 데이터만이 비즈니스의 성장을 만듭니다."
        />

        {/* Bento Grid (SEO: Description List) */}
        <dl className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-6">
          {metrics.map((stat, index) => (
            <FadeIn key={stat.id} delay={index * 0.1} className={stat.colSpan}>
              <div
                className={`
                relative overflow-hidden rounded-2xl md:rounded-[2.5rem] p-6 md:p-10 flex flex-col items-center md:items-start text-center md:text-left justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl
                ${stat.variant === 'primary' 
                  ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30' 
                  : 'bg-white border border-slate-100 text-slate-900 shadow-sm hover:border-blue-200'
                }
              `}
            >
              {/* Decorative Pattern for White Cards */}
              {stat.variant === 'default' && (
                <div 
                  className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                  style={{ 
                    backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)', 
                    backgroundSize: '24px 24px' 
                  }} 
                />
              )}
              
              {/* Decorative Gradient for Blue Card */}
              {stat.variant === 'primary' && (
                 <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
              )}

              {/* Content */}
              <dt className={`text-sm md:text-lg font-medium mb-1.5 md:mb-2 ${stat.variant === 'primary' ? 'text-blue-100' : 'text-slate-500'}`}>
                {stat.label}
              </dt>
              
              <dd className="text-4xl md:text-7xl font-bold tracking-tight mb-2.5 md:mb-4 flex items-baseline gap-1">
                <CountUpNumber
                  end={stat.value}
                  suffix=""
                />
                <span className="text-2xl md:text-4xl opacity-80 font-medium">{stat.suffix}</span>
              </dd>
              
              <div className={`text-xs md:text-sm font-semibold px-3 py-1.5 md:px-4 md:py-2 rounded-full w-fit ${
                stat.variant === 'primary' ? 'bg-white/20 text-white' : 'bg-slate-50 text-slate-600'
              }`}>
                {stat.description}
              </div>
              </div>
            </FadeIn>
          ))}
        </dl>
      </div>
    </section>
  );
}
