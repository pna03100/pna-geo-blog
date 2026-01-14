/**
 * [Section] Bento Grid - Core Solutions
 * [Layout] Masonry-like grid with varying sizes
 * [Animation] Subtle scroll-triggered entrance
 */

import Link from "next/link";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionWrapper } from "./SectionWrapper";
import { SectionTitle } from "./SectionTitle";

const solutions = [
  {
    icon: "🎯",
    title: "구글 애즈",
    description: "P-Max 캠페인과 AI 입찰로 평균 ROAS 500% 달성",
    features: ["Performance Max 전략", "Smart Bidding (tROAS/tCPA)", "GA4 고급 전환 추적"],
    span: "md:col-span-1",
    link: "/google-ads"
  },
  {
    icon: "🤖",
    title: "SEO & GEO",
    description: "Gemini AI와 Google 검색에서 동시 상위 노출",
    features: ["Technical SEO & Schema", "Gemini AI 최적화", "E-E-A-T 강화 전략"],
    span: "md:col-span-1",
    link: "/seo-geo"
  },
  {
    icon: "📊",
    title: "퍼포먼스 마케팅",
    description: "데이터 기반 의사결정으로 마케팅 ROI 극대화",
    features: ["Marketing Mix Modeling", "Full-Funnel 최적화", "LTV & RFM 분석"],
    span: "md:col-span-1",
    link: "/performance"
  },
  {
    icon: "🔍",
    title: "워드프레스",
    description: "Next.js 연동 Headless CMS로 초고속 웹사이트 구축",
    features: ["Headless CMS 아키텍처", "커스텀 플러그인 개발", "WooCommerce & 결제 연동"],
    span: "md:col-span-1",
    link: "/wordpress"
  },
  {
    icon: "📱",
    title: "소셜 미디어 광고",
    description: "Meta·네이버·카카오 통합 캠페인 관리 및 최적화",
    features: ["Cross-Channel 통합 운영", "Dynamic Remarketing", "Lookalike Audience 구축"],
    span: "md:col-span-1",
    link: "/performance"
  },
  {
    icon: "💼",
    title: "마케팅 인사이트",
    description: "AI·GEO·데이터 분석 등 실전 마케팅 전략 공유",
    features: ["구글 애즈 최신 트렌드", "AI 검색 최적화 가이드", "실제 캠페인 사례 분석"],
    span: "md:col-span-1",
    link: "/insights"
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
        {solutions.map((solution, index) => {
          return (
            <FadeIn key={solution.title} delay={index * 0.1} className={solution.span}>
              <Link href={solution.link} className="block h-full">
                <div 
                  className="group relative overflow-hidden rounded-xl md:rounded-2xl bg-white border border-slate-200 p-5 md:p-8 shadow-sm transition-all hover:shadow-xl hover:border-[#2563EB] h-full cursor-pointer"
                >
                  <div className="h-full flex flex-col items-center md:items-start text-center md:text-left">
                    {/* Icon with Solid Background */}
                    <div className="inline-flex items-center justify-center p-3 md:p-4 rounded-xl md:rounded-2xl bg-blue-50 mb-4 md:mb-6 w-fit transition-transform group-hover:scale-110">
                      <span className="text-2xl md:text-4xl">{solution.icon}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg md:text-2xl font-bold text-slate-900 mb-1.5 md:mb-2 group-hover:text-[#2563EB] transition-colors leading-[1.4]">
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
              </Link>
            </FadeIn>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
