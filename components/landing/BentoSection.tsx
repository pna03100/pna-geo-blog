/**
 * [Section] Premium Solution Cards
 * [Design] Refined, elegant service card style
 * [Interaction] Sophisticated scroll animations
 */

"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { SectionWrapper } from "./SectionWrapper";
import { TrendingUp, Search, BarChart3, Code, Share2, BookOpen, MoveRight } from "lucide-react";

const solutions = [
  {
    id: "google-ads",
    icon: TrendingUp,
    title: "구글 애즈",
    badge: "GOOGLE ADS",
    description: "P-Max 캠페인과 AI 입찰로 평균 ROAS 500% 달성",
    features: ["Performance Max 전략", "Smart Bidding AI", "GA4 고급 분석"],
    featured: true,
    accent: "blue",
    link: "/google-ads"
  },
  {
    id: "seo-geo",
    icon: Search,
    title: "SEO & GEO",
    badge: "SEO & GEO",
    description: "Gemini AI와 Google 검색에서 동시 상위 노출",
    features: ["Technical SEO", "Gemini AI 최적화", "E-E-A-T 전략"],
    featured: true,
    accent: "blue",
    link: "/seo-geo"
  },
  {
    id: "performance",
    icon: BarChart3,
    title: "퍼포먼스 마케팅",
    badge: "PERFORMANCE",
    description: "데이터 기반 의사결정으로 마케팅 ROI 극대화",
    features: ["Marketing Mix", "Full-Funnel 최적화", "A/B 테스트"],
    featured: false,
    accent: "blue",
    link: "/performance"
  },
  {
    id: "wordpress",
    icon: Code,
    title: "워드프레스",
    badge: "WORDPRESS",
    description: "Headless CMS로 초고속 웹사이트 구축",
    features: ["Headless CMS", "커스텀 개발", "성능 최적화"],
    featured: false,
    accent: "blue",
    link: "/wordpress"
  },
  {
    id: "social",
    icon: Share2,
    title: "소셜 미디어",
    badge: "SOCIAL MEDIA",
    description: "Meta·네이버·카카오 통합 캠페인 관리",
    features: ["Cross-Channel", "Dynamic Ads", "크리에이티브"],
    featured: false,
    accent: "blue",
    link: "/performance"
  },
  {
    id: "insights",
    icon: BookOpen,
    title: "인사이트",
    badge: "INSIGHTS",
    description: "AI·GEO·데이터 분석 실전 전략 공유",
    features: ["최신 트렌드", "AI 가이드", "케이스 스터디"],
    featured: false,
    accent: "blue",
    link: "/insights"
  },
];

const accentColors = {
  blue: {
    bg: 'from-slate-900/95 to-blue-950/95',
    border: 'border-blue-500/20',
    icon: 'from-blue-500 to-indigo-600',
    iconText: 'text-blue-400/20',
    iconBg: 'bg-blue-50',
    badge: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    hover: 'group-hover:border-blue-400/40',
    shadow: 'shadow-blue-500/20'
  },
  emerald: {
    bg: 'from-slate-900/95 to-emerald-950/95',
    border: 'border-emerald-500/20',
    icon: 'from-emerald-500 to-teal-600',
    iconText: 'text-emerald-400/20',
    iconBg: 'bg-emerald-50',
    badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    hover: 'group-hover:border-emerald-400/40',
    shadow: 'shadow-emerald-500/20'
  },
  violet: {
    bg: 'from-slate-900/95 to-violet-950/95',
    border: 'border-violet-500/20',
    icon: 'from-violet-500 to-purple-600',
    iconText: 'text-violet-400/20',
    iconBg: 'bg-violet-50',
    badge: 'bg-violet-500/10 text-violet-400 border-violet-500/30',
    hover: 'group-hover:border-violet-400/40',
    shadow: 'shadow-violet-500/20'
  },
  sky: {
    bg: 'from-slate-900/95 to-sky-950/95',
    border: 'border-sky-500/20',
    icon: 'from-sky-500 to-cyan-600',
    iconText: 'text-sky-400/20',
    iconBg: 'bg-sky-50',
    badge: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
    hover: 'group-hover:border-sky-400/40',
    shadow: 'shadow-sky-500/20'
  },
  rose: {
    bg: 'from-slate-900/95 to-rose-950/95',
    border: 'border-rose-500/20',
    icon: 'from-rose-500 to-pink-600',
    iconText: 'text-rose-400/20',
    iconBg: 'bg-rose-50',
    badge: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    hover: 'group-hover:border-rose-400/40',
    shadow: 'shadow-rose-500/20'
  },
  amber: {
    bg: 'from-slate-900/95 to-amber-950/95',
    border: 'border-amber-500/20',
    icon: 'from-amber-500 to-orange-600',
    iconText: 'text-amber-400/20',
    iconBg: 'bg-amber-50',
    badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    hover: 'group-hover:border-amber-400/40',
    shadow: 'shadow-amber-500/20'
  }
};

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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Left Column - Sticky Title */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-40 text-left relative">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 md:mb-6 tracking-tight relative" style={{ letterSpacing: '-1px', lineHeight: '1.3' }}>
              통합 마케팅 솔루션
            </h2>
            <p className="text-base md:text-xl text-slate-600 font-medium leading-relaxed">
              Google Ads와 SEO & GEO를 중심으로 한 데이터 기반 성과 마케팅
            </p>
          </div>
        </div>

        {/* Right Column - Cards */}
        <div className="lg:col-span-2 space-y-4">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            const colors = accentColors[solution.accent as keyof typeof accentColors];
            
            return (
              <div
                key={solution.id}
                ref={(el) => { cardRefs.current[index] = el; }}
                className="scroll-reveal-card opacity-0 translate-y-8"
              >
                <Link href={solution.link} className="block h-full">
                  <div 
                    className={`group relative overflow-hidden cursor-pointer transition-all duration-500 ease-out rounded-2xl backdrop-blur-sm ${
                      solution.featured 
                        ? `bg-gradient-to-br ${colors.bg} border ${colors.border} shadow-xl ${colors.shadow} hover:shadow-2xl ${colors.hover}`
                        : `bg-gradient-to-br ${colors.bg} border ${colors.border} shadow-md hover:shadow-lg ${colors.hover}`
                    } hover:-translate-y-1`}
                  >
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

                    {/* Icon - Top Left Background */}
                    <div className="absolute top-6 left-6 opacity-15">
                      <Icon className={`w-24 h-24 md:w-32 md:h-32 ${colors.iconText}`} strokeWidth={1} />
                    </div>

                    <div className="relative p-6 md:p-8 text-center">
                      {/* Service Badge - Centered */}
                      <div className="flex justify-center mb-6">
                        <div className={`px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-sm ${colors.badge} tracking-wide`}>
                          {solution.badge}
                        </div>
                      </div>

                      {/* Title */}
                      <div className="mb-4">
                        <h3 className="text-3xl md:text-4xl font-bold text-white group-hover:text-blue-400 transition-colors">
                          {solution.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-slate-300 leading-relaxed mb-6 font-medium">
                        {solution.description}
                      </p>

                      {/* Features - Single Line with Dividers */}
                      <div className="flex items-center justify-center gap-3 mb-6 text-sm text-slate-400 flex-wrap">
                        {solution.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <span>{feature}</span>
                            {idx < solution.features.length - 1 && (
                              <div className="w-px h-3 bg-slate-600" />
                            )}
                          </div>
                        ))}
                      </div>

                      {/* CTA - Centered */}
                      <div className="flex items-center justify-center gap-2 text-blue-400 group-hover:text-blue-300 font-semibold text-sm group-hover:gap-3 transition-all">
                        <span>자세히 보기</span>
                        <MoveRight className="w-4 h-4" />
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
