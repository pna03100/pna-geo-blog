/**
 * [Animation] CountUpNumber - Animated number counter
 * [Trigger] Counts up when element enters viewport
 * [Safety] SSR/HTML always shows final value (SEO/Screen Reader), animation is visual overlay only
 * [No Flicker] 500 → 500 (HTML), visual 0 → 500 (overlay)
 */

"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CountUpNumberProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function CountUpNumber({
  end,
  duration = 0.8,
  suffix = "",
  prefix = "",
  className = "",
}: CountUpNumberProps) {
  // Visual animation count (0 → end)
  const [visualCount, setVisualCount] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const animationFrameRef = useRef<number>();

  // Client-side only detection
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Only animate on client after mount and when in view
    if (!isMounted || !isInView || hasAnimated) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setVisualCount(end);
      setHasAnimated(true);
      return;
    }

    // Animation: 0 → end (smooth count up)
    let startTime: number | null = null;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);

      // Calculate current count: 0 → end
      const currentCount = Math.floor(progress * end);

      setVisualCount(currentCount);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setVisualCount(end);
        setHasAnimated(true);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isMounted, isInView, end, duration, hasAnimated]);

  // SEO/Screen Reader: always final value
  const seoValue = `${prefix}${end.toLocaleString()}${suffix}`;
  // Visual: animated value (0 → end)
  const visualValue = `${prefix}${visualCount.toLocaleString()}${suffix}`;
  const showAnimation = isMounted && !hasAnimated;

  return (
    <span ref={ref} className={`relative inline-block ${className}`}>
      {/* SEO/HTML Layer: Always final value (for crawlers/screen readers) */}
      <span 
        className={showAnimation ? "invisible" : ""}
        aria-live="off"
        role="text"
      >
        {seoValue}
      </span>
      
      {/* Visual Animation Layer: 0 → end (client-only overlay) */}
      {showAnimation && (
        <span 
          className="absolute inset-0"
          aria-hidden="true"
          suppressHydrationWarning
        >
          {visualValue}
        </span>
      )}
    </span>
  );
}
