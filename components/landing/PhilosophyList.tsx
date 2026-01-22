/**
 * [Section] Philosophy - Phase-based Timeline Layout
 * [Design] Vertical timeline design matching reference image
 */

"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { useScrollReveal } from "@/lib/hooks/useScrollReveal";
import React from "react";

const phases = [
  {
    phase: "01",
    subtitle: "Data-Driven",
    title: "데이터 중심 의사결정",
    description: "직관이 아닌 측정 가능한 지표로 모든 전략을 수립합니다.",
    tags: ["DATA ANALYSIS", "METRIC TRACKING", "STRATEGIC PLANNING", "PERFORMANCE MEASUREMENT"]
  },
  {
    phase: "02",
    subtitle: "Sustainable",
    title: "지속 가능한 성장",
    description: "단기 성과가 아닌 장기적 관점의 비즈니스 성장을 추구합니다.",
    tags: ["LONG-TERM GROWTH", "SCALABLE STRATEGY", "BUSINESS EXPANSION", "SUSTAINABLE ROI"]
  },
  {
    phase: "03",
    subtitle: "Transparent",
    title: "투명한 소통",
    description: "실시간 리포트와 1:1 전담 매니저로 완벽한 투명성을 보장합니다.",
    tags: ["REAL-TIME REPORTING", "DEDICATED MANAGER", "CLEAR COMMUNICATION", "FULL TRANSPARENCY"]
  },
  {
    phase: "04",
    subtitle: "Optimization",
    title: "빠른 최적화",
    description: "24/7 모니터링과 즉각적인 개선으로 광고 효율을 극대화합니다.",
    tags: ["24/7 MONITORING", "QUICK RESPONSE", "CONTINUOUS IMPROVEMENT", "EFFICIENCY BOOST"]
  },
];

export function PhilosophyList() {
  return (
    <section data-section="PHILOSOPHY" className="relative py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        
        <SectionHeader 
          badge="우리의 일하는 방식"
          title="함께 만드는 성공"
          description="15년간 검증된 원칙으로 고객의 성공을 보장합니다"
        />

        {/* Phase Timeline - Centered */}
        <div className="flex justify-center">
          <div className="relative pl-64 max-w-5xl w-full">
          {/* Continuous Vertical Line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-200" style={{ left: '256px' }}></div>

          {phases.map((phase, index) => (
            <PhaseItem key={index} phase={phase} index={index} />
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Phase Item Component with Individual Scroll Reveal
function PhaseItem({ phase, index }: { phase: typeof phases[0]; index: number }) {
  const itemRef = useScrollReveal("active", { threshold: 0.6, once: true });

  return (
    <div 
      ref={itemRef as React.RefObject<HTMLDivElement>}
      className="reveal-timeline group relative flex gap-20 pb-32 last:pb-0"
    >
      {/* Left: Phase Label (Right Aligned) */}
      <div className="absolute left-0 w-64 pr-16" style={{ left: '-256px' }}>
        <div className="flex flex-col items-end">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">PHASE</p>
          <h3 className="text-2xl md:text-3xl font-bold text-slate-300 group-hover:text-blue-600 transition-colors duration-300 font-mono tracking-tight leading-none whitespace-nowrap">
            {phase.phase} {phase.subtitle}
          </h3>
        </div>
      </div>

      {/* Center: Circle on Timeline */}
      <div className="absolute left-0 flex items-center justify-center" style={{ left: '-6px', top: '50%', transform: 'translateY(-50%)' }}>
        <div className="w-3 h-3 rounded-full border-2 border-slate-300 bg-transparent group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-300"></div>
      </div>

      {/* Right: Content */}
      <div className="flex-1 pt-0 pl-16">
        <h4 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 leading-tight">
          {phase.title}
        </h4>
        
        <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-5">
          {phase.description}
        </p>
        
        {/* Tags - Always Visible */}
        <div className="flex flex-wrap gap-2">
          {phase.tags.map((tag, tagIndex) => (
            <span 
              key={tagIndex}
              className="px-3 py-1.5 rounded-md bg-slate-200 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 text-xs font-semibold uppercase tracking-wider transition-colors duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
