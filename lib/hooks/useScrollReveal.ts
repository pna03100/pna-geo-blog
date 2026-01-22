/**
 * [Hook] Scroll Reveal Animation
 * [Performance] Intersection Observer + CSS Transform
 * [Usage] Cinematic yet Lightweight
 */

"use client";

import { useEffect, useRef } from "react";

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useScrollReveal(
  animationClass: string,
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const {
      threshold = 0.15,
      rootMargin = "0px 0px -5% 0px",
      once = true,
    } = options;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            element.classList.add(animationClass);
            if (once) {
              observer.unobserve(element);
            }
          } else if (!once) {
            element.classList.remove(animationClass);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [animationClass, options]);

  return ref;
}
