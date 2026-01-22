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
    <div className="relative w-full overflow-hidden py-8">
      {/* Single Row - Scroll Left to Right */}
      <div className="flex animate-marquee-ltr gap-6">
        {doublePartners.map((partner, index) => {
          const isOriginal = index < partners.length;
          return (
            <div
              key={`${partner.name}-${index}`}
              className="flex-shrink-0 group"
              aria-hidden={!isOriginal}
            >
              {/* Card Container */}
              <div className="relative w-32 h-20 md:w-40 md:h-24 rounded-2xl bg-white border-2 border-slate-200 group-hover:border-blue-400 group-hover:shadow-xl transition-all duration-300 overflow-hidden">
                {/* Logo */}
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} 로고`}
                    fill
                    className="object-contain opacity-40 group-hover:opacity-70 transition-opacity duration-300 grayscale group-hover:grayscale-0 p-3"
                    style={{ mixBlendMode: 'multiply' }}
                    sizes="(max-width: 768px) 128px, 160px"
                    loading="lazy"
                  />
                </div>
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
          animation: marquee-ltr 30s linear infinite;
          will-change: transform;
        }
        .animate-marquee-ltr:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
