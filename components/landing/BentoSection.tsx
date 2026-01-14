/**
 * [Section] Asymmetrical Bento Grid - Core Solutions
 * [Design] Google Ads & SEO/GEO are 2x larger to emphasize main services
 * [Layout] Masonry-like grid with strategic size hierarchy
 */

import Link from "next/link";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionWrapper } from "./SectionWrapper";
import { SectionTitle } from "./SectionTitle";
import { TrendingUp, Search, BarChart3, Code, Share2, BookOpen } from "lucide-react";

const solutions = [
  {
    icon: TrendingUp,
    emoji: "🎯",
    title: "구글 애즈",
    description: "P-Max 캠페인과 AI 입찰로 평균 ROAS 500% 달성. 구글 공식 파트너의 검증된 광고 전략",
    features: ["Performance Max 전략", "Smart Bidding (tROAS/tCPA)", "GA4 고급 전환 추적"],
    span: "md:col-span-2 md:row-span-1", // Wide (2 columns)
    featured: true,
    gradientFrom: "from-blue-500",
    gradientTo: "to-indigo-600",
    link: "/google-ads"
  },
  {
    icon: Search,
    emoji: "🤖",
    title: "SEO & GEO",
    description: "Gemini AI와 Google 검색에서 동시 상위 노출. AI 시대의 필수 검색 최적화 전략",
    features: ["Technical SEO & Schema", "Gemini AI 최적화", "E-E-A-T 강화 전략"],
    span: "md:col-span-2 md:row-span-1", // Wide (2 columns)
    featured: true,
    gradientFrom: "from-purple-500",
    gradientTo: "to-pink-600",
    link: "/seo-geo"
  },
  {
    icon: BarChart3,
    emoji: "📊",
    title: "퍼포먼스 마케팅",
    description: "데이터 기반 의사결정으로 마케팅 ROI 극대화",
    features: ["Marketing Mix Modeling", "Full-Funnel 최적화"],
    span: "md:col-span-1",
    link: "/performance"
  },
  {
    icon: Code,
    emoji: "🔍",
    title: "워드프레스",
    description: "Headless CMS로 초고속 웹사이트 구축",
    features: ["Headless CMS 아키텍처", "커스텀 플러그인 개발"],
    span: "md:col-span-1",
    link: "/wordpress"
  },
  {
    icon: Share2,
    emoji: "📱",
    title: "소셜 미디어 광고",
    description: "Meta·네이버·카카오 통합 캠페인 관리",
    features: ["Cross-Channel 통합 운영", "Dynamic Remarketing"],
    span: "md:col-span-1",
    link: "/performance"
  },
  {
    icon: BookOpen,
    emoji: "💼",
    title: "마케팅 인사이트",
    description: "AI·GEO·데이터 분석 실전 전략 공유",
    features: ["구글 애즈 최신 트렌드", "AI 검색 최적화 가이드"],
    span: "md:col-span-1",
    link: "/insights"
  },
];

export function BentoSection() {
  return (
    <SectionWrapper id="solutions" className="bg-white">
      <SectionTitle
        badge="Core Solutions"
        title="통합 마케팅 솔루션"
        description="Google Ads와 SEO & GEO를 중심으로 한 데이터 기반 성과 마케팅"
      />

      {/* Asymmetrical Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-fr">
        {solutions.map((solution, index) => {
          const Icon = solution.icon;
          return (
            <FadeIn key={solution.title} delay={index * 0.1} className={solution.span}>
              <Link href={solution.link} className="block h-full">
                <div 
                  className={`group relative overflow-hidden rounded-xl md:rounded-2xl bg-white border-2 p-6 md:p-8 shadow-sm transition-all hover:shadow-2xl h-full cursor-pointer ${
                    solution.featured 
                      ? 'border-blue-200 hover:border-blue-500 hover:scale-[1.02]' 
                      : 'border-slate-200 hover:border-blue-400'
                  }`}
                >
                  {/* Featured Badge for Main Services */}
                  {solution.featured && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-bold rounded-full">
                      MAIN
                    </div>
                  )}

                  {/* Background Pattern for Featured Cards */}
                  {solution.featured && (
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute inset-0" style={{
                        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(37,99,235,0.1) 10px, rgba(37,99,235,0.1) 20px)',
                      }} />
                    </div>
                  )}

                  <div className="relative h-full flex flex-col">
                    {/* Icon with Gradient Background */}
                    <div className={`inline-flex items-center justify-center p-4 rounded-2xl mb-5 w-fit transition-all group-hover:scale-110 ${
                      solution.featured 
                        ? `bg-gradient-to-br ${solution.gradientFrom} ${solution.gradientTo}` 
                        : 'bg-blue-50'
                    }`}>
                      {solution.featured ? (
                        <Icon className="w-7 h-7 md:w-9 md:h-9 text-white" />
                      ) : (
                        <span className="text-3xl md:text-4xl">{solution.emoji}</span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className={`font-bold mb-2 transition-colors leading-[1.4] ${
                      solution.featured 
                        ? 'text-2xl md:text-3xl text-slate-900 group-hover:text-blue-600' 
                        : 'text-lg md:text-xl text-slate-900 group-hover:text-blue-600'
                    }`} style={{ lineHeight: '1.4' }}>
                      {solution.title}
                    </h3>

                    {/* Description */}
                    <p className={`text-slate-600 mb-5 font-medium leading-relaxed ${
                      solution.featured ? 'text-base md:text-lg' : 'text-sm md:text-base'
                    }`}>
                      {solution.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2 mt-auto">
                      {solution.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-xs md:text-sm text-slate-700 font-medium"
                        >
                          <span className="text-blue-500 mt-0.5 flex-shrink-0">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Hover Arrow */}
                    <div className="mt-5 flex items-center gap-2 text-blue-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>자세히 보기</span>
                      <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                    </div>
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
