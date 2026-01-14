/**
 * [Section] Philosophy & Process - Open Air Layout
 * [Design] NO CARDS - Icons and text float freely with generous whitespace
 * [Purpose] Show core values and working methodology
 */

"use client";

import { FadeIn } from "@/components/ui/fade-in";
import { SectionTitle } from "./SectionTitle";
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
  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-slate-50">
      {/* Background Pattern - Subtle Grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(to right, rgb(15 23 42) 1px, transparent 1px), linear-gradient(to bottom, rgb(15 23 42) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />
      
      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative">
        {/* Section Header */}
        <SectionTitle
          badge="Our Philosophy"
          title="우리의 일하는 방식"
          description="15년간 검증된 원칙으로 고객의 성공을 보장합니다"
        />

        {/* Open Air Layout - NO CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mt-16 md:mt-20">
          {principles.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <FadeIn key={principle.title} delay={index * 0.1}>
                <div className="text-center group">
                  {/* Floating Icon */}
                  <div className="inline-flex items-center justify-center mb-6">
                    <div className="relative">
                      {/* Glow Effect */}
                      <div className="absolute inset-0 bg-blue-500 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                      
                      {/* Icon Circle */}
                      <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 flex items-center justify-center transition-all duration-300 group-hover:border-blue-400 group-hover:scale-110 group-hover:shadow-xl">
                        <Icon className="w-10 h-10 md:w-12 md:h-12 text-blue-600 transition-transform duration-300 group-hover:scale-110" />
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
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
