/**
 * [Animation] CountUpNumber - Animated number counter
 * [Trigger] Counts up when element enters viewport
 * [Safety] SSR shows final value, CSR animates 0→end with no flash
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
  // SSR/Hydration: Always show final value
  const [displayCount, setDisplayCount] = useState(end);
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
      setDisplayCount(end);
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

      setDisplayCount(currentCount);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayCount(end);
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

  // Screen reader accessibility: always announce final value, no live updates
  const displayValue = `${prefix}${displayCount.toLocaleString()}${suffix}`;
  const ariaLabel = `${prefix}${end.toLocaleString()}${suffix}`;

  return (
    <span 
      ref={ref} 
      className={className}
      aria-label={ariaLabel}
      aria-live="off"
      role="text"
      suppressHydrationWarning
    >
      {displayValue}
    </span>
  );
}
