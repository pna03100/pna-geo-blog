/**
 * [Section] Trust & Authority - Careons Style
 * [Design] Image-focused layout with minimal icons
 * [Purpose] Build credibility through visual storytelling
 * [Animation] Lightweight fade-in on scroll
 */

"use client";

import { useEffect, useRef } from "react";
import { SectionWrapper } from "./SectionWrapper";
import Image from "next/image";

const certifications = [
  {
    title: "Google Partner",
    description: "구글 공식 인증 파트너",
    badge: "Official",
    image: "/images/hero/google-ads-hero-bg.jpg"
  },
  {
    title: "15년+ 경력",
    description: "대기업 포트폴리오 다수",
    badge: "Expert",
    image: "/images/hero/performance-hero-bg.jpg"
  },
  {
    title: "광고 법인",
    description: "15년 운영 실적",
    badge: "Trusted",
    image: "/images/hero/seo-hero-bg.jpg"
  },
];

export function ExpertiseSection() {
  const ceoCardRef = useRef<HTMLDivElement>(null);
  const certRefs = useRef<(HTMLDivElement | null)[]>([]);

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
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (ceoCardRef.current) {
      observer.observe(ceoCardRef.current);
    }

    certRefs.current.forEach((cert) => {
      if (cert) observer.observe(cert);
    });

    return () => {
      if (ceoCardRef.current) {
        observer.unobserve(ceoCardRef.current);
      }
      certRefs.current.forEach((cert) => {
        if (cert) observer.unobserve(cert);
      });
    };
  }, []);

  return (
    <SectionWrapper id="about" className="" data-section="EXPERTISE">
      {/* Badge */}
      <div className="mb-6">
        <span className="inline-flex items-center gap-2 text-blue-400 font-semibold text-sm">
          <span className="w-2 h-2 rounded-full bg-blue-400"></span>
          전문성
        </span>
      </div>

      {/* Header */}
      <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-3" style={{ lineHeight: '1.2' }}>
            실무 전문가의 직접 관리가<br/>만드는 압도적인 차이
          </h2>
        </div>
        <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-xl">
          영업 사원이 아닌 15년 차 전문가가 직접 리딩합니다
        </p>
      </div>

      {/* CEO Profile - Full Width Image Card */}
      <div 
        ref={ceoCardRef}
        className="relative rounded-3xl overflow-hidden mb-12 philosophy-item opacity-0 translate-y-4 h-[500px] md:h-[600px]"
      >
        {/* Background Image */}
        <Image
          src="/images/hero/performance-hero-bg.jpg"
          alt="CEO Profile"
          fill
          className="object-cover"
        />
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-slate-900/30" />
        
        {/* Content at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
          <div className="max-w-4xl">
            {/* Name & Title */}
            <h3 className="text-4xl md:text-5xl font-bold mb-3" style={{ lineHeight: '1.2' }}>
              안태민
            </h3>
            <p className="text-xl md:text-2xl text-blue-300 mb-6">
              대표 / 구글 광고 전문가
            </p>
            
            {/* Description */}
            <p className="text-base md:text-lg text-white/90 leading-relaxed mb-8 max-w-3xl">
              "영업 사원에게 귀사의 운명을 맡기지 마세요. 15년 차 전문가 안태민이 비즈니스의 본질에 집중한 전략을 직접 리딩합니다. 우리는 대행사가 아닌, <span className="text-blue-400 font-semibold">성장의 길을 함께 걷는 파트너</span>입니다."
            </p>
            
            {/* Achievements Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <p className="text-2xl md:text-3xl font-bold text-white mb-1">15년+</p>
                <p className="text-sm text-white/80">퍼포먼스 마케팅</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <p className="text-2xl md:text-3xl font-bold text-white mb-1">Top 100</p>
                <p className="text-sm text-white/80">구글 우수 캠페인</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <p className="text-2xl md:text-3xl font-bold text-white mb-1">500+</p>
                <p className="text-sm text-white/80">성공 프로젝트</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <p className="text-2xl md:text-3xl font-bold text-white mb-1">470억+</p>
                <p className="text-sm text-white/80">누적 광고비</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Certifications - 3-Column with Dividers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {certifications.map((cert, index) => {
          return (
            <div 
              key={cert.title} 
              ref={(el) => { certRefs.current[index] = el; }}
              className={`philosophy-item opacity-0 translate-y-4 text-center py-8 md:py-12 px-6 ${
                index !== certifications.length - 1 ? 'md:border-r border-slate-200' : ''
              }`}
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              {/* Badge */}
              <div className="mb-4 flex justify-center">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider border border-blue-200">
                  {cert.badge}
                </span>
              </div>
              
              {/* Title */}
              <h4 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3" style={{ lineHeight: '1.2' }}>
                {cert.title}
              </h4>
              
              {/* Description */}
              <p className="text-base text-slate-600 leading-relaxed">
                {cert.description}
              </p>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
