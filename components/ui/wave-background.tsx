/**
 * [Component] Video Background
 * [Performance] Optimized video with overlay
 */

"use client";

export function WaveBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-slate-900">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          transform: 'translateZ(0) scaleX(-1)',
          willChange: 'transform',
          objectPosition: 'top center',
          filter: 'brightness(1.15) contrast(1.1)'
        }}
      >
        <source src="/hero-background.mp4" type="video/mp4" />
      </video>

      {/* Lighter Gradient Overlay with Better Contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/30 to-slate-900/50" />
      
      {/* Subtle Blue Tint Overlay */}
      <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply" />
      
      {/* Film Grain Effect */}
      <div 
        className="absolute inset-0 opacity-[0.85] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.4' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '120px 120px'
        }}
      />
    </div>
  );
}
