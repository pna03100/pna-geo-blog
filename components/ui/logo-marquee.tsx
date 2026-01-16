/**
 * [Component] Logo Marquee - Infinite Scroll (Optimized)
 * [Design] Single row scrolling with duplicates
 * [Performance] CSS Transform + aria-hidden + lazy loading
 */

"use client";

import Image from "next/image";

export function LogoMarquee() {
  const partners = [
    { name: "삼성전자", logo: "/images/partners/samsung.jpg" },
    { name: "현대자동차", logo: "/images/partners/hyundai.jpg" },
    { name: "Google", logo: "/images/partners/google.jpg" },
    { name: "네이버", logo: "/images/partners/naver.jpg" },
    { name: "카카오", logo: "/images/partners/kakao.jpg" },
    { name: "유튜브", logo: "/images/partners/youtube.jpg" },
    { name: "KCB", logo: "/images/partners/kcb.jpg" },
    { name: "LG유플러스", logo: "/images/partners/lg-uplus.jpg" },
    { name: "SK브로드밴드", logo: "/images/partners/sk-broadband.jpg" },
    { name: "당근마켓", logo: "/images/partners/danggeun.jpg" },
  ];

  // Double for seamless loop (first set visible, second set for aria-hidden)
  const doublePartners = [...partners, ...partners];

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-slate-50 via-white to-slate-50 py-12">
      {/* Gradient Fade on Sides */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      {/* Single Row - Scroll Left to Right */}
      <div className="flex animate-marquee-ltr">
        {doublePartners.map((partner, index) => {
          const isOriginal = index < partners.length;
          return (
            <div
              key={`${partner.name}-${index}`}
              className="flex-shrink-0 mx-8 md:mx-12 transition-all duration-300 hover:scale-110 group"
              aria-hidden={!isOriginal}
            >
              <div className="flex flex-col items-center gap-3 grayscale hover:grayscale-0 transition-all">
                <div className="relative w-24 h-24 md:w-32 md:h-32 opacity-60 group-hover:opacity-100 transition-opacity">
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} 로고`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 96px, 128px"
                    loading="lazy"
                  />
                </div>
                <span className="text-xs md:text-sm font-semibold text-slate-400 group-hover:text-slate-700 transition-colors">
                  {partner.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes marquee-ltr {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee-ltr {
          animation: marquee-ltr 40s linear infinite;
          will-change: transform;
        }
        .animate-marquee-ltr:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
