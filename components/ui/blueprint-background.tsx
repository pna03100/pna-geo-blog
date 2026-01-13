/**
 * [UI] Blueprint Background - Technical Drawing Style
 * [Purpose] Sophisticated dashed-grid pattern for professional B2B/FinTech aesthetic
 * [Design] Subtle corner patches that frame content without clutter
 */

'use client';

export function BlueprintBackground() {
  return (
    <div className="fixed inset-0 -z-50 h-full w-full bg-white overflow-hidden pointer-events-none">
      {/* Top Left Patch */}
      <div 
        className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] opacity-[0.25] text-slate-900"
        style={{
          maskImage: 'radial-gradient(ellipse at top left, black 20%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at top left, black 20%, transparent 70%)'
        }}
      >
        <DashedGridSvg />
      </div>
      
      {/* Bottom Right Patch (Rotated for variation) */}
      <div 
        className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] opacity-[0.25] text-slate-900 rotate-90"
        style={{
          maskImage: 'radial-gradient(ellipse at bottom right, black 20%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at bottom right, black 20%, transparent 70%)'
        }}
      >
        <DashedGridSvg />
      </div>

      {/* Top Right Patch (Small, Subtle) */}
      <div 
        className="absolute -top-[5%] -right-[5%] w-[30%] h-[30%] opacity-[0.15] text-slate-900"
        style={{
          maskImage: 'radial-gradient(ellipse at top right, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at top right, black 30%, transparent 80%)'
        }}
      >
        <DashedGridSvg />
      </div>

      {/* Bottom Left Patch (Small, Subtle) */}
      <div 
        className="absolute -bottom-[5%] -left-[5%] w-[30%] h-[30%] opacity-[0.15] text-slate-900 rotate-45"
        style={{
          maskImage: 'radial-gradient(ellipse at bottom left, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at bottom left, black 30%, transparent 80%)'
        }}
      >
        <DashedGridSvg />
      </div>

      {/* Center Bottom Patch (Very Small, Very Subtle) */}
      <div 
        className="absolute -bottom-[8%] left-1/2 -translate-x-1/2 w-[20%] h-[20%] opacity-[0.12] text-slate-900 rotate-12"
        style={{
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 85%)'
        }}
      >
        <DashedGridSvg />
      </div>
    </div>
  );
}

function DashedGridSvg() {
  // A reusable SVG component defining the dashed grid pattern
  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="dashed_grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dashed_grid)" />
    </svg>
  );
}
