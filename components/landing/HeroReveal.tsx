/**
 * [Performance] Hero Content Reveal — 최소 클라이언트 컴포넌트
 * useEffect로 'active' 클래스만 추가 (CSS 애니메이션 트리거)
 */

"use client";

import { useEffect, useRef } from "react";

export function HeroReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.classList.add('active');
    }
  }, []);

  return (
    <div ref={ref} className="reveal-hero-content">
      {children}
    </div>
  );
}
