/**
 * [Section] Hero - Server Component
 * [Performance] H1(LCP 요소)이 서버 렌더링 → CSS만으로 즉시 페인트
 * Canvas 애니메이션은 dynamic(ssr:false)로 크리티컬 JS에서 분리
 */

import dynamic from "next/dynamic";
import { HeroReveal } from "./HeroReveal";
import { HeroButtons } from "./HeroButtons";
import { ScrollIndicator } from "./ScrollIndicator";

// Canvas 애니메이션: dynamic()으로 별도 청크 분리 (simplex-noise ~15KB 크리티컬 번들에서 제외)
const HeroCanvas = dynamic(
  () => import("./HeroCanvas").then((mod) => mod.HeroCanvas),
);

export function HeroSectionFinal() {
  return (
    <>
      <section
        data-section="HERO"
        className="sticky top-0 w-full h-screen z-0 bg-[#0a0f1e]"
      >
        {/* Mobile gradient (서버 렌더링, 즉시 표시) */}
        <div
          className="absolute inset-0 z-0 md:hidden"
          style={{
            background:
              "linear-gradient(180deg, #0a0f1e 0%, #0d1530 30%, #111a3a 60%, #0a0f1e 100%)",
          }}
        />

        {/* Film Grain Overlay (서버 렌더링, 즉시 표시) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 5,
            opacity: 0.9,
            mixBlendMode: "overlay",
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='5.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "100px 100px",
          }}
        />

        {/* Desktop canvas animation (lazy, ssr:false — simplex-noise 번들 분리) */}
        <HeroCanvas />

        {/* Content — 서버 렌더링, H1이 CSS만으로 즉시 페인트 */}
        <div className="relative z-10 h-screen flex flex-col items-start justify-end pb-20 md:pb-24 lg:pb-32">
          <div className="section-container relative max-w-7xl w-full">
            <div className="max-w-3xl">
              {/* Slogan */}
              <p className="text-base md:text-lg lg:text-xl text-blue-200/80 font-light mb-4 md:mb-6 tracking-wide">
                Data-Driven Growth Partner, PNA
              </p>

              {/* Main Title — LCP 요소, 서버 렌더링 */}
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 text-white"
                style={{ lineHeight: "1.25" }}
              >
                구글 광고 대행사
                <br />
                피앤에이컴퍼니
              </h1>

              {/* Description + CTA — 클라이언트 애니메이션 */}
              <HeroReveal>
                <p
                  className="text-lg md:text-xl lg:text-2xl text-blue-100/90 leading-relaxed mb-8 md:mb-10 hero-item-1"
                  style={{ maxWidth: "600px" }}
                >
                  Google Ads, SEO & GEO, Headless WordPress를 하나의 유기적인
                  성장 엔진으로 통합 설계합니다.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 hero-item-2">
                  <HeroButtons />
                </div>
              </HeroReveal>
            </div>

            {/* Award Badge - Bottom Right */}
            <div className="absolute bottom-8 right-8 hidden lg:block hero-item-3">
              <div className="text-right">
                <p className="text-sm text-blue-200/80 mb-1">Trusted by</p>
                <p className="text-xs text-blue-300/60">
                  2023 Google Korea Top 100 Campaign
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </>
  );
}
