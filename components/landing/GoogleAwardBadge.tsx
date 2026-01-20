/**
 * [Component] Google Award Badge - Glass Style
 * [Design] Elegant glassmorphism badge without 3D effects
 * [Performance] Server Component (no client-side JS needed)
 */

export function GoogleAwardBadge() {
  return (
    <div className="inline-flex items-center gap-6 md:gap-8 px-10 md:px-16 py-8 md:py-12 rounded-3xl md:rounded-[2rem] bg-white/90 backdrop-blur-lg border-2 border-white/60 shadow-2xl shadow-blue-500/10 relative overflow-hidden">
      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/40 via-indigo-50/30 to-purple-50/40 pointer-events-none" />
      
      {/* Light Reflection - Top */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/50 to-transparent pointer-events-none" />

      {/* Trophy Icon with Glass Circle */}
      <div className="flex items-center justify-center w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-blue-50/80 to-indigo-50/80 backdrop-blur-sm relative border border-white/40 shadow-lg">
        {/* Subtle Glow */}
        <div className="absolute inset-0 rounded-full bg-blue-400/10 blur-xl" />
        <span className="text-5xl md:text-7xl relative z-10 drop-shadow-sm">🏆</span>
      </div>
      
      {/* Text Content */}
      <div className="text-left relative z-10">
        <p className="text-xl md:text-3xl font-bold text-slate-900 mb-2 drop-shadow-sm">
          2023 Google Top 100 Campaign
        </p>
        <p className="text-base md:text-lg text-slate-600 font-medium">구글 공식 인증 우수 캠페인 선정</p>
      </div>

      {/* Light Reflection - Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/30 to-transparent pointer-events-none" />
    </div>
  );
}
