/**
 * [Component] Keyword Ticker - Subtle Text Rolling
 * [Design] No background, just elegant text scrolling
 * [Performance] CSS Transform Only
 */

"use client";

export function KeywordTicker() {
  const keywords = [
    "DATA DRIVEN",
    "GOOGLE ADS",
    "SEO & GEO",
    "ROAS 500%",
    "AI MARKETING",
    "PERFORMANCE",
    "GA4 ANALYSIS",
    "WORDPRESS",
    "CONVERSION",
  ];

  // Triple for seamless loop
  const tripleKeywords = [...keywords, ...keywords, ...keywords];

  return (
    <div className="relative w-full overflow-hidden py-6 md:py-8">
      {/* Fade Out Edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      
      {/* Ticker Container */}
      <div className="flex animate-ticker-slow whitespace-nowrap">
        {tripleKeywords.map((keyword, index) => (
          <div key={`${keyword}-${index}`} className="flex items-center flex-shrink-0">
            <span className="text-slate-300 font-bold text-base md:text-lg tracking-[0.2em] px-6 md:px-10 uppercase transition-colors hover:text-blue-400">
              {keyword}
            </span>
            <span className="text-slate-200 text-xs">●</span>
          </div>
        ))}
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes ticker-slow {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-ticker-slow {
          animation: ticker-slow 35s linear infinite;
        }
        .animate-ticker-slow:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
