/**
 * [Section] Google Award - Push-up Animation
 * [Design] Pushes hero section upward as user scrolls
 * [Animation] Smooth translateY from bottom
 */

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function ScrollAwardSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate translateY - starts below viewport and moves up quickly
  const startScroll = 100; // Start animation early
  const maxScroll = 500; // Complete animation quickly
  const scrollProgress = Math.max(0, Math.min((scrollY - startScroll) / (maxScroll - startScroll), 1));
  const translateY = (1 - scrollProgress) * 30; // Start at 30vh, move to 0 (very short distance)

  return (
    <section 
      className="relative will-change-transform" 
      style={{
        transform: `translateY(${translateY}vh)`,
        transition: 'transform 0.1s ease-out'
      }}
    >
      <div className="py-20 md:py-32" style={{ backgroundColor: '#F0F1F2' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          
          {/* [Careons] Right - Image (swapped position) */}
          <div className="relative order-2 lg:order-2">
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
              {/* Image placeholder - 트로피와 Google 로고 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-4">🏆</div>
                  <div className="px-8 py-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl">
                    <p className="text-2xl font-bold text-slate-900">Google Partner</p>
                    <p className="text-lg text-blue-600 font-semibold">Top 100 Campaign 2023</p>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-10 right-10 w-32 h-32 bg-slate-300/30 rounded-full blur-3xl" />
              <div className="absolute bottom-10 left-10 w-40 h-40 bg-slate-200/40 rounded-full blur-3xl" />
            </div>
          </div>
          
          {/* [Careons] Left - Content (swapped position) */}
          <div className="order-1 lg:order-1">
            
            {/* Small Badge */}
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                Google Award
              </span>
            </div>
            
            {/* Title */}
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4" style={{ lineHeight: '1.2' }}>
              2023 Google Top 100 Campaign
            </h2>
            
            {/* Description */}
            <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-6">
              구글 공식 파트너로서 <span className="text-blue-600 font-semibold">2023년 Top 100 Campaign</span>에 선정되었습니다. 15년간 축적된 노하우와 데이터 기반 전략으로 고객의 성공을 만들어갑니다.
            </p>
            
            {/* CTA Button */}
            <Link href="/about">
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-slate-200 text-slate-900 font-semibold hover:border-blue-400 hover:bg-blue-50 transition-all duration-200">
                <span>자세히 보기</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </Link>
          </div>
          
        </div>
        </div>
      </div>
    </section>
  );
}
