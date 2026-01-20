/**
 * [Section] Scroll-Driven Solution Cards
 * [Design] 1:2 layout - Sticky title left, scrolling cards right
 * [Interaction] Cards appear one by one on scroll with powerful visual impact
 */

"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { SectionWrapper } from "./SectionWrapper";
import { TrendingUp, Search, BarChart3, Code, Share2, BookOpen } from "lucide-react";

const solutions = [
  {
    id: "google-ads",
    icon: TrendingUp,
    emoji: "🎯",
    title: "구글 애즈",
    description: "P-Max 캠페인과 AI 입찰로 평균 ROAS 500% 달성. 구글 공식 파트너의 검증된 광고 전략",
    features: ["Performance Max 전략", "Smart Bidding (tROAS/tCPA)", "GA4 고급 전환 추적"],
    featured: true,
    gradientFrom: "from-blue-500",
    gradientTo: "to-indigo-600",
    link: "/google-ads"
  },
  {
    id: "seo-geo",
    icon: Search,
    emoji: "🤖",
    title: "SEO & GEO",
    description: "Gemini AI와 Google 검색에서 동시 상위 노출. AI 시대의 필수 검색 최적화 전략",
    features: ["Technical SEO & Schema", "Gemini AI 최적화", "E-E-A-T 강화 전략"],
    featured: true,
    gradientFrom: "from-emerald-500",
    gradientTo: "to-teal-600",
    link: "/seo-geo"
  },
  {
    id: "performance",
    icon: BarChart3,
    emoji: "📊",
    title: "퍼포먼스 마케팅",
    description: "데이터 기반 의사결정으로 마케팅 ROI 극대화",
    features: ["Marketing Mix Modeling", "Full-Funnel 최적화", "A/B 테스트 & CRO"],
    featured: false,
    link: "/performance"
  },
  {
    id: "wordpress",
    icon: Code,
    emoji: "🔍",
    title: "워드프레스",
    description: "Headless CMS로 초고속 웹사이트 구축",
    features: ["Headless CMS 아키텍처", "커스텀 플러그인 개발", "성능 최적화"],
    featured: false,
    link: "/wordpress"
  },
  {
    id: "social",
    icon: Share2,
    emoji: "📱",
    title: "소셜 미디어 광고",
    description: "Meta·네이버·카카오 통합 캠페인 관리",
    features: ["Cross-Channel 통합 운영", "Dynamic Remarketing", "크리에이티브 최적화"],
    featured: false,
    link: "/performance"
  },
  {
    id: "insights",
    icon: BookOpen,
    emoji: "💼",
    title: "마케팅 인사이트",
    description: "AI·GEO·데이터 분석 실전 전략 공유",
    features: ["구글 애즈 최신 트렌드", "AI 검색 최적화 가이드", "실무 케이스 스터디"],
    featured: false,
    link: "/insights"
  },
];

export function BentoSection() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

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
        rootMargin: '0px 0px -100px 0px'
      }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      cardRefs.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  return (
    <SectionWrapper id="solutions" className="py-32 md:py-40" data-section="SOLUTIONS">
      {/* 1:2 Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Left Column (1/3) - Sticky Title */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-40 text-left">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 md:mb-6 tracking-tight" style={{ letterSpacing: '-1px', lineHeight: '1.3' }}>
              통합 마케팅 솔루션
            </h2>
            <p className="text-base md:text-xl text-slate-600 font-medium leading-relaxed">
              Google Ads와 SEO & GEO를 중심으로 한 데이터 기반 성과 마케팅
            </p>
          </div>
        </div>

        {/* Right Column (2/3) - Scrolling Cards */}
        <div className="lg:col-span-2 space-y-6 md:space-y-8">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            const isGoogleAds = solution.id === "google-ads";
            const isSeoGeo = solution.id === "seo-geo";
            
            return (
              <div
                key={solution.id}
                ref={(el) => { cardRefs.current[index] = el; }}
                className="scroll-reveal-card opacity-0 translate-y-8"
              >
                <Link href={solution.link} className="block">
                  <div 
                    className={`group relative overflow-hidden cursor-pointer transition-all duration-300 rounded-2xl md:rounded-3xl p-8 md:p-10 ${
                      solution.featured 
                        ? isGoogleAds
                          ? 'bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-50 border-2 border-blue-200 shadow-2xl shadow-blue-500/20 hover:shadow-3xl hover:shadow-blue-500/30 hover:scale-[1.02]'
                          : 'bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-50 border-2 border-emerald-200 shadow-2xl shadow-emerald-500/20 hover:shadow-3xl hover:shadow-emerald-500/30 hover:scale-[1.02]'
                        : 'bg-white border-2 border-slate-200 shadow-lg hover:shadow-xl hover:border-blue-300 hover:scale-[1.01]'
                    }`}
                  >
                    {/* Gradient Overlay for Featured Cards */}
                    {solution.featured && (
                      <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-white/30 pointer-events-none" />
                    )}

                    <div className="relative flex flex-col">
                      {/* Icon & Title Row */}
                      <div className="flex items-center gap-5 mb-6">
                        {/* Large Icon with Glow */}
                        <div className="relative flex-shrink-0">
                          <div className={`inline-flex items-center justify-center rounded-3xl transition-all duration-300 ${
                            solution.featured 
                              ? `p-6 bg-gradient-to-br ${solution.gradientFrom} ${solution.gradientTo} group-hover:scale-110 group-hover:rotate-3 ${
                                  isGoogleAds ? 'shadow-2xl shadow-blue-500/50' : 'shadow-2xl shadow-emerald-500/50'
                                }` 
                              : 'p-5 bg-gradient-to-br from-blue-50 to-indigo-50 group-hover:scale-105'
                          }`}>
                            {solution.featured ? (
                              <Icon className="w-12 h-12 md:w-14 md:h-14 text-white drop-shadow-lg" strokeWidth={2.5} />
                            ) : (
                              <span className="text-4xl md:text-5xl drop-shadow-sm">{solution.emoji}</span>
                            )}
                          </div>
                          
                          {/* Pulsing Glow Effect for Featured */}
                          {solution.featured && (
                            <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${solution.gradientFrom} ${solution.gradientTo} opacity-30 blur-xl animate-pulse-slow -z-10`} />
                          )}
                        </div>
                        
                        {/* Title */}
                        <div className="flex-1">
                          <h3 className={`font-extrabold transition-colors leading-[1.2] ${
                            solution.featured 
                              ? 'text-3xl md:text-4xl text-slate-900 group-hover:text-blue-600' 
                              : 'text-2xl md:text-3xl text-slate-900 group-hover:text-blue-600'
                          }`}>
                            {solution.title}
                          </h3>
                          
                          {solution.featured && (
                            <div className={`inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full border backdrop-blur-sm ${
                              isGoogleAds 
                                ? 'bg-blue-100/80 border-blue-200' 
                                : 'bg-emerald-100/80 border-emerald-200'
                            }`}>
                              <span className={`w-2 h-2 rounded-full animate-pulse ${
                                isGoogleAds ? 'bg-blue-500' : 'bg-emerald-500'
                              }`} />
                              <span className={`text-xs font-bold ${
                                isGoogleAds ? 'text-blue-700' : 'text-emerald-700'
                              }`}>핵심 서비스</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Description */}
                      <p className={`mb-6 font-semibold leading-relaxed ${
                        solution.featured 
                          ? 'text-lg md:text-xl text-slate-700' 
                          : 'text-base md:text-lg text-slate-600'
                      }`}>
                        {solution.description}
                      </p>

                      {/* Features Grid */}
                      <div className="space-y-3 mb-6">
                        {solution.features.map((feature) => (
                          <div
                            key={feature}
                            className={`flex items-center gap-3 font-semibold rounded-xl p-4 transition-all duration-200 ${
                              solution.featured
                                ? 'text-base md:text-lg text-slate-800 bg-white/60 backdrop-blur-sm border border-white/40 shadow-sm'
                                : 'text-sm md:text-base text-slate-700 bg-slate-50 hover:bg-slate-100'
                            }`}
                          >
                            <span className={`flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full text-sm font-bold ${
                              solution.featured 
                                ? `bg-gradient-to-br ${solution.gradientFrom} ${solution.gradientTo} text-white shadow-lg` 
                                : 'bg-blue-100 text-blue-600'
                            }`}>✓</span>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA Arrow */}
                      <div className={`flex items-center gap-3 font-bold transition-all duration-300 ${
                        solution.featured 
                          ? 'text-lg text-blue-600 group-hover:gap-5' 
                          : 'text-base text-blue-500 group-hover:gap-4'
                      }`}>
                        <span>자세히 보기</span>
                        <span className="text-2xl transition-transform duration-300 group-hover:translate-x-2">→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
