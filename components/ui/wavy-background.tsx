"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";
import { createNoise3D } from "simplex-noise";

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}: {
  children?: any;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  [key: string]: any;
}) => {
  const noiseRef = useRef(createNoise3D());
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationIdRef = useRef<number>(0);
  const isVisibleRef = useRef(true);

  const getSpeed = () => {
    switch (speed) {
      case "slow":
        return 0.001;
      case "fast":
        return 0.004;
      default:
        return 0.001;
    }
  };

  const waveColors = colors ?? [
    "#38bdf8",
    "#818cf8",
    "#c084fc",
    "#e879f9",
    "#22d3ee",
  ];

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
    // 모바일: 캔버스 렌더링 완전 생략 (즉시 체크로 불필요한 초기화 방지)
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const noise = noiseRef.current;
    let w: number, h: number, nt = 0;

    // [Performance] DPR을 절반으로 제한 — blur 처리로 차이 불가시
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
      // [Performance] ctx.filter 제거 — CSS filter로 대체 (GPU 가속)
    };

    setup();

    const handleResize = () => setup();
    window.addEventListener('resize', handleResize);

    const drawWave = (n: number) => {
      nt += getSpeed();
      for (let i = 0; i < n; i++) {
        ctx.beginPath();
        ctx.lineWidth = waveWidth || 50;
        ctx.strokeStyle = waveColors[i % waveColors.length];

        const verticalPosition = (i / (n - 1)) * h;

        // [Performance] step 5→10px (blur로 차이 불가시)
        for (let x = 0; x < w; x += 10) {
          const y = noise(x / 800, 0.8 * i, nt) * 140;
          ctx.lineTo(x, y + verticalPosition);
        }
        ctx.stroke();
        ctx.closePath();
      }
    };

    let lastFrameTime = 0;
    const targetFPS = 24; // [Performance] 30→24 FPS (blur로 차이 불가시)
    const frameInterval = 1000 / targetFPS;

    const render = (currentTime: number = 0) => {
      // 뷰포트 밖이면 프레임 스킵 (메인 스레드 절약)
      if (!isVisibleRef.current) {
        animationIdRef.current = requestAnimationFrame(render);
        return;
      }

      const elapsed = currentTime - lastFrameTime;

      if (elapsed >= frameInterval) {
        ctx.fillStyle = backgroundFill || "black";
        ctx.globalAlpha = waveOpacity || 0.5;
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
    <div
      ref={containerRef}
      className={cn(
        "h-screen flex flex-col items-center justify-center bg-[#0a0f1e]",
        containerClassName
      )}
    >
      {/* 데스크톱: Canvas + CSS blur (GPU 가속) / 모바일: CSS gradient */}
      <canvas
        className="absolute inset-0 z-0 hidden md:block"
        ref={canvasRef}
        id="canvas"
        style={{
          width: '100%',
          height: '100%',
          filter: `blur(${blur}px)`,
        }}
      />
      {/* 모바일: CSS 그라디언트 대체 (캔버스 없음) */}
      <div
        className="absolute inset-0 z-0 md:hidden"
        style={{
          background: 'linear-gradient(180deg, #0a0f1e 0%, #0d1530 30%, #111a3a 60%, #0a0f1e 100%)',
        }}
      />

      {/* Film Grain Overlay - Very Visible */}
      <div
        className="absolute inset-0 pointer-events-none z-5"
        style={{
          opacity: 0.9,
          mixBlendMode: 'overlay',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='5.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '100px 100px'
        }}
      />

      <div className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </div>
  );
};
