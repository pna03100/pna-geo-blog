/**
 * [Component] Logo Marquee - Double Row Infinite Scroll
 * [Design] Two rows scrolling in opposite directions
 * [Performance] CSS Transform Only (GPU Accelerated)
 */

"use client";

export function LogoMarquee() {
  const partnersRow1 = [
    { name: "삼성전자", logo: "🔷" },
    { name: "현대자동차", logo: "🚗" },
    { name: "LG전자", logo: "🔴" },
    { name: "SK하이닉스", logo: "⚡" },
    { name: "네이버", logo: "🟢" },
    { name: "카카오", logo: "💬" },
  ];

  const partnersRow2 = [
    { name: "한화시스템", logo: "🟠" },
    { name: "대보건설", logo: "🏗️" },
    { name: "Google", logo: "🔴" },
    { name: "Meta", logo: "🔵" },
    { name: "쿠팡", logo: "🟣" },
    { name: "배달의민족", logo: "🍱" },
  ];

  // Triple for seamless loop
  const tripleRow1 = [...partnersRow1, ...partnersRow1, ...partnersRow1];
  const tripleRow2 = [...partnersRow2, ...partnersRow2, ...partnersRow2];

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-slate-50 via-white to-slate-50 py-8 space-y-8">
      {/* Gradient Fade on Sides */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      {/* Row 1 - Scroll Left to Right */}
      <div className="flex animate-marquee-ltr">
        {tripleRow1.map((partner, index) => (
          <div
            key={`row1-${partner.name}-${index}`}
            className="flex-shrink-0 mx-8 md:mx-12 transition-all duration-300 hover:scale-110 group"
          >
            <div className="flex flex-col items-center gap-2 grayscale hover:grayscale-0 transition-all">
              <div className="text-5xl md:text-6xl opacity-60 group-hover:opacity-100 transition-opacity">
                {partner.logo}
              </div>
              <span className="text-xs md:text-sm font-semibold text-slate-400 group-hover:text-slate-700 transition-colors">
                {partner.name}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Row 2 - Scroll Right to Left */}
      <div className="flex animate-marquee-rtl">
        {tripleRow2.map((partner, index) => (
          <div
            key={`row2-${partner.name}-${index}`}
            className="flex-shrink-0 mx-8 md:mx-12 transition-all duration-300 hover:scale-110 group"
          >
            <div className="flex flex-col items-center gap-2 grayscale hover:grayscale-0 transition-all">
              <div className="text-5xl md:text-6xl opacity-60 group-hover:opacity-100 transition-opacity">
                {partner.logo}
              </div>
              <span className="text-xs md:text-sm font-semibold text-slate-400 group-hover:text-slate-700 transition-colors">
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
        @keyframes marquee-rtl {
          0% {
            transform: translateX(-33.333%);
          }
          100% {
            transform: translateX(0);
          }
        }
        .animate-marquee-ltr {
          animation: marquee-ltr 30s linear infinite;
        }
        .animate-marquee-ltr:hover {
          animation-play-state: paused;
        }
        .animate-marquee-rtl {
          animation: marquee-rtl 30s linear infinite;
        }
        .animate-marquee-rtl:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
