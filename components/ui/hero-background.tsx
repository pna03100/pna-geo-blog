/**
 * [Component] Hero Background - Canvas Particle + Rotating Circles
 * [Design] Interactive Particle Network with Gradient Circles
 * [Performance] Optimized Canvas rendering with safety checks
 * [Safety] Viewport-based detection, Tab visibility, Reduced motion support
 */

"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();
  const animateFnRef = useRef<() => void>();
  const visibilityHandlerRef = useRef<(() => void) | null>(null);
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    // Safety Check 1 (PRIORITY): Detect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setShouldAnimate(false);
      return;
    }

    // Safety Check 2 (PRIORITY): Viewport-based mobile detection (accurate)
    const isMobileViewport = window.innerWidth < 768;
    if (isMobileViewport) {
      setShouldAnimate(false);
      return;
    }

    // Safety Check 3 (AUXILIARY): UA + hardware as backup
    const isMobileUA = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
    if (isMobileUA && isLowEnd) {
      setShouldAnimate(false);
      return;
    }

    // Safety Check 4: Page Visibility API - pause when tab is hidden (prevent memory leak)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Tab hidden: cancel animation loop
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = undefined;
        }
      } else {
        // Tab visible: resume animation loop
        if (animateFnRef.current && !animationFrameRef.current) {
          animateFnRef.current();
        }
      }
    };
    
    // Store handler in ref to prevent duplicate listeners
    visibilityHandlerRef.current = handleVisibilityChange;
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Performance: requestIdleCallback으로 Canvas 초기화 지연
    const initCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize particles (Performance: 80 → 50)
    const particleCount = 50;
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: 1.2,
    }));

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;

      // Update and draw particles
      particles.forEach((particle) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Keep within bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Store animate function in ref for visibility change handler
    animateFnRef.current = animate;
    
    // Debug: Log animation loop start (should only appear once per mount)
    console.log('[HeroBackground] Animation loop started');
    
    animate();

    // Cleanup - prevent memory leaks
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = undefined;
      }
      // Remove visibility listener inside initCanvas cleanup
      if (visibilityHandlerRef.current) {
        document.removeEventListener('visibilitychange', visibilityHandlerRef.current);
      }
    };
    };

    // Only animate if all safety checks pass
    if (!shouldAnimate) {
      // Clean up visibility listener if animation is disabled
      return () => {
        if (visibilityHandlerRef.current) {
          document.removeEventListener('visibilitychange', visibilityHandlerRef.current);
        }
      };
    }

    // Performance: 브라우저가 idle 상태일 때 Canvas 초기화
    if ('requestIdleCallback' in window) {
      const idleCallbackId = requestIdleCallback(initCanvas, { timeout: 2000 });
      return () => {
        cancelIdleCallback(idleCallbackId);
        if (visibilityHandlerRef.current) {
          document.removeEventListener('visibilitychange', visibilityHandlerRef.current);
        }
      };
    } else {
      // Fallback: setTimeout
      const timeoutId = setTimeout(initCanvas, 100);
      return () => {
        clearTimeout(timeoutId);
        if (visibilityHandlerRef.current) {
          document.removeEventListener('visibilitychange', visibilityHandlerRef.current);
        }
      };
    }
  }, [shouldAnimate]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0B0B0D]">
      {/* Canvas for particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ width: "100%", height: "100%", zIndex: 1 }}
      />

      {/* Rotating Gradient Circles - Behind Title Near Header */}
      <div className="absolute inset-0 flex items-start justify-center pt-32" style={{ zIndex: 5 }}>
        {/* Big Circle - Performance Balanced: blur + reduced opacity */}
        {shouldAnimate ? (
          <motion.div
            className="absolute"
            animate={{ rotate: 360 }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              width: "495px",
              height: "495px",
              borderRadius: "50%",
              background: "linear-gradient(229deg, rgb(59, 130, 246) 13%, rgba(37, 99, 235, 0) 35%, rgba(29, 78, 216, 0) 64%, rgb(30, 64, 175) 88%)",
              filter: "blur(15px)",
              opacity: 0.5,
              willChange: "transform",
            }}
          />
        ) : (
          <div
            className="absolute"
            style={{
              width: "495px",
              height: "495px",
              borderRadius: "50%",
              background: "linear-gradient(229deg, rgb(59, 130, 246) 13%, rgba(37, 99, 235, 0) 35%, rgba(29, 78, 216, 0) 64%, rgb(30, 64, 175) 88%)",
              filter: "blur(15px)",
              opacity: 0.5,
            }}
          />
        )}

        {/* Small Circle - Performance Balanced: blur + reduced opacity */}
        {shouldAnimate ? (
          <motion.div
            className="absolute"
            animate={{ rotate: -360 }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              width: "418px",
              height: "418px",
              borderRadius: "50%",
              background: "linear-gradient(141deg, rgb(96, 165, 250) 13%, rgba(59, 130, 246, 0) 35%, rgba(37, 99, 235, 0) 64%, rgb(29, 78, 216) 88%)",
              filter: "blur(12px)",
              opacity: 0.45,
              willChange: "transform",
            }}
          />
        ) : (
          <div
            className="absolute"
            style={{
              width: "418px",
              height: "418px",
              borderRadius: "50%",
              background: "linear-gradient(141deg, rgb(96, 165, 250) 13%, rgba(59, 130, 246, 0) 35%, rgba(37, 99, 235, 0) 64%, rgb(29, 78, 216) 88%)",
              filter: "blur(12px)",
              opacity: 0.45,
            }}
          />
        )}
      </div>

      {/* Center Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(
            circle at 50% 45%,
            rgba(0, 0, 0, 0.3) 0%,
            rgba(0, 0, 0, 0.1) 40%,
            rgba(0, 0, 0, 0) 70%
          )`,
          zIndex: 2,
        }}
      />
    </div>
  );
}
