/**
 * [Section] Services - Scroll Accordion Layout
 * [Design] Sequential reveal with scroll-based expansion
 */

"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Cpu, Globe, Layout, RefreshCw } from "lucide-react";

const services = [
  {
    id: "google-ads",
    icon: Cpu,
    title: "구글 광고",
    subtitle: "GOOGLE ADS",
    description: "AI 스마트 입찰과 정밀 타겟팅으로 광고 효율을 극대화합니다. 실시간 데이터 분석을 통해 광고비 낭비를 최소화하고 최적의 성과를 이끌어냅니다.",
    features: ["스마트 입찰 최적화", "정밀 타겟팅", "실시간 모니터링"],
    link: "/google-ads",
    image: "/images/hero/google-ads-hero-bg.jpg",
    brandColor: "blue",
    gradient: "from-blue-600/20 to-transparent"
  },
  {
    id: "seo-geo",
    icon: Globe,
    title: "SEO & GEO",
    subtitle: "SEO & GEO",
    description: "검색 엔진과 Gemini AI 결과에 동시 상위 노출되는 시맨틱 전략을 구축합니다. 데이터 기반의 정밀한 컨텐츠 최적화로 브랜드 가치를 높입니다.",
    features: ["시맨틱 SEO", "AI 검색 최적화", "브랜드 노출 확대"],
    link: "/seo-geo",
    image: "/images/hero/seo-hero-bg.jpg",
    brandColor: "emerald",
    gradient: "from-emerald-600/20 to-transparent"
  },
  {
    id: "wordpress",
    icon: Layout,
    title: "워드프레스",
    subtitle: "WORDPRESS",
    description: "기술적 SEO 최적화와 사용자 경험을 동시에 고려한 웹사이트를 구축합니다. 초고속 퍼포먼스와 완벽한 반응형 디자인으로 비즈니스 성장을 지원합니다.",
    features: ["기술적 SEO", "UX 최적화", "고속 퍼포먼스"],
    link: "/wordpress",
    image: "/images/hero/wordpress-hero-bg.jpg",
    brandColor: "indigo",
    gradient: "from-indigo-600/20 to-transparent"
  },
  {
    id: "performance",
    icon: RefreshCw,
    title: "퍼포먼스 마케팅",
    subtitle: "PERFORMANCE MARKETING",
    description: "추측을 배제하고 전 과정 데이터 추적을 통해 마케팅을 최적화합니다. 명확한 성과 지표 분석으로 지속 가능한 ROI 향상을 실현합니다.",
    features: ["데이터 추적", "ROI 최적화", "성과 분석"],
    link: "/performance",
    image: "/images/hero/performance-hero-bg.jpg",
    brandColor: "orange",
    gradient: "from-orange-600/20 to-transparent"
  },
];

// Brand color mapping
const colorClasses = {
  blue: {
    badge: "bg-blue-50",
    icon: "text-blue-600",
    text: "text-blue-700",
    border: "border-blue-500",
    button: "bg-blue-600 hover:bg-blue-700",
    iconBg: "bg-blue-100"
  },
  emerald: {
    badge: "bg-emerald-50",
    icon: "text-emerald-600",
    text: "text-emerald-700",
    border: "border-emerald-500",
    button: "bg-emerald-600 hover:bg-emerald-700",
    iconBg: "bg-emerald-100"
  },
  indigo: {
    badge: "bg-indigo-50",
    icon: "text-indigo-600",
    text: "text-indigo-700",
    border: "border-indigo-500",
    button: "bg-indigo-600 hover:bg-indigo-700",
    iconBg: "bg-indigo-100"
  },
  orange: {
    badge: "bg-orange-50",
    icon: "text-orange-600",
    text: "text-orange-700",
    border: "border-orange-500",
    button: "bg-orange-600 hover:bg-orange-700",
    iconBg: "bg-orange-100"
  }
};

// Service Card Component
function ServiceCard({ 
  service, 
  index,
  isActive,
  cardRef
}: { 
  service: typeof services[0]; 
  index: number;
  isActive: boolean;
  cardRef: (el: HTMLDivElement | null) => void;
}) {
  const [isMobile, setIsMobile] = useState(false);
  const IconComponent = service.icon;
  const colors = colorClasses[service.brandColor as keyof typeof colorClasses];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`
        relative bg-white rounded-2xl md:rounded-3xl shadow-lg overflow-hidden 
        border transition-all duration-500 ease-in-out
        ${isActive 
          ? `${colors.border} shadow-2xl` 
          : 'border-slate-200 shadow-md'
        }
      `}
      style={{
        height: isActive ? 'auto' : (isMobile ? '80px' : '100px'),
        minHeight: isActive ? 'auto' : (isMobile ? '80px' : '100px'),
        transform: isActive ? 'scale(1)' : 'scale(0.99)',
        willChange: 'height',
      }}
    >
      <div className={`grid gap-0 ${isActive ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
        {/* 왼쪽: 이미지 영역 - 축소 시 숨김 */}
        {isActive && (
          <div 
            className="relative transition-all duration-500 h-48 md:h-64 lg:h-auto min-h-[200px] md:min-h-[300px] lg:min-h-[400px]"
          >
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={index === 0}
            />
            {/* 브랜드 컬러 그라디언트 오버레이 */}
            <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient}`} />
          </div>
        )}

        {/* 오른쪽: 콘텐츠 */}
        <div className={`transition-all duration-500 ease-in-out flex items-center ${
          isActive ? 'p-6 md:p-8 lg:p-10 xl:p-12' : 'p-4 md:p-6'
        }`}>
          {isActive ? (
            // 확장 상태: 전체 콘텐츠
            <div className="flex flex-col justify-center w-full min-h-0">
              {/* 아이콘 + 서브타이틀 */}
              <div className={`inline-flex items-center gap-2 md:gap-3 px-3 py-1.5 md:px-4 md:py-2 rounded-full ${colors.badge} mb-3 md:mb-4 lg:mb-6 self-start`}>
                <IconComponent className={`w-4 h-4 md:w-5 md:h-5 ${colors.icon}`} strokeWidth={2} />
                <span className={`text-[10px] md:text-xs font-bold ${colors.text} uppercase tracking-wider`}>
                  {service.subtitle}
                </span>
              </div>

              {/* 제목 */}
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-2 md:mb-3 lg:mb-4">
                {service.title}
              </h3>

              {/* 설명 */}
              <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-3 md:mb-4 lg:mb-6">
                {service.description}
              </p>

              {/* 기능 태그 */}
              <div className="flex flex-wrap gap-2 mb-4 md:mb-6 lg:mb-8">
                {service.features.map((feature, idx) => (
                  <span 
                    key={idx}
                    className="px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs md:text-sm font-medium"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* CTA 버튼 */}
              <Link href={service.link}>
                <button className={`inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 rounded-full ${colors.button} text-white text-sm md:text-base font-semibold transition-all duration-200 hover:gap-3`}>
                  자세히 보기
                  <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" strokeWidth={2.5} />
                </button>
              </Link>
            </div>
          ) : (
            // 축소 상태: 제목만
            <div className="flex items-center justify-center gap-3 md:gap-4 w-full">
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl ${colors.iconBg} flex items-center justify-center flex-shrink-0`}>
                <IconComponent className={`w-5 h-5 md:w-6 md:h-6 ${colors.icon}`} strokeWidth={2} />
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-slate-900">{service.title}</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function ServicesAlternate() {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number>();

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        rafRef.current = requestAnimationFrame(() => {
          const viewportCenter = window.innerHeight / 2 + window.scrollY;
          
          let closestIndex = 0;
          let closestDistance = Infinity;
          
          cardRefs.current.forEach((card, index) => {
            if (!card) return;
            const rect = card.getBoundingClientRect();
            const cardCenter = rect.top + window.scrollY + rect.height / 2;
            const distance = Math.abs(cardCenter - viewportCenter);
            
            if (distance < closestDistance) {
              closestDistance = distance;
              closestIndex = index;
            }
          });
          
          setActiveCardIndex(closestIndex);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <section id="solutions" className="py-16 md:py-20 lg:py-32 pb-[40vh] md:pb-[50vh] relative bg-slate-950" data-section="SOLUTIONS">
      <div className="section-container">
        
        {/* Section Header */}
        <div className="mb-8 md:mb-12 lg:mb-16">
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

        {/* 스크롤 아코디언 카드 */}
        <div className="space-y-3 md:space-y-4">
          {services.map((service, index) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              index={index}
              isActive={activeCardIndex === index}
              cardRef={(el) => { cardRefs.current[index] = el; }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
