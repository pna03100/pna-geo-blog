/**
 * [Animation] CountUpNumber - Animated number counter
 * [Trigger] Counts up when element enters viewport
 * [Safety] Shows final number if JS fails, screen reader friendly
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
  // Safety: Start with final value (JS fail-safe + SEO)
  const [count, setCount] = useState(end);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView || hasAnimated) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCount(end);
      setHasAnimated(true);
      return;
    }

    // Start animation from 0
    setCount(0);
    let startTime: number | null = null;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);

      // Linear animation (constant speed)
      const currentCount = Math.floor(progress * (end - startValue) + startValue);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
        setHasAnimated(true);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration, hasAnimated]);

  // Screen reader accessibility: always announce final value
  const displayValue = `${prefix}${count.toLocaleString()}${suffix}`;
  const ariaLabel = `${prefix}${end.toLocaleString()}${suffix}`;

  return (
    <span 
      ref={ref} 
      className={className}
      aria-label={ariaLabel}
      role="text"
    >
      {displayValue}
    </span>
  );
}
