/**
 * [Component] Spotlight Background - Linear/Vercel Style
 * [Design] Mouse-Tracking Grid Reveal + Central Beam
 * [Performance] RequestAnimationFrame optimized
 */

'use client';

import { useRef, useState, useEffect } from 'react';

export function SpotlightBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const rafRef = useRef<number>();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          });
        }
      });
    };

    const handleScroll = () => {
      // 히어로 섹션 높이를 대략 100vh로 가정
      const heroHeight = window.innerHeight;
      const scrollY = window.scrollY;
      
      // 히어로 섹션을 벗어나면 opacity를 0.3으로 감소
      if (scrollY > heroHeight * 0.7) {
        setScrollOpacity(0.3);
      } else {
        setScrollOpacity(1);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    // Initialize at center
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: rect.width / 2,
        y: rect.height / 2,
      });
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 -z-50 overflow-hidden bg-white pointer-events-none transition-opacity duration-500"
      style={{ opacity: scrollOpacity }}
    >
      {/* 1. Base Subtle Grid (Always visible, very faint) */}
      <div 
        className="absolute inset-0"
        style={{
          opacity: 0.15 * scrollOpacity,
          backgroundImage: `
            linear-gradient(to right, #e2e8f0 1px, transparent 1px),
            linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)',
          transition: 'opacity 500ms ease-out',
        }}
      />

      {/* 2. Spotlight Reveal Grid (PNA Blue, follows mouse) */}
      <div 
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: scrollOpacity,
          backgroundImage: `
            linear-gradient(to right, #2563EB 1px, transparent 1px),
            linear-gradient(to bottom, #2563EB 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          maskImage: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, black 20%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, black 20%, transparent 100%)`,
        }}
      />

      {/* 3. Central Beam (Atmospheric Glow) */}
      <div 
        className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] rounded-full pointer-events-none transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, transparent 70%)',
          animation: 'pulse 4s ease-in-out infinite',
          opacity: scrollOpacity,
        }}
      />

      {/* 4. Secondary Spotlight (Smaller, more intense) */}
      <div 
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.08), transparent 70%)`,
          opacity: 0.6 * scrollOpacity,
        }}
      />

      {/* Subtle gradient overlay for depth */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white/30 pointer-events-none transition-opacity duration-500"
        style={{ opacity: scrollOpacity }}
      />

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            transform: translate(-50%, 0) scale(1);
            opacity: 0.8;
          }
          50% {
            transform: translate(-50%, 0) scale(1.05);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
