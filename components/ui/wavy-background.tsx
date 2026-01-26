"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
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
  const noise = createNoise3D();
  let w: number,
    h: number,
    nt: number,
    i: number,
    x: number,
    ctx: any,
    canvas: any;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
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

  const init = () => {
    canvas = canvasRef.current;
    if (!canvas) return;
    
    ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Get device pixel ratio
    const dpr = window.devicePixelRatio || 1;
    
    // Get parent container size (not window size!)
    const container = canvas.parentElement;
    if (!container) return;
    
    const displayWidth = container.clientWidth;
    const displayHeight = container.clientHeight;
    
    // Set canvas size in memory (scaled to device pixels)
    canvas.width = displayWidth * dpr;
    canvas.height = displayHeight * dpr;
    
    // Set canvas display size (CSS pixels)
    canvas.style.width = `${displayWidth}px`;
    canvas.style.height = `${displayHeight}px`;
    
    // Scale context to match device pixel ratio
    ctx.scale(dpr, dpr);
    
    // Store logical dimensions
    w = displayWidth;
    h = displayHeight;
    
    // 웹과 동일한 blur 사용
    ctx.filter = `blur(${blur}px)`;
    
    nt = 0;
    
    window.onresize = function () {
      if (!canvas || !container) return;
      
      const dpr = window.devicePixelRatio || 1;
      const displayWidth = container.clientWidth;
      const displayHeight = container.clientHeight;
      
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;
      
      ctx.scale(dpr, dpr);
      
      w = displayWidth;
      h = displayHeight;
      
      ctx.filter = `blur(${blur}px)`;
    };
    
    render();
  };

  const waveColors = colors ?? [
    "#38bdf8",
    "#818cf8",
    "#c084fc",
    "#e879f9",
    "#22d3ee",
  ];
  const drawWave = (n: number) => {
    nt += getSpeed();
    for (i = 0; i < n; i++) {
      ctx.beginPath();
      ctx.lineWidth = waveWidth || 50;
      ctx.strokeStyle = waveColors[i % waveColors.length];
      
      // Distribute waves across the entire vertical space
      const verticalPosition = (i / (n - 1)) * h;
      
      // 최적화: 렌더링 스텝 증가 (3→5), 마우스 인터랙션 간소화
      for (x = 0; x < w; x += 5) {
        // Mouse interaction - simplified for performance
        const distanceFromMouse = Math.abs(x - mousePosition.x) + Math.abs(verticalPosition - mousePosition.y);
        const mouseInfluence = distanceFromMouse < 400 ? (1 - distanceFromMouse / 400) * 80 : 0;
        
        // Wave with spacing: increased separation between waves
        var y = noise(x / 800, 0.8 * i, nt) * 140 + mouseInfluence;
        ctx.lineTo(x, y + verticalPosition);
      }
      ctx.stroke();
      ctx.closePath();
    }
  };

  let animationId: number;
  let lastFrameTime = 0;
  const targetFPS = 30; // 60fps → 30fps로 제한 (시각적 차이 없음)
  const frameInterval = 1000 / targetFPS;
  
  const render = (currentTime: number = 0) => {
    const elapsed = currentTime - lastFrameTime;
    
    if (elapsed >= frameInterval) {
      ctx.fillStyle = backgroundFill || "black";
      ctx.globalAlpha = waveOpacity || 0.5;
      ctx.fillRect(0, 0, w, h);
      drawWave(8);
      lastFrameTime = currentTime - (elapsed % frameInterval);
    }
    
    animationId = requestAnimationFrame(render);
  };

  useEffect(() => {
    init();
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    // I'm sorry but i have got to support it on safari.
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
    );
  }, []);

  return (
    <div
      className={cn(
        "h-screen flex flex-col items-center justify-center bg-[#0a0f1e]",
        containerClassName
      )}
    >
      <canvas
        className="absolute inset-0 z-0"
        ref={canvasRef}
        id="canvas"
        style={{
          width: '100%',
          height: '100%',
          ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
        }}
      ></canvas>
      
      {/* Film Grain Overlay - Very Visible */}
      <div 
        className="absolute inset-0 pointer-events-none z-5"
        style={{
          opacity: 0.9,
          mixBlendMode: 'overlay',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='5.5' numOctaves='7' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
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
