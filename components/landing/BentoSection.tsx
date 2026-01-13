/**
 * [Section] Bento Grid - Core Solutions
 * [Layout] Masonry-like grid with varying sizes
 */

"use client";

import { SectionWrapper } from "./SectionWrapper";
import { SectionTitle } from "./SectionTitle";

const solutions = [
  {
    icon: "🎯",
    title: "구글 광고",
    description: "검색 의도 선점 타겟팅 및 ROAS 최적화",
    features: ["스마트 입찰 전략", "키워드 최적화", "광고 A/B 테스팅"],
    span: "md:col-span-1",
  },
  {
    icon: "🤖",
    title: "AI 마케팅 & GEO",
    description: "ChatGPT 검색 최적화 및 GEO 전략",
    features: ["AI 검색 최적화", "콘텐츠 전략", "백링크 구축"],
    span: "md:col-span-1",
  },
  {
    icon: "📊",
    title: "데이터 & 분석",
    description: "GA4 기반 정밀 분석 및 시각화",
    features: ["전환 추적", "사용자 행동 분석", "맞춤 리포트"],
    span: "md:col-span-1",
  },
  {
    icon: "📱",
    title: "소셜 미디어 광고",
    description: "Meta, 네이버, 카카오 통합 관리",
    features: ["SNS 광고 통합", "크로스 채널 최적화", "리타겟팅"],
    span: "md:col-span-1",
  },
  {
    icon: "🔍",
    title: "워드프레스 & SEO",
    description: "기술적 SEO 최적화 및 Core Web Vitals",
    features: ["성능 최적화", "SEO 구조화", "보안 강화"],
    span: "md:col-span-1",
  },
  {
    icon: "💼",
    title: "마케팅 인사이트",
    description: "최신 마케팅 트렌드 및 전략",
    features: ["업계 인사이트", "마케팅 가이드", "케이스 스터디"],
    span: "md:col-span-1",
  },
];

export function BentoSection() {
  return (
    <SectionWrapper id="solutions">
      <SectionTitle
        badge="Core Solutions"
        title="통합 마케팅 솔루션"
        description="Google Ads부터 SEO, GEO, 미디어까지 데이터 기반 성과 마케팅의 모든 것"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {solutions.map((solution) => {
          return (
            <div key={solution.title} className={`group relative overflow-hidden rounded-xl md:rounded-2xl bg-white border border-slate-200 p-5 md:p-8 shadow-sm transition-all hover:shadow-xl hover:border-[#2563EB] ${solution.span}`}>
                <div className="h-full flex flex-col items-center md:items-start text-center md:text-left">
                  {/* Icon with Solid Background */}
                  <div className="inline-flex items-center justify-center p-3 md:p-4 rounded-xl md:rounded-2xl bg-blue-50 mb-4 md:mb-6 w-fit">
                    <span className="text-2xl md:text-4xl">{solution.icon}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg md:text-2xl font-bold text-slate-900 mb-1.5 md:mb-2">
                    {solution.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm md:text-base text-slate-500 font-medium mb-4 md:mb-6">{solution.description}</p>

                  {/* Features */}
                  <ul className="space-y-1.5 md:space-y-2 mt-auto w-full">
                    {solution.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center justify-center md:justify-start gap-2 text-xs md:text-sm text-slate-700 font-medium"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
