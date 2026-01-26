/**
 * [Section] Services - Card Grid Layout
 * [Design] Card-based design with background images and hover effects
 */

"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUp, Cpu, Globe, Layout, RefreshCw } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useScrollReveal } from "@/lib/hooks/useScrollReveal";

const services = [
  {
    id: "google-ads",
    icon: Cpu,
    title: "구글 광고",
    subtitle: "GOOGLE ADS",
    description: (
      <>
        AI 스마트 입찰과 정밀 타겟팅으로 광고 효율을 극대화합니다.<br className="hidden md:block" />
        실시간 데이터 분석을 통해 광고비 낭비를 최소화하고 최적의 성과를 이끌어냅니다.
      </>
    ),
    features: ["스마트 입찰 최적화", "정밀 타겟팅", "실시간 모니터링"],
    link: "/google-ads",
    image: "/images/hero/google-ads-hero-bg.jpg"
  },
  {
    id: "seo-geo",
    icon: Globe,
    title: "SEO & GEO",
    subtitle: "SEO & GEO",
    description: (
      <>
        검색 엔진과 Gemini AI 결과에 동시 상위 노출되는 시맨틱 전략을 구축합니다.<br className="hidden md:block" />
        데이터 기반의 정밀한 컨텐츠 최적화로 브랜드 가치를 높입니다.
      </>
    ),
    features: ["시맨틱 SEO", "AI 검색 최적화", "브랜드 노출 확대"],
    link: "/seo-geo",
    image: "/images/hero/seo-hero-bg.jpg"
  },
  {
    id: "wordpress",
    icon: Layout,
    title: "워드프레스",
    subtitle: "WORDPRESS",
    description: (
      <>
        기술적 SEO 최적화와 사용자 경험을 동시에 고려한 웹사이트를 구축합니다.<br className="hidden md:block" />
        초고속 퍼포먼스와 완벽한 반응형 디자인으로 비즈니스 성장을 지원합니다.
      </>
    ),
    features: ["기술적 SEO", "UX 최적화", "고속 퍼포먼스"],
    link: "/wordpress",
    image: "/images/hero/wordpress-hero-bg.jpg"
  },
  {
    id: "performance",
    icon: RefreshCw,
    title: "퍼포먼스 마케팅",
    subtitle: "PERFORMANCE MARKETING",
    description: (
      <>
        추측을 배제하고 전 과정 데이터 추적을 통해 마케팅을 최적화합니다.<br className="hidden md:block" />
        명확한 성과 지표 분석으로 지속 가능한 ROI 향상을 실현합니다.
      </>
    ),
    features: ["데이터 추적", "ROI 최적화", "성과 분석"],
    link: "/performance",
    image: "/images/hero/performance-hero-bg.jpg"
  },
];

// Service Card Component
function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const IconComponent = service.icon;

  return (
    <Link 
      href={service.link}
      className="reveal-card group relative bg-slate-900/80 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 overflow-hidden border border-slate-700/50 hover:border-blue-500/50"
      style={{
        willChange: 'transform',
        transform: 'translateZ(0)',
      }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 opacity-15 group-hover:opacity-25 transition-opacity duration-300">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-blue-950/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative p-6 md:p-8 lg:p-10 text-center">
        
        {/* Subtitle */}
        <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3 mt-2">
          {service.subtitle}
        </p>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-0 md:mb-4 group-hover:text-blue-400 transition-colors duration-300">
          {service.title}
        </h3>

        {/* Description - 모바일 숨김 */}
        <p className="hidden md:block text-slate-400 group-hover:text-slate-300 leading-relaxed mb-8 text-base h-[3rem] line-clamp-2 transition-colors duration-300">
          {service.description}
        </p>

        {/* Features with Dividers - 모바일 숨김 */}
        <div className="hidden md:flex items-center justify-center gap-3 text-sm text-slate-500 group-hover:text-slate-400 transition-colors duration-300 mb-6 flex-wrap">
          {service.features.map((feature, idx) => (
            <React.Fragment key={idx}>
              <span className="whitespace-nowrap">{feature}</span>
              {idx < service.features.length - 1 && (
                <span className="w-px h-3 bg-slate-700"></span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Progress Bar + Arrow Icon - 모바일 숨김 */}
        <div className="hidden md:flex items-center justify-center gap-3">
          {/* Progress Bar */}
          <div className="flex-1 max-w-[80%] h-1 bg-slate-800/50 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />
          </div>
          
          {/* Arrow Icon with rotation */}
          <div className="w-10 h-10 rounded-full border-2 border-slate-700 group-hover:border-blue-500 flex items-center justify-center transition-all duration-300">
            <ArrowUp 
              className="w-5 h-5 text-slate-500 group-hover:text-blue-400 transition-all duration-500 group-hover:rotate-90" 
              strokeWidth={2}
              style={{
                willChange: 'transform',
                transform: 'translateZ(0)',
              }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

export function ServicesAlternate() {
  const cardsContainerRef = useScrollReveal("active", { threshold: 0.2, once: true });

  return (
    <section id="solutions" className="py-20 md:py-32 relative bg-slate-950" data-section="SOLUTIONS">
      <div className="max-w-7xl mx-auto px-6 md:px-6">
        
        {/* Dark Theme Section Header */}
        <div className="mb-8 md:mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/20 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
            <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">서비스</span>
          </div>
          
          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {/* 모바일: 2줄 */}
            <span className="md:hidden">
              PNA가 제공하는<br/>
              핵심 마케팅 서비스
            </span>
            {/* 웹: 1줄 (띄어쓰기 추가) */}
            <span className="hidden md:inline">
              PNA가 제공하는 핵심 마케팅 서비스
            </span>
          </h2>
          
          {/* Description */}
          <p className="text-lg text-slate-400 max-w-3xl leading-relaxed">
            구글 광고, SEO & GEO, 워드프레스, 퍼포먼스 마케팅까지 데이터 기반의 통합 솔루션을 제공합니다
          </p>
        </div>

        {/* 모바일: 1열 세로 / 데스크톱: 2x2 그리드 */}
        <div 
          ref={cardsContainerRef as React.RefObject<HTMLDivElement>}
          className="reveal-cards-container grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8"
        >
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
