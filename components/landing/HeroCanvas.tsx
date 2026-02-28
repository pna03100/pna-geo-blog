/**
 * [Performance] Hero Canvas Animation — Desktop only
 * dynamic(ssr:false)로 로딩하여 크리티컬 JS 번들에서 제외
 * simplex-noise가 이 청크에만 포함됨
 */

"use client";

import { useEffect, useRef } from "react";
import { createNoise3D } from "simplex-noise";

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationIdRef = useRef<number>(0);
  const isVisibleRef = useRef(true);
  const noiseRef = useRef(createNoise3D());

  const waveColors = ["#0c1e3d", "#1e3a8a", "#1e40af", "#2563eb", "#1d4ed8"];

  // IntersectionObserver: 뷰포트 밖이면 canvas 애니메이션 정지
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // 모바일: 캔버스 렌더링 완전 생략
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const noise = noiseRef.current;
    let w: number, h: number, nt = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 1);
    const container = canvas.parentElement;
    if (!container) return;

    const setup = () => {
      if (!container) return;
      const displayWidth = container.clientWidth;
      const displayHeight = container.clientHeight;

      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;

      ctx.scale(dpr, dpr);
      w = displayWidth;
      h = displayHeight;
    };

    setup();

    const handleResize = () => setup();
    window.addEventListener('resize', handleResize);

    const drawWave = (n: number) => {
      nt += 0.004;
      for (let i = 0; i < n; i++) {
        ctx.beginPath();
        ctx.lineWidth = 240;
        ctx.strokeStyle = waveColors[i % waveColors.length];

        const verticalPosition = (i / (n - 1)) * h;

        for (let x = 0; x < w; x += 10) {
          const y = noise(x / 800, 0.8 * i, nt) * 140;
          ctx.lineTo(x, y + verticalPosition);
        }
        ctx.stroke();
        ctx.closePath();
      }
    };

    let lastFrameTime = 0;
    const frameInterval = 1000 / 24;

    const render = (currentTime: number = 0) => {
      if (!isVisibleRef.current) {
        animationIdRef.current = requestAnimationFrame(render);
        return;
      }

      const elapsed = currentTime - lastFrameTime;

      if (elapsed >= frameInterval) {
        ctx.fillStyle = "#0a0f1e";
        ctx.globalAlpha = 0.85;
        ctx.fillRect(0, 0, w, h);
        drawWave(8);
        lastFrameTime = currentTime - (elapsed % frameInterval);
      }

      animationIdRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationIdRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 hidden md:block">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ filter: 'blur(60px)' }}
      />
    </div>
  );
}
