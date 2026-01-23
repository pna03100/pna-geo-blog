/**
 * [Section] Problems - Sticky Title Layout
 * [Design] Left sticky title + Right scrolling cards
 */

"use client";

import Image from "next/image";
import { useScrollReveal } from "@/lib/hooks/useScrollReveal";
import { useEffect, useRef } from "react";

const problems = [
  {
    number: "01",
    title: "비효율적 예산 집행",
    subtitle: "ROAS Stagnation",
    description: "광고비를 2배로 늘려도 매출은 2배가 되지 않습니다. 성과 한계선(Marginal Utility)을 돌파할 구조 없이 예산만 증액하는 것은 밑 빠진 독에 물 붓기입니다.",
    image: "/images/hero/performance-hero-bg.jpg"
  },
  {
    number: "02",
    title: "AI 검색 시대의 고립",
    subtitle: "Invisible in AI Search (GEO)",
    description: "검색의 패러다임이 생성형 AI(ChatGPT, SearchGPT)로 이동했습니다. 기존의 키워드 SEO만으로는 더 이상 고객의 질문에 답변할 수 없습니다.",
    image: "/images/hero/seo-hero-bg.jpg"
  },
  {
    number: "03",
    title: "전환이 없는 웹사이트",
    subtitle: "Broken Conversion Funnel",
    description: "유입된 고객이 구매까지 이어지지 않습니다. 심미적인 디자인에 치중해 설득과 전환을 위한 UX/UI 설계가 부재하기 때문입니다.",
    image: "/images/hero/wordpress-hero-bg.jpg"
  },
  {
    number: "04",
    title: "데이터 결정 장애",
    subtitle: "Data Paralysis",
    description: "GA4와 광고 관리자에 수많은 데이터가 쌓이지만, 정작 '다음 행동'을 결정하지 못합니다. 인사이트를 추출하는 의사결정 시스템이 없습니다.",
    image: "/images/hero/company-hero-bg.jpg"
  }
];

export function ProblemsSection() {
  const leftRef = useScrollReveal("active", { threshold: 0.35, once: true });
  const rightRef = useScrollReveal("active", { threshold: 0.35, once: true });
  const mobileCardsRef = useRef<HTMLDivElement>(null);

  // 모바일 카드 스크롤 트리거
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.innerWidth > 768) return; // 모바일만

    const cards = mobileCardsRef.current?.querySelectorAll('.problem-card-mobile');
    if (!cards) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative bg-white pt-20 pb-20 md:pt-32 md:pb-32 rounded-t-[40px] md:rounded-t-[60px] z-10" data-section="PROBLEMS">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Grid Layout for Sticky */}
        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-8 md:gap-12 lg:gap-20">
          
          {/* Left Column: Sticky Title (모바일에서는 sticky 제거) - 모바일 최적화 */}
          <div 
            ref={leftRef as React.RefObject<HTMLDivElement>}
            className="reveal-depth-left lg:sticky lg:top-36 lg:self-start lg:h-fit mb-8 md:mb-0"
          >
            <div className="badge-dot mb-4 md:mb-6 text-xs md:text-sm">
              The Structural Problem
            </div>
            
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-900 mb-4 md:mb-6 tracking-tight" style={{ lineHeight: '1.3' }}>
              구글 광고를 운영해도<br/>
              <span className="text-slate-400">성과가 나지 않는</span><br/>
              구조적 이유
            </h2>
            
            <p className="text-sm md:text-base lg:text-lg text-slate-600 tracking-normal" style={{ lineHeight: '1.7' }}>
              마케팅 예산을 늘려도 효율은 제자리걸음입니다. 이것은 단순한 운영의 문제가 아니라, 비즈니스를 지탱하는 '구조'의 결함입니다.
            </p>
          </div>

          {/* Right Column: Scrolling Problem Cards - 모바일 2x2 그리드 */}
          <div 
            ref={(el) => {
              if (rightRef && 'current' in rightRef) {
                (rightRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
              }
              if (mobileCardsRef) {
                mobileCardsRef.current = el;
              }
            }}
            className="reveal-depth-right"
          >
            {/* 모바일: 2x2 그리드 / 데스크톱: 세로 리스트 */}
            <div className="grid grid-cols-2 md:grid-cols-1 gap-4 md:gap-0 md:space-y-20 lg:space-y-24">
              {problems.map((problem, index) => (
                <div key={index} className="md:contents">
                  {/* 모바일: 카드 형태 */}
                  <div 
                    className={`md:hidden flex flex-col gap-3 problem-card-mobile ${
                      index % 2 === 0 ? 'reveal-fade-up-mobile-left' : 'reveal-fade-up-mobile-right'
                    }`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 shadow-sm">
                      <Image
                        src={problem.image}
                        alt={problem.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-[10px] text-blue-600 font-bold mb-1 tracking-widest">{problem.number}</p>
                      <h3 className="text-sm font-bold text-slate-900 mb-1 tracking-tight leading-tight">
                        {problem.title}
                      </h3>
                      <p className="text-xs text-blue-600 font-semibold tracking-wide">{problem.subtitle}</p>
                    </div>
                  </div>

                  {/* 데스크톱: 기존 레이아웃 */}
                  <div className="hidden md:block">
                    <div className="grid grid-cols-[1fr,300px] gap-8 items-start">
                      <div>
                        <p className="text-sm text-blue-600 font-bold mb-3 tracking-widest">{problem.number}</p>
                        <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-3 tracking-tight leading-tight">
                          {problem.title}
                        </h3>
                        <p className="text-base text-blue-600 font-semibold mb-4 tracking-wide">{problem.subtitle}</p>
                        <p className="text-base text-slate-600 leading-relaxed">
                          {problem.description}
                        </p>
                      </div>
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 shadow-sm">
                        <Image
                          src={problem.image}
                          alt={problem.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    
                    {index < problems.length - 1 && (
                      <div className="mt-20 lg:mt-24">
                        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
