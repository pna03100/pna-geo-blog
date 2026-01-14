/**
 * [Component] Logo Marquee - Double Row Infinite Scroll
 * [Design] Two rows scrolling in opposite directions
 * [Performance] CSS Transform Only (GPU Accelerated)
 */

"use client";

export function LogoMarquee() {
  const partners = [
    { name: "삼성전자", logo: "🔷" },
    { name: "한화시스템", logo: "🟠" },
    { name: "대보건설", logo: "🏗️" },
    { name: "Google", logo: "🔴" },
    { name: "네이버", logo: "🟢" },
    { name: "카카오", logo: "💬" },
  ];

  // Triple for seamless loop
  const triplePartners = [...partners, ...partners, ...partners];

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-slate-50 via-white to-slate-50 py-8">
      {/* Gradient Fade on Sides */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      {/* Single Row - Scroll Left to Right */}
      <div className="flex animate-marquee-ltr">
        {triplePartners.map((partner, index) => (
          <div
            key={`${partner.name}-${index}`}
            className="flex-shrink-0 mx-12 md:mx-16 transition-all duration-300 hover:scale-110 group"
          >
            <div className="flex flex-col items-center gap-3 grayscale hover:grayscale-0 transition-all">
              <div className="text-6xl md:text-7xl opacity-60 group-hover:opacity-100 transition-opacity">
                {partner.logo}
              </div>
              <span className="text-sm md:text-base font-semibold text-slate-400 group-hover:text-slate-700 transition-colors">
                {partner.name}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes marquee-ltr {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-marquee-ltr {
          animation: marquee-ltr 40s linear infinite;
        }
        .animate-marquee-ltr:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
