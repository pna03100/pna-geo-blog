/**
 * [Section] Scroll-Interactive Award Badge
 * [Design] Scale up/down on scroll with smooth transition
 * [Performance] CSS-based scroll animation
 */

"use client";

import { useEffect, useRef, useState } from "react";
import { GoogleAwardBadge } from "./GoogleAwardBadge";

export function ScrollAwardSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress (0 to 1)
      // Starts when section enters view, ends when it leaves
      const start = windowHeight;
      const end = -rect.height;
      const total = start - end;
      const current = rect.top - end;
      
      const progress = Math.max(0, Math.min(1, 1 - (current / total)));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Calculate scale: starts at 0.8, grows to 1.2 at middle, then back to 0.8
  const getScale = () => {
    if (scrollProgress < 0.5) {
      // 0 → 0.5: scale from 0.8 to 1.2
      return 0.8 + (scrollProgress * 2) * 0.4;
    } else {
      // 0.5 → 1: scale from 1.2 to 0.8
      return 1.2 - ((scrollProgress - 0.5) * 2) * 0.4;
    }
  };

  const scale = getScale();
  const opacity = scrollProgress < 0.9 ? 1 : 1 - ((scrollProgress - 0.9) * 10);

  return (
    <section 
      ref={sectionRef}
      className="relative h-[80vh] md:h-[100vh] flex items-center justify-center"
      style={{
        marginTop: '-4rem',
        marginBottom: '0'
      }}
    >
      <div 
        className="sticky top-1/2 -translate-y-1/2 transition-all duration-100 ease-out"
        style={{
          transform: `translateY(-50%) scale(${scale})`,
          opacity: opacity
        }}
      >
        <GoogleAwardBadge />
      </div>
    </section>
  );
}
