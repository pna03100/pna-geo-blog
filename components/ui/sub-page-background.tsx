/**
 * [Component] SubPage Background - Unified Design System
 * [Design] Calm, subtle grid with soft gradient
 * [Purpose] Consistent background for all sub-pages
 */

"use client";

export function SubPageBackground() {
  return (
    <div className="fixed inset-0 -z-50 bg-slate-50">
      {/* Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e2e8f0 1px, transparent 1px),
            linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />
      
      {/* Soft Top Gradient */}
      <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-white via-white/80 to-transparent" />
      
      {/* Bottom Fade */}
      <div className="absolute inset-x-0 bottom-0 h-[300px] bg-gradient-to-t from-slate-100/50 to-transparent" />
    </div>
  );
}
