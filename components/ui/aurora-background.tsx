/**
 * [Component] Aurora Background - Modern Mesh Gradient
 * [Design] Dreamy, Soft, Sophisticated (Stripe/Apple Style)
 * [Performance] Pure CSS animations, no JavaScript
 */

export function AuroraBackground() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 pointer-events-none">
      {/* Blob 1 - Blue (더 진하고 덜 블러) */}
      <div 
        className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-500/40 rounded-full blur-[80px] animate-blob-slower"
        style={{ animationDelay: '0s' }}
      />
      
      {/* Blob 2 - Cyan (더 진하고 덜 블러) */}
      <div 
        className="absolute top-[20%] right-[-5%] w-[400px] h-[400px] bg-cyan-400/40 rounded-full blur-[80px] animate-blob-slow"
        style={{ animationDelay: '3s' }}
      />
      
      {/* Blob 3 - Indigo (더 진하고 덜 블러) */}
      <div 
        className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-indigo-500/35 rounded-full blur-[80px] animate-blob-slower"
        style={{ animationDelay: '6s' }}
      />
      
      {/* Blob 4 - Violet (더 진하고 덜 블러) */}
      <div 
        className="absolute top-[35%] left-[40%] w-[450px] h-[450px] bg-violet-400/35 rounded-full blur-[70px] animate-blob-slow"
        style={{ animationDelay: '9s' }}
      />

      {/* Noise Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
        }}
      />

      {/* Subtle Gradient Overlay for Depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/30" />
    </div>
  );
}
