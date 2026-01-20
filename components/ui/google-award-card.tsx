/**
 * [Component] Google Award Badge - Glass Badge Style
 * [Purpose] Highlight "2023 Google Top 100 Campaign" Achievement
 * [Design] Elegant glassmorphism badge without 3D effects
 */

export function GoogleAwardCard() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Subtle Background Glow */}
      <div className="absolute -inset-6 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />

      {/* Glass Badge Container */}
      <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl md:rounded-[2rem] p-8 md:p-10 overflow-hidden border-2 border-white/60 shadow-2xl">
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-purple-50/50 pointer-events-none" />
        
        {/* Light Reflection Effect */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Trophy */}
          <div className="relative mb-6">
            <div className="text-7xl md:text-8xl drop-shadow-lg">🏆</div>
            {/* Trophy Glow */}
            <div className="absolute inset-0 bg-yellow-400/30 rounded-full blur-2xl -z-10" />
          </div>

          {/* Google Colors Divider */}
          <div className="flex gap-2 mb-6">
            <div className="w-10 h-1 bg-blue-500 rounded-full shadow-sm" />
            <div className="w-10 h-1 bg-red-500 rounded-full shadow-sm" />
            <div className="w-10 h-1 bg-yellow-500 rounded-full shadow-sm" />
            <div className="w-10 h-1 bg-green-500 rounded-full shadow-sm" />
          </div>

          {/* Year Badge */}
          <div className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 mb-5 shadow-lg">
            <span className="text-base md:text-lg font-bold text-white">2023</span>
          </div>

          {/* Title with Gradient */}
          <h3 className="text-3xl md:text-4xl font-bold mb-3 leading-tight text-center">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-sm">
              구글 100대
              <br />
              우수 캠페인 선정
            </span>
          </h3>

          {/* Subtitle */}
          <p className="text-sm md:text-base text-slate-600 font-semibold text-center tracking-wide">
            GOOGLE OFFICIAL RECOGNITION
          </p>
        </div>

        {/* Bottom Glass Reflection */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/30 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
