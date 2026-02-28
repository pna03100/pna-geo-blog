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
  const { threshold = 0.3, rootMargin = "0px 0px -10% 0px", once = true } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // requestAnimationFrame으로 레이아웃 thrashing 방지
        requestAnimationFrame(() => {
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
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [animationClass, threshold, rootMargin, once]);

  return ref;
}
