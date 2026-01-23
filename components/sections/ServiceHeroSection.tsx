/**
 * [Component] Service Hero Section
 * [Design] Unified hero for all service pages
 * [Style] Consistent with main page hero
 */

"use client";

import Image from "next/image";
import { LucideIcon } from "lucide-react";
import { AnimatedBadge } from "@/components/ui/animated-badge";

interface ServiceHeroSectionProps {
  icon: LucideIcon;
  badgeText: string;
  title: string;
  description: string;
  backgroundImage: string;
  backgroundAlt: string;
}

export function ServiceHeroSection({
  icon,
  badgeText,
  title,
  description,
  backgroundImage,
  backgroundAlt,
}: ServiceHeroSectionProps) {
  return (
    <section className="relative min-h-[75vh] md:min-h-[80vh] flex items-end overflow-hidden pb-16 md:pb-20 lg:pb-24">
      {/* 1. Background Image */}
      <div className="absolute inset-0 z-0 bg-slate-900">
        <Image
          src={backgroundImage}
          alt={backgroundAlt}
          fill
          className="object-cover object-top"
          quality={100}
          priority
          fetchPriority="high"
          unoptimized={true}
          sizes="100vw"
        />
        {/* 2. Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/50 to-slate-900/70" />
        
        {/* 3. Blue Tint Overlay */}
        <div className="absolute inset-0 bg-blue-900/30 mix-blend-multiply" />
      </div>

      {/* 4. Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="mb-4 md:mb-6">
            <AnimatedBadge icon={icon} text={badgeText} />
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 md:mb-8" style={{ lineHeight: '1.25' }}>
            {title}
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl lg:text-2xl text-blue-100/90 leading-relaxed" style={{ maxWidth: '600px' }}>
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
