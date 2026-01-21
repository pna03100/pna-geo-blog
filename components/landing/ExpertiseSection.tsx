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
      <div className="mb-12 md:mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4" style={{ lineHeight: '1.2' }}>
          검증된 전문성
        </h2>
        <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl">
          대한민국 대표 기업들이 선택한 데이터 마케팅 파트너
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
              Founder & CEO
            </p>
            
            {/* Description */}
            <p className="text-base md:text-lg text-white/90 leading-relaxed mb-8 max-w-3xl">
              15년간 대기업부터 스타트업까지 다양한 비즈니스와 함께하며 쌓아온 경험과 노하우를 바탕으로, 
              데이터에 기반한 전략적 마케팅 솔루션을 제공합니다.
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

      {/* Certifications - 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {certifications.map((cert, index) => {
          return (
            <div 
              key={cert.title} 
              ref={(el) => { certRefs.current[index] = el; }}
              className="group relative rounded-2xl overflow-hidden philosophy-item opacity-0 translate-y-4 h-[300px]"
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              {/* Background Image */}
              <Image
                src={cert.image}
                alt={cert.title}
                fill
                className="object-cover"
              />
              
              {/* Overlay - lighter on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-slate-900/50 group-hover:from-slate-900/70 group-hover:to-slate-900/30 transition-all duration-300" />
              
              {/* Content at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-3 border border-blue-400/30">
                  {cert.badge}
                </span>
                <h4 className="text-xl font-bold text-white mb-2" style={{ lineHeight: '1.3' }}>
                  {cert.title}
                </h4>
                <p className="text-sm text-white/80 leading-relaxed">
                  {cert.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
