/**
 * [Section] Philosophy & Process - Open Air Layout
 * [Design] NO CARDS - Icons and text float freely with generous whitespace
 * [Purpose] Show core values and working methodology
 * [Animation] Lightweight fade-in on scroll with Intersection Observer
 */

"use client";

import { useEffect, useRef } from "react";
import { Target, TrendingUp, Users, Zap } from "lucide-react";

const principles = [
  {
    icon: Target,
    title: "데이터 중심 의사결정",
    description: "직관이 아닌 측정 가능한 지표로 모든 전략을 수립합니다"
  },
  {
    icon: TrendingUp,
    title: "지속 가능한 성장",
    description: "단기 성과가 아닌 장기적 관점의 비즈니스 성장을 추구합니다"
  },
  {
    icon: Users,
    title: "투명한 소통",
    description: "실시간 리포트와 1:1 전담 매니저로 완벽한 투명성을 보장합니다"
  },
  {
    icon: Zap,
    title: "빠른 최적화",
    description: "24/7 모니터링과 즉각적인 개선으로 광고 효율을 극대화합니다"
  },
];

export function PhilosophySection() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    itemRefs.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => {
      itemRefs.current.forEach((item) => {
        if (item) observer.unobserve(item);
      });
    };
  }, []);

  return (
    <>
      {/* SECTION: #PHILOSOPHY */}
      <section data-section="PHILOSOPHY" className="relative py-32 md:py-40">
      
      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative">
        {/* Section Header */}
        <div className="mb-12 md:mb-16 text-center">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 md:mb-6 tracking-tight" style={{ letterSpacing: '-1px', lineHeight: '1.3' }}>
            우리의 일하는 방식
          </h2>
          <p className="text-base md:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
            15년간 검증된 원칙으로 고객의 성공을 보장합니다
          </p>
        </div>

        {/* Open Air Layout - NO CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mt-16 md:mt-20">
          {principles.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <div 
                key={principle.title}
                ref={(el) => { itemRefs.current[index] = el; }}
                className="philosophy-item opacity-0 translate-y-4"
                style={{ transitionDelay: `${index * 0.2}s` }}
              >
                <div className="text-center group">
                  {/* Floating Icon */}
                  <div className="inline-flex items-center justify-center mb-6">
                    <div className="relative">
                      {/* Icon Circle */}
                      <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 flex items-center justify-center transition-all duration-200 ease-premium group-hover:border-blue-400 group-hover:shadow-md">
                        <Icon className="w-10 h-10 md:w-12 md:h-12 text-blue-600" />
                      </div>
                    </div>
                  </div>

                  {/* Text Content */}
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3 leading-[1.4]">
                    {principle.title}
                  </h3>
                  <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
    </>
  );
}
