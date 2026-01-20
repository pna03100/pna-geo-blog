/**
 * [Component] Google Award Card - Graphic Visual Design
 * [Purpose] Highlight "2023 Google Top 100 Campaign" Achievement
 */

export function GoogleAwardCard() {
  return (
    <div className="relative w-full max-w-md mx-auto md:mx-0 md:ml-auto">
      {/* Main Card with Gradient Border */}
      <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-3xl p-8 md:p-10 border-2 border-white/10 shadow-2xl shadow-blue-500/20">
        
        {/* Decorative Corner Accent */}
        <div className="absolute -top-3 -right-3 w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full blur-2xl opacity-40" />
        <div className="absolute -bottom-3 -left-3 w-32 h-32 bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-full blur-2xl opacity-30" />
        
        {/* Content - Center Aligned */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Google Logo Colors Bar */}
          <div className="flex gap-1 mb-6 w-full">
            <div className="h-1 flex-1 bg-blue-500 rounded-full" />
            <div className="h-1 flex-1 bg-red-500 rounded-full" />
            <div className="h-1 flex-1 bg-yellow-500 rounded-full" />
            <div className="h-1 flex-1 bg-green-500 rounded-full" />
          </div>

          {/* Trophy Icon with Glow */}
          <div className="relative flex items-center justify-center w-20 h-20 md:w-24 md:h-24 mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl blur-xl opacity-60" />
            <div className="relative text-5xl md:text-6xl">🏆</div>
          </div>

          {/* Year Badge */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-4">
            <span className="text-sm md:text-base font-bold text-white">2023</span>
          </div>

          {/* Title */}
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight text-center">
            구글 100대
            <br />
            우수 캠페인 선정
          </h3>

          {/* Subtitle */}
          <p className="text-sm md:text-base text-white/70 font-medium text-center">
            Google Official Recognition
          </p>

          {/* Bottom Accent Line */}
          <div className="mt-6 h-1 w-20 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full" />
        </div>
      </div>
    </div>
  );
}
