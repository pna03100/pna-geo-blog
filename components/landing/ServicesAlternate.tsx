/**
 * [Section] Services - Image + Button/Content Layout
 * [Design] Left image (40%) + Right buttons/content (60%)
 */

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Target, Search, Layout, TrendingUp } from "lucide-react";

const services = [
  {
    id: "google-ads",
    icon: Target,
    title: "구글 광고",
    subtitle: "GOOGLE ADS",
    description: "광고비는 줄이고 매출은 늘립니다.\nAI 기반 스마트 입찰로 ROI를 극대화하세요.",
    features: ["스마트 입찰 최적화", "정밀 타겟팅", "실시간 모니터링"],
    link: "/google-ads",
    image: "/images/hero/google-ads-hero-bg.jpg",
    brandColor: "blue"
  },
  {
    id: "seo-geo",
    icon: Search,
    title: "SEO & GEO",
    subtitle: "SEO & GEO",
    description: "구글과 AI 검색 모두 1페이지 노출.\n시맨틱 SEO로 검색 트래픽을 2배로.",
    features: ["시맨틱 SEO", "AI 검색 최적화", "브랜드 노출 확대"],
    link: "/seo-geo",
    image: "/images/hero/seo-hero-bg.jpg",
    brandColor: "emerald"
  },
  {
    id: "wordpress",
    icon: Layout,
    title: "워드프레스",
    subtitle: "WORDPRESS",
    description: "방문자를 고객으로 전환하는 웹사이트.\n빠른 속도와 완벽한 SEO를 보장합니다.",
    features: ["기술적 SEO", "UX 최적화", "고속 퍼포먼스"],
    link: "/wordpress",
    image: "/images/hero/wordpress-hero-bg.jpg",
    brandColor: "indigo"
  },
  {
    id: "performance",
    icon: TrendingUp,
    title: "퍼포먼스 마케팅",
    subtitle: "PERFORMANCE MARKETING",
    description: "모든 마케팅 성과를 숫자로 증명합니다.\n데이터 기반 최적화로 ROI 상승.",
    features: ["데이터 추적", "ROI 최적화", "성과 분석"],
    link: "/performance",
    image: "/images/hero/performance-hero-bg.jpg",
    brandColor: "orange"
  }
];

// Brand color mapping - Gradient optimized
const colorClasses = {
  blue: {
    icon: "text-blue-600",
    text: "text-blue-600",
    iconBg: "bg-blue-50",
    gradientFrom: "from-blue-50",
    gradientTo: "to-white"
  },
  emerald: {
    icon: "text-emerald-600",
    text: "text-emerald-600",
    iconBg: "bg-emerald-50",
    gradientFrom: "from-emerald-50",
    gradientTo: "to-white"
  },
  indigo: {
    icon: "text-indigo-600",
    text: "text-indigo-600",
    iconBg: "bg-indigo-50",
    gradientFrom: "from-indigo-50",
    gradientTo: "to-white"
  },
  orange: {
    icon: "text-orange-600",
    text: "text-orange-600",
    iconBg: "bg-orange-50",
    gradientFrom: "from-orange-50",
    gradientTo: "to-white"
  }
};

// Service Tab Component (Top Buttons)
function ServiceTab({ 
  service, 
  isActive, 
  onHover 
}: { 
  service: typeof services[0];
  isActive: boolean;
  onHover: () => void;
}) {
  const colors = colorClasses[service.brandColor as keyof typeof colorClasses];
  
  return (
    <button
      onMouseEnter={onHover}
      onClick={onHover}
      className={`
        relative px-6 py-3 rounded-lg text-center font-bold text-sm
        transition-all duration-300
        ${isActive 
          ? `${colors.iconBg} ${colors.text} shadow-md` 
          : 'bg-slate-800/30 text-slate-400 hover:bg-slate-700/50'
        }
      `}
    >
      {service.title}
    </button>
  );
}

// Service Content Component (Right Bottom)
function ServiceContent({ service }: { service: typeof services[0] }) {
  const [isChanging, setIsChanging] = useState(false);
  const IconComponent = service.icon;
  const colors = colorClasses[service.brandColor as keyof typeof colorClasses];
  
  useEffect(() => {
    setIsChanging(true);
    const timer = setTimeout(() => setIsChanging(false), 100);
    return () => clearTimeout(timer);
  }, [service.id]);
  
  return (
    <div className={`
      transition-opacity duration-300
      ${isChanging ? 'opacity-0' : 'opacity-100'}
    `}>
      <div className="flex flex-col gap-6">
        {/* 뱃지 */}
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${colors.iconBg} border border-slate-200 w-fit`}>
          <IconComponent className={`w-4 h-4 ${colors.icon}`} strokeWidth={2} />
          <span className={`text-xs font-semibold ${colors.text} uppercase tracking-wider`}>
            {service.subtitle}
          </span>
        </div>
        
        {/* 제목 */}
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
          {service.title}
        </h3>
        
        {/* 설명 */}
        <p className="text-base md:text-lg text-slate-300 leading-relaxed whitespace-pre-line">
          {service.description}
        </p>
        
        {/* 기능 태그 */}
        <div className="flex flex-wrap gap-2">
          {service.features.map((feature, idx) => (
            <span 
              key={idx} 
              className="px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-300 text-sm font-medium"
            >
              {feature}
            </span>
          ))}
        </div>
        
        {/* CTA */}
        <Link 
          href={service.link}
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg ${colors.iconBg} ${colors.text} text-sm font-bold hover:shadow-lg transition-all w-fit`}
        >
          자세히 보기
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export function ServicesAlternate() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  return (
    <section id="solutions" className="py-16 md:py-24 lg:py-32 relative bg-slate-950" data-section="SOLUTIONS">
      <div className="section-container">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-blue-600/10 border border-blue-500/20 mb-4 md:mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
            <span className="text-xs md:text-sm font-semibold text-blue-400 uppercase tracking-wider">서비스</span>
          </div>
          
          {/* Title */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 md:mb-6">
            {/* 모바일: 2줄 */}
            <span className="md:hidden">
              PNA가 제공하는<br/>
              핵심 마케팅 서비스
            </span>
            {/* 웹: 1줄 */}
            <span className="hidden md:inline">
              PNA가 제공하는 핵심 마케팅 서비스
            </span>
          </h2>
          
          {/* Description */}
          <p className="text-base md:text-lg text-slate-400 max-w-3xl leading-relaxed">
            구글 광고, SEO & GEO, 워드프레스, 퍼포먼스 마케팅까지 데이터 기반의 통합 솔루션을 제공합니다
          </p>
        </div>

        {/* 이미지 + 버튼/콘텐츠 레이아웃 */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* 왼쪽: 이미지 영역 (40%) */}
          <div className="relative md:w-[40%] h-64 md:h-auto flex-shrink-0 rounded-2xl overflow-hidden">
            <Image 
              src={services[activeIndex].image} 
              alt={services[activeIndex].title}
              fill 
              className="object-cover transition-opacity duration-300"
              sizes="(max-width: 768px) 100vw, 40vw"
              key={services[activeIndex].id}
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses[services[activeIndex].brandColor as keyof typeof colorClasses].gradientFrom} ${colorClasses[services[activeIndex].brandColor as keyof typeof colorClasses].gradientTo} opacity-20`} />
          </div>
          
          {/* 오른쪽: 버튼 + 콘텐츠 (60%) */}
          <div className="flex-1 md:w-[60%] flex flex-col gap-6 md:gap-8">
            {/* 상단: 서비스 버튼 가로 나열 */}
            <div className="flex flex-wrap gap-3">
              {services.map((service, index) => (
                <ServiceTab
                  key={service.id}
                  service={service}
                  isActive={activeIndex === index}
                  onHover={() => setActiveIndex(index)}
                />
              ))}
            </div>
            
            {/* 하단: 콘텐츠 */}
            <ServiceContent service={services[activeIndex]} />
          </div>
        </div>
      </div>
    </section>
  );
}
