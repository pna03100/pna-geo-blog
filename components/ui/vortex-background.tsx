/**
 * [Component] Framer Vortex Background - Particle System
 * [Design] 별 점들이 블랙홀로 빨려들어가는 소용돌이
 * [Performance] Canvas RAF + 700 particles
 */

'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef } from 'react';

// ============================================
// [1] Particle Interface
// ============================================
interface Particle {
  x: number; // x position
  y: number; // y position
  vx: number; // velocity x
  vy: number; // velocity y
  size: number; // 0.5~1.1px
  alpha: number; // 0.3~0.7
  color: string; // mostly white, slight tint
}

// ============================================
// [2] Vortex Canvas - Particle System
// ============================================
function VortexStarsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let time = 0;

    // Config
    const PARTICLE_COUNT = 300;
    const MAX_SPEED = 0.3; // slow drift
    const TRAIL_ALPHA = 0.2; // lighter trail

    // Setup canvas size
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      // Reinitialize particles on resize
      initParticles();
    };

    // Initialize particles
    const initParticles = () => {
      particles = [];
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * MAX_SPEED;
        
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 0.6 + 0.5, // 0.5~1.1px
          alpha: Math.random() * 0.4 + 0.3, // 0.3~0.7
          color: getParticleColor(),
        });
      }
    };

    // Get particle color (mostly white, slight blue tint)
    const getParticleColor = () => {
      const rand = Math.random();
      if (rand < 0.8) return 'rgba(255, 255, 255, 1)'; // 80% white
      if (rand < 0.9) return 'rgba(180, 210, 255, 1)'; // 10% light blue tint
      return 'rgba(150, 200, 255, 1)'; // 10% blue tint
    };

    resize();
    window.addEventListener('resize', resize);

    // Animation loop
    const animate = () => {
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      const cx = w / 2;
      const cy = h / 2;
      const maxR = Math.max(w, h) / 2;

      if (shouldReduceMotion) {
        // Static stars for accessibility
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, w, h);

        particles.forEach((p) => {
          ctx.fillStyle = p.color.replace('1)', `${p.alpha})`);
          ctx.fillRect(p.x, p.y, p.size, p.size);
        });
        return;
      }

      // Trail effect (don't fully clear)
      ctx.fillStyle = `rgba(0, 0, 0, ${TRAIL_ALPHA})`;
      ctx.fillRect(0, 0, w, h);

      // Update and draw particles
      particles.forEach((p) => {
        // Update position (drift in space)
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges (loop back)
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        // Draw particle
        ctx.fillStyle = p.color.replace('1)', `${p.alpha})`);
        ctx.fillRect(p.x, p.y, p.size, p.size);
      });

      time += 16; // ~60fps
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [shouldReduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}

// ============================================
// [3] Main Vortex Hero Component
// ============================================
interface FramerVortexHeroProps {
  children: React.ReactNode;
  className?: string;
}

export function FramerVortexHero({ children, className = '' }: FramerVortexHeroProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{
        minHeight: '100vh',
        background: '#000',
      }}
    >
      {/* Layer 1: Particle Vortex Canvas */}
      <VortexStarsCanvas />

      {/* Layer 2 & 3: Rotating Circles Container (centered with content) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 2 }}>
        {/* Big Circle (rotating) */}
        <motion.div
          className="absolute"
          style={{
            width: '600px',
            height: '600px',
            borderRadius: '9999px',
            backgroundImage:
              'linear-gradient(229deg, rgb(59, 130, 246) 13%, rgba(37, 99, 235, 0) 35.0236%, rgba(30, 64, 175, 0) 64.1724%, rgb(29, 78, 216) 88%)',
            mixBlendMode: 'screen',
            filter: 'blur(20px)',
            opacity: 0.5,
            willChange: 'transform',
          }}
          animate={
            shouldReduceMotion
              ? {}
              : {
                  rotate: [360, 0],
                }
          }
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Small Circle (rotating) */}
        <motion.div
          className="absolute"
          style={{
            width: '450px',
            height: '450px',
            borderRadius: '9999px',
            backgroundImage:
              'linear-gradient(141deg, rgb(59, 130, 246) 13%, rgba(37, 99, 235, 0) 35.0236%, rgba(30, 64, 175, 0) 64.1724%, rgb(29, 78, 216) 88%)',
            mixBlendMode: 'screen',
            filter: 'blur(12px)',
            opacity: 0.4,
            willChange: 'transform',
          }}
          animate={
            shouldReduceMotion
              ? {}
              : {
                  rotate: [0, 360],
                }
          }
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Layer 4: Content */}
      <div className="relative pointer-events-auto" style={{ zIndex: 10 }}>
        {children}
      </div>

      {/* Layer 5: Vignette Overlay */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: '-20%',
          background:
            'radial-gradient(closest-side, rgba(0,0,0,0) 35%, rgba(0,0,0,0.6) 75%, rgba(0,0,0,0.9) 100%)',
          filter: 'blur(3px)',
          mixBlendMode: 'multiply',
          opacity: 0.85,
          zIndex: 20,
        }}
      />
    </div>
  );
}
