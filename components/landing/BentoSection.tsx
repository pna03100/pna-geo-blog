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
import Image from "next/image";

const solutions = [
  {
    id: "google-ads",
    icon: TrendingUp,
    title: "구글 광고",
    badge: "GOOGLE ADS",
    description: "AI 스마트 입찰과 정밀 타겟팅으로 효율을 극대화하여 광고비 낭비를 최소화하는 전략을 수립합니다",
    features: ["Performance Max", "Smart Bidding AI"],
    featured: true,
    accent: "blue",
    link: "/google-ads",
    image: "/images/hero/google-ads-hero-bg.jpg"
  },
  {
    id: "seo-geo",
    icon: Search,
    title: "SEO & GEO",
    badge: "SEO & GEO",
    description: "검색 엔진과 Gemini AI 결과에 동시 상위 노출되는 시맨틱 점유 전략으로 브랜드 가치를 높입니다",
    features: ["Technical SEO", "Gemini AI 최적화"],
    featured: true,
    accent: "blue",
    link: "/seo-geo",
    image: "/images/hero/seo-hero-bg.jpg"
  },
  {
    id: "wordpress",
    icon: Code,
    title: "워드프레스",
    badge: "WORDPRESS",
    description: "기술적 SEO 최적화와 사용자 경험을 동시에 고려한 초고속 퍼포먼스 웹사이트를 구축합니다",
    features: ["Headless CMS", "커스텀 개발"],
    featured: false,
    accent: "blue",
    link: "/wordpress",
    image: "/images/hero/wordpress-hero-bg.jpg"
  },
  {
    id: "performance",
    icon: BarChart3,
    title: "퍼포먼스 마케팅",
    badge: "PERFORMANCE",
    description: "추측을 배제하고 전 과정 데이터 추적을 통해 마케팅 ROI 최적화의 길을 제안합니다",
    features: ["Marketing Mix", "Full-Funnel"],
    featured: false,
    accent: "blue",
    link: "/performance",
    image: "/images/hero/performance-hero-bg.jpg"
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
    <section id="solutions" className="py-20 md:py-32 bg-black relative" data-section="SOLUTIONS">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* [Careons] Small Badge */}
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 text-blue-400 font-semibold text-sm">
            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
            서비스
          </span>
        </div>
        
        {/* Header */}
        <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-3" style={{ lineHeight: '1.2' }}>
              비즈니스 성장을 가속화하는<br/>4가지 정밀 솔루션
            </h2>
          </div>
          <p className="text-base md:text-lg text-slate-300 leading-relaxed max-w-xl">
            데이터 기반 전략으로 귀사의 성장을 증명합니다
          </p>
        </div>

        {/* [Careons] Cards Grid - 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            
            return (
              <div
                key={solution.id}
                ref={(el) => { cardRefs.current[index] = el; }}
                className="scroll-reveal-card opacity-0 translate-y-8"
              >
                <Link href={solution.link} className="block h-full">
                  <div className="group relative overflow-hidden rounded-3xl bg-slate-800 border border-slate-700 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1">
                    
                    {/* Image Area with Real Photo */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={solution.image}
                        alt={solution.title}
                        fill
                        className="object-cover"
                      />
                      {/* Dark overlay (disappears on hover) */}
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 to-slate-800/70 group-hover:from-slate-900/0 group-hover:to-slate-800/0 transition-all duration-300" />
                    </div>
                    
                    {/* Content */}
                    <div className="p-6 md:p-8">
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                        {solution.title}
                      </h3>
                      
                      <p className="text-slate-300 leading-relaxed mb-6">
                        {solution.description}
                      </p>
                      
                      {/* Raised/Goal Amount Style */}
                      <div className="flex items-center justify-between mb-6 text-sm">
                        <div>
                          <p className="text-slate-400 mb-1">핵심 기술</p>
                          <p className="text-white font-bold">{solution.features[0]}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-slate-400 mb-1">전문 분야</p>
                          <p className="text-blue-400 font-bold">{solution.features[1]}</p>
                        </div>
                      </div>
                      
                      {/* Learn More Button */}
                      <button className="w-full py-3 px-6 rounded-full border-2 border-white text-white font-semibold hover:bg-white hover:text-slate-900 transition-all duration-200">
                        자세히 보기 →
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
        
        {/* [Careons] Bottom CTA */}
        <div className="text-center">
          <p className="text-slate-400 mb-4">
            모든 서비스를 확인하고 비즈니스 성장에 동참하세요
          </p>
          <Link href="/google-ads" className="inline-flex items-center gap-2 text-blue-400 font-semibold hover:gap-3 transition-all">
            <span>전체 서비스 보기</span>
            <MoveRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
