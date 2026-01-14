/**
 * [Component] Hero Particles Background - Framer-style Interactive Experience
 * [Design] Neuro-Data Network with Ambient Spotlight
 * [Performance] Canvas API with optimized rendering
 */

"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export function HeroParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, isInside: false });
  const spotlightRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Detect mobile
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 40 : 80;

    // Set canvas size
    const setCanvasSize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      
      ctx.scale(dpr, dpr);
      
      return { width: rect.width, height: rect.height };
    };

    const { width, height } = setCanvasSize();

    // Initialize mouse at center
    mouseRef.current = { x: width / 2, y: height / 2, isInside: false };

    // Create particles
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1.5,
      });
    }
    particlesRef.current = particles;

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        isInside: true,
      };

      // Update spotlight
      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(
          circle 500px at ${e.clientX}px ${e.clientY}px,
          rgba(59, 130, 246, 0.15),
          transparent
        )`;
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.isInside = false;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    // Animation loop
    const animate = () => {
      const rect = container.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      particles.forEach((particle, i) => {
        // Mouse attraction (only if inside)
        if (mouseRef.current.isInside) {
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const force = (150 - distance) / 150;
            particle.vx += (dx / distance) * force * 0.015;
            particle.vy += (dy / distance) * force * 0.015;
          }
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Damping
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Wrap around edges
        if (particle.x < 0) particle.x = rect.width;
        if (particle.x > rect.width) particle.x = 0;
        if (particle.y < 0) particle.y = rect.height;
        if (particle.y > rect.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(59, 130, 246, 0.6)";
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(59, 130, 246, 0.8)";
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw connections between particles
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const opacity = 0.3 * (1 - dist / 120);
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Draw connection to mouse (only if inside)
        if (mouseRef.current.isInside) {
          const dx = particle.x - mouseRef.current.x;
          const dy = particle.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            const opacity = 0.4 * (1 - dist / 150);
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            ctx.strokeStyle = `rgba(96, 165, 250, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      setCanvasSize();
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {/* Ambient Spotlight */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 opacity-80 transition-opacity duration-300"
        style={{
          background: "radial-gradient(circle 500px at 50% 50%, rgba(59, 130, 246, 0.12), transparent)",
        }}
      />

      {/* Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.35 }}
      />

      {/* Subtle Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white/10" />
    </div>
  );
}
