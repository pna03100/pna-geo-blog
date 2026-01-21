/**
 * [Section] Hero - Careons Style with Scroll Animation
 * [Design] Full-screen entrance animation with scroll interactions
 * [Animation] Fullscreen → Shrink → Push-out by ScrollAwardSection
 */

"use client";

import { HeroContent } from "./HeroContent";
import Image from "next/image";
import { useEffect, useState } from "react";

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Scroll listener for push-out effect
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Calculate scale, translateY, and blur based on scroll
  const startScroll = 0;
  const maxScroll = 400; // Scroll distance for full effect (shorter)
  const scrollProgress = Math.max(0, Math.min((scrollY - startScroll) / maxScroll, 1));
  const scale = 1 - scrollProgress * 0.08; // Scale down to 0.92 (much less dramatic)
  const translateY = -scrollProgress * 100; // Move up 100px
  const opacity = 1 - scrollProgress * 0.4; // Fade out slightly
  const blur = scrollProgress * 8; // Blur up to 8px

  return (
    <>
      {/* [Careons] SECTION: #HERO - Full-screen with scroll animations */}
      <section 
        data-section="HERO" 
        className="relative w-full overflow-hidden min-h-screen flex items-center will-change-transform"
        style={{
          transform: `scale(${scale}) translateY(${translateY}px)`,
          opacity: opacity,
          filter: `blur(${blur}px)`,
          transformOrigin: 'center center'
        }}
      >
      
      {/* [Careons] Background Image with Overlay */}
      <div className="absolute inset-0 -z-10">
        {/* Background Image Placeholder */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900" />
        
        {/* Real Background Image - Desaturated (grayscale) */}
        <Image
          src="/images/hero/company-hero-bg.jpg"
          alt="PNA Company Hero Background"
          fill
          priority
          className="object-cover grayscale-[80%]"
          quality={90}
        />
        
        {/* [Careons] Dark Overlay - Darker gradient from bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/70 to-slate-900/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-900/40 to-slate-900/30" />
      </div>
      
      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 md:px-6 lg:px-8 max-w-7xl py-32 md:py-40 lg:py-48">
        <HeroContent />
      </div>
    </section>
    </>
  );
}
