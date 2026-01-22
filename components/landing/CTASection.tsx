/**
 * [Section] CTA - Call to Action
 * [Design] Centered CTA with button
 */

"use client";

import Link from "next/link";

export function CTASection() {
  return (
    <section className="relative py-20 md:py-32 bg-white" data-section="CTA">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="text-center">
          {/* Title */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight" style={{ lineHeight: '1.3' }}>
            <span className="text-slate-900">이제, 성과가 나는 구조를</span>
            <br />
            <span className="text-blue-600">설계할 차례입니다.</span>
          </h2>

          {/* Description */}
          <p className="text-base md:text-lg text-slate-600 mb-8 tracking-normal max-w-2xl mx-auto" style={{ lineHeight: '1.7' }}>
            단순한 광고 운영이 아닌,<br className="md:hidden" />
            비즈니스 성장을 위한 그로스 시스템을 경험해보세요.
          </p>

          {/* CTA Button */}
          <div className="mb-12">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/30 transition-all duration-200 active:scale-[0.98]"
            >
              무료 전략 상담 받기
            </Link>
          </div>

          {/* Service Tags */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs md:text-sm font-semibold text-slate-400 uppercase tracking-wider">
            <span>GOOGLE ADS</span>
            <span className="text-slate-300">•</span>
            <span>SEO & GEO</span>
            <span className="text-slate-300">•</span>
            <span>HEADLESS WORDPRESS</span>
            <span className="text-slate-300">•</span>
            <span>PERFORMANCE OPTIMIZATION</span>
          </div>
        </div>
      </div>
    </section>
  );
}
