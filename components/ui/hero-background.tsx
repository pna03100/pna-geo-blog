/**
 * [Component] Hero Background - Canvas Particle + Rotating Circles
 * [Design] Interactive Particle Network with Gradient Circles
 * [Performance] Optimized Canvas rendering
 */

"use client";

import { useEffect, useRef } from "react";
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

  useEffect(() => {
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
      radius: 0.8,
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

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
    };

    // Performance: 브라우저가 idle 상태일 때 Canvas 초기화
    if ('requestIdleCallback' in window) {
      const idleCallbackId = requestIdleCallback(initCanvas, { timeout: 2000 });
      return () => {
        cancelIdleCallback(idleCallbackId);
      };
    } else {
      // Fallback: setTimeout
      const timeoutId = setTimeout(initCanvas, 100);
      return () => clearTimeout(timeoutId);
    }
  }, []);

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

        {/* Small Circle - Performance Balanced: blur + reduced opacity */}
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
