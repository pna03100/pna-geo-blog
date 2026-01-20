/**
 * [Component] Hero Background - Apple-style Gradient Mesh
 * [Design] Ultra-smooth, premium gradient mesh like Apple.com
 * [Performance] Pure CSS animations, no JS overhead
 */

export function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Apple-style Gradient Mesh */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        
        {/* Blob 1 - Top Left - Slow float */}
        <div
          className="absolute bg-blob-1"
          style={{
            top: '-20%',
            left: '-10%',
            width: '60%',
            height: '60%',
            background: 'radial-gradient(circle, rgba(147, 197, 253, 0.4) 0%, rgba(147, 197, 253, 0) 70%)',
            filter: 'blur(80px)',
          }}
        />

        {/* Blob 2 - Top Right - Opposite movement */}
        <div
          className="absolute bg-blob-2"
          style={{
            top: '-10%',
            right: '-10%',
            width: '55%',
            height: '55%',
            background: 'radial-gradient(circle, rgba(191, 219, 254, 0.35) 0%, rgba(191, 219, 254, 0) 70%)',
            filter: 'blur(90px)',
          }}
        />

        {/* Blob 3 - Center - Subtle pulse */}
        <div
          className="absolute bg-blob-3"
          style={{
            top: '30%',
            left: '20%',
            width: '50%',
            height: '50%',
            background: 'radial-gradient(circle, rgba(96, 165, 250, 0.25) 0%, rgba(96, 165, 250, 0) 70%)',
            filter: 'blur(100px)',
          }}
        />

        {/* Blob 4 - Bottom Right - Gentle drift */}
        <div
          className="absolute bg-blob-4"
          style={{
            bottom: '-15%',
            right: '10%',
            width: '45%',
            height: '45%',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0) 70%)',
            filter: 'blur(70px)',
          }}
        />

      </div>

    </div>
  );
}
