/**
 * [UI] Neural Particle Network - AI/Data Connectivity Visualization
 * [Tech] Raw Canvas API for 60fps performance
 * [Purpose] Modern, tech-aesthetic representation of data intelligence
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
  color: string;
}

export default function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // High DPI support
    const dpr = window.devicePixelRatio || 1;
    
    // Use parent container size (full viewport for absolute positioning)
    const updateSize = () => {
      const parent = canvas.parentElement;
      if (!parent) return { width: window.innerWidth, height: window.innerHeight };
      return {
        width: parent.offsetWidth || window.innerWidth,
        height: parent.offsetHeight || window.innerHeight,
      };
    };

    let { width, height } = updateSize();
    
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    // Particle configuration (✅ Reduced for cleaner look)
    const particleCount = 35; // 50% reduction for less chaos
    const connectionDistance = 120;
    const mouseConnectionDistance = 150;
    const particles: Particle[] = [];

    // Brand colors
    const colors = [
      "rgba(59, 130, 246, 0.8)", // Blue-500
      "rgba(14, 165, 233, 0.8)", // Sky-500
      "rgba(99, 102, 241, 0.8)", // Indigo-500
    ];

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25, // ✅ 50% slower (very ambient)
        vy: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 2 + 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    // Animation loop
    const animate = () => {
      // Clear with fade effect for trail
      ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
      ctx.fillRect(0, 0, width, height);

      // Update and draw particles
      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Boundary bounce
        if (particle.x < 0 || particle.x > width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > height) particle.vy *= -1;

        // Keep within bounds
        particle.x = Math.max(0, Math.min(width, particle.x));
        particle.y = Math.max(0, Math.min(height, particle.y));

        // Draw connections to nearby particles
        particles.forEach((otherParticle, j) => {
          if (i === j) return;

          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.15;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });

        // Draw connection to mouse
        const mouseDx = particle.x - mouseRef.current.x;
        const mouseDy = particle.y - mouseRef.current.y;
        const mouseDistance = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);

        if (mouseDistance < mouseConnectionDistance) {
          const opacity = (1 - mouseDistance / mouseConnectionDistance) * 0.3;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
          ctx.lineWidth = 1.5;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
          ctx.stroke();
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Glow effect
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius + 2, 0, Math.PI * 2);
        ctx.fillStyle = particle.color.replace("0.8", "0.2");
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    // Resize handler
    const handleResize = () => {
      const size = updateSize();
      width = size.width;
      height = size.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="absolute inset-0 pointer-events-none"
      style={{
        // ✅ STRICT LINEAR MASK: Particles ONLY on RIGHT side
        maskImage: "linear-gradient(to right, transparent 0%, transparent 40%, black 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, transparent 40%, black 100%)",
      }}
    >
      {/* Canvas fills entire space */}
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-70"
        style={{ background: "transparent" }}
      />
    </motion.div>
  );
}
