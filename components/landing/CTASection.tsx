/**
 * [Section] CTA - Call to Action
 * [Design] Centered CTA with background image
 */

"use client";

import Link from "next/link";
import Image from "next/image";

export function CTASection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden" data-section="CTA">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/performance-hero-bg.jpg"
          alt="CTA Background"
          fill
          className="object-cover"
          quality={90}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-slate-900/95"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="text-center">
          {/* Title */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight" style={{ lineHeight: '1.3' }}>
            <span className="text-white">이제, 성과가 나는 구조를</span>
            <br />
            <span className="text-blue-400">설계할 차례입니다.</span>
          </h2>

          {/* Description */}
          <p className="text-base md:text-lg text-slate-300 mb-8 tracking-normal max-w-2xl mx-auto" style={{ lineHeight: '1.7' }}>
            단순한 광고 운영이 아닌,<br className="md:hidden" />
            비즈니스 성장을 위한 그로스 시스템을 경험해보세요.
          </p>

          {/* CTA Button */}
          <div className="mb-12">
            <Link href="/contact" className="btn-primary text-lg">
              무료 상담 시작하기
            </Link>
          </div>

          {/* Service Tags */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs md:text-sm font-semibold text-slate-400 uppercase tracking-wider">
            <span>GOOGLE ADS</span>
            <span className="text-slate-600">•</span>
            <span>SEO & GEO</span>
            <span className="text-slate-600">•</span>
            <span>HEADLESS WORDPRESS</span>
            <span className="text-slate-600">•</span>
            <span>PERFORMANCE MARKETING</span>
          </div>
        </div>
      </div>
    </section>
  );
}
