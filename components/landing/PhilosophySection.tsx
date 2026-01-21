/**
 * [Section] Philosophy & Process - Open Air Layout
 * [Design] NO CARDS - Icons and text float freely with generous whitespace
 * [Purpose] Show core values and working methodology
 * [Animation] Lightweight fade-in on scroll with Intersection Observer
 */

"use client";

import { useRef, useState, useEffect } from "react";
import { Target, TrendingUp, Users, Zap } from "lucide-react";
import Image from "next/image";

const principles = [
  {
    icon: Target,
    title: "데이터 중심 의사결정",
    description: "직관이 아닌 측정 가능한 지표로 모든 전략을 수립합니다",
    image: "/images/hero/seo-hero-bg.jpg"
  },
  {
    icon: TrendingUp,
    title: "지속 가능한 성장",
    description: "단기 성과가 아닌 장기적 관점의 비즈니스 성장을 추구합니다",
    image: "/images/hero/google-ads-hero-bg.jpg"
  },
  {
    icon: Users,
    title: "투명한 소통",
    description: "실시간 리포트와 1:1 전담 매니저로 완벽한 투명성을 보장합니다",
    image: "/images/hero/performance-hero-bg.jpg"
  },
  {
    icon: Zap,
    title: "빠른 최적화",
    description: "24/7 모니터링과 즉각적인 개선으로 광고 효율을 극대화합니다",
    image: "/images/hero/wordpress-hero-bg.jpg"
  },
  {
    icon: Target,
    title: "전략적 파트너십",
    description: "단순한 대행사가 아닌 비즈니스 성장 파트너로 함께합니다",
    image: "/images/hero/company-hero-bg.jpg"
  },
];

export function PhilosophySection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState(2); // 중앙 카드(3번째)로 시작
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();

  // 카드를 중앙으로 스크롤
  const scrollToCard = (index: number) => {
    if (!scrollRef.current) return;
    
    isScrollingRef.current = true;
    setFocusedIndex(index);
    
    const container = scrollRef.current;
    const cardWidth = 320 + 24; // w-80 (320px) + gap-6 (24px)
    const padding = parseFloat(getComputedStyle(container).paddingLeft);
    
    // 카드의 중앙이 컨테이너 중앙에 오도록 계산
    const targetScroll = (index * cardWidth) + padding - (container.offsetWidth / 2) + (cardWidth / 2);
    
    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
    
    // 스크롤 완료 후 플래그 해제
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 500);
  };

  // 스크롤 시 중앙 카드 감지 (수동 스크롤만)
  const handleScroll = () => {
    if (!scrollRef.current || isScrollingRef.current) return;
    
    const container = scrollRef.current;
    const cardWidth = 320 + 24;
    const padding = parseFloat(getComputedStyle(container).paddingLeft);
    
    // 컨테이너 중앙 위치
    const containerCenter = container.scrollLeft + (container.offsetWidth / 2);
    
    // 중앙에 있는 카드 인덱스 계산
    const newIndex = Math.round((containerCenter - padding - (cardWidth / 2)) / cardWidth);
    const clampedIndex = Math.max(0, Math.min(newIndex, principles.length - 1));
    
    if (clampedIndex !== focusedIndex) {
      setFocusedIndex(clampedIndex);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    let newIndex;
    if (direction === 'left') {
      newIndex = focusedIndex - 1;
      if (newIndex < 0) newIndex = principles.length - 1; // 무한 롤링
    } else {
      newIndex = focusedIndex + 1;
      if (newIndex >= principles.length) newIndex = 0; // 무한 롤링
    }
    
    scrollToCard(newIndex);
  };

  // 초기 마운트 시 중앙 카드를 중앙에 배치
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToCard(2); // 3번째 카드(인덱스 2)를 중앙에 배치
    }, 100);
    
    return () => {
      clearTimeout(timer);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* [Careons] SECTION: How you can help */}
      <section data-section="PHILOSOPHY" className="relative py-20 md:py-32">
      
      {/* Header - Inside Container */}
      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative">
        
        {/* [Careons] Small Badge */}
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            우리의 일하는 방식
          </span>
        </div>
        
        {/* Section Header */}
        <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-3" style={{ lineHeight: '1.2' }}>
              함께 만드는 성공
            </h2>
          </div>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-xl">
            15년간 검증된 원칙으로 고객의 성공을 보장합니다
          </p>
        </div>
      </div>

        {/* [Careons] Horizontal Scroll Cards - Full Width */}
        <div className="relative w-full">
          {/* Left Fade Mask */}
          <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
          
          {/* Right Fade Mask */}
          <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />
          
          {/* Cards Container - Smooth Scroll with Focus Effect */}
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
            style={{
              paddingLeft: 'calc(50vw - 160px)',
              paddingRight: 'calc(50vw - 160px)',
            }}
          >
            {principles.map((principle, index) => {
              const Icon = principle.icon;
              const distance = Math.abs(index - focusedIndex);
              const isFocused = distance === 0;
              
              // 중앙에서 멀어질수록 블러 증가
              const blurAmount = distance * 2; // 0, 2, 4, 6, 8
              const scale = isFocused ? 1 : Math.max(0.85, 1 - distance * 0.05);
              const opacity = Math.max(0.4, 1 - distance * 0.2);
              
              return (
                <div 
                  key={`${principle.title}-${index}`}
                  className="flex-none w-72 md:w-80 transition-all duration-300 ease-out cursor-pointer"
                  onClick={() => scrollToCard(index)}
                  style={{
                    transform: `scale(${scale})`,
                    opacity: opacity,
                    filter: `blur(${blurAmount}px)`,
                  }}
                >
                  <div className="relative overflow-hidden rounded-3xl aspect-[3/4] shadow-xl">
                    
                    {/* [Careons] Real Image Background */}
                    <Image
                      src={principle.image}
                      alt={principle.title}
                      fill
                      className="object-cover"
                    />
                    
                    {/* [Careons] Gradient Overlay - Bottom to Top */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="inline-flex w-12 h-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm mb-4">
                        <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                      </div>
                      
                      <h3 className="text-xl md:text-2xl font-bold mb-2 leading-tight">
                        {principle.title}
                      </h3>
                      
                      <p className="text-sm text-white/90 leading-relaxed">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Navigation Buttons - Below Cards */}
          <div className="flex justify-center gap-4 mt-8">
            <button 
              onClick={() => scroll('left')}
              className="p-3 rounded-full border-2 border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all"
              aria-label="이전"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-3 rounded-full border-2 border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all"
              aria-label="다음"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
    </section>
    </>
  );
}
