/**
 * [Component] Section Title - Neo-Tech 2026 Standard
 * [Design] Kinetic Typography with TextReveal
 * [Behavior] Animated title reveal on scroll
 */

"use client";

import React from 'react';
import { TextReveal } from '@/components/ui/text-reveal';
import { motion } from 'framer-motion';

interface SectionTitleProps {
  badge: string;
  title: string | React.ReactNode;
  description: string;
  align?: 'center' | 'left';
}

export function SectionTitle({ 
  badge, 
  title, 
  description,
  align = 'center'
}: SectionTitleProps) {
  const alignClass = align === 'center' ? 'text-center' : 'text-center md:text-left';
  
  return (
    <div className={`mb-12 md:mb-16 ${alignClass}`}>
      {/* Badge */}
      <motion.span 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-white border border-slate-200 shadow-lg shadow-slate-900/5 text-blue-600 text-xs md:text-sm font-semibold mb-5 md:mb-7"
      >
        {badge}
      </motion.span>
      
      {/* Title - Kinetic Typography */}
      <h2 className="text-3xl md:text-6xl font-bold text-slate-900 mb-4 md:mb-6 tracking-tight" style={{ letterSpacing: '-1.5px', lineHeight: '1.3' }}>
        {typeof title === 'string' ? (
          <TextReveal staggerDelay={0.08}>{title}</TextReveal>
        ) : (
          title
        )}
      </h2>
      
      {/* Description */}
      {description && (
        <p className="text-base md:text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
