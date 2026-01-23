/**
 * [Component] Interactive Mouse-Following Background
 * [Design] Deep blue & purple gradient with mouse-reactive ripple effect
 * [Performance] GPU-accelerated transform for smooth mouse tracking
 */

"use client";

import { useState, useEffect } from 'react';

export function WaveBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#1e3a8a]">
      {/* Static Blob 1 - Top Right - Blue */}
      <div 
        className="absolute w-[800px] h-[800px] -top-40 -right-40"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(37, 99, 235, 0.2) 40%, transparent 70%)',
          filter: 'blur(80px)',
          zIndex: 1
        }}
      />

      {/* Static Blob 2 - Bottom Left - Purple */}
      <div 
        className="absolute w-[700px] h-[700px] -bottom-32 -left-32"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.35) 0%, rgba(124, 58, 237, 0.2) 40%, transparent 70%)',
          filter: 'blur(70px)',
          zIndex: 2
        }}
      />

      {/* Static Blob 3 - Center - Light Blue */}
      <div 
        className="absolute w-[900px] h-[900px] top-1/3 left-1/4"
        style={{
          background: 'radial-gradient(circle, rgba(96, 165, 250, 0.3) 0%, rgba(59, 130, 246, 0.15) 40%, transparent 70%)',
          filter: 'blur(90px)',
          zIndex: 3
        }}
      />

      {/* Mouse-Following Ripple Effect */}
      {isHovering && (
        <>
          {/* Main Ripple */}
          <div
            className="absolute w-[600px] h-[600px] pointer-events-none transition-all duration-300 ease-out"
            style={{
              left: mousePosition.x - 300,
              top: mousePosition.y - 300,
              background: 'radial-gradient(circle, rgba(147, 197, 253, 0.4) 0%, rgba(96, 165, 250, 0.2) 30%, transparent 60%)',
              filter: 'blur(60px)',
              zIndex: 10,
              animation: 'ripple-pulse 2s ease-out infinite'
            }}
          />
          
          {/* Secondary Ripple */}
          <div
            className="absolute w-[400px] h-[400px] pointer-events-none transition-all duration-500 ease-out"
            style={{
              left: mousePosition.x - 200,
              top: mousePosition.y - 200,
              background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, rgba(79, 70, 229, 0.15) 40%, transparent 70%)',
              filter: 'blur(50px)',
              zIndex: 11,
              animation: 'ripple-pulse-secondary 2.5s ease-out infinite'
            }}
          />
        </>
      )}

      {/* Film Grain Overlay - Very Visible */}
      <div 
        className="absolute inset-0 opacity-75 mix-blend-soft-light pointer-events-none z-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4.5' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '120px 120px'
        }}
      />
    </div>
  );
}
