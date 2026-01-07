// ============================================
// [GEO] Hero Section Component
// Trinity: Dynamic WordPress Data + Modern Design
// ============================================

import { Button } from '@/components/ui/button';

// [Security] Props Interface with Optional Fields
interface HeroSectionComponentProps {
  title: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaUrl?: string;
  imageSrc?: string; // Optional image from WordPress
}

export function HeroSection({
  title,
  subtitle,
  description,
  ctaText,
  ctaUrl,
  imageSrc,
}: HeroSectionComponentProps) {
  return (
    <section className="relative w-full min-h-[600px] flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* [GEO] Background Pattern for Visual Appeal */}
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
      
      {/* [Security] Container with Max Width */}
      <div className="relative z-10 container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
          {/* [GEO] Subtitle with Statistics */}
          {subtitle && (
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/90 backdrop-blur-sm">
              {subtitle}
            </div>
          )}
          
          {/* [GEO] Main Heading - AI-Readable */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            {title}
          </h1>
          
          {/* [GEO] Description with Expert Citations */}
          {description && (
            <p className="text-lg md:text-xl text-white/70 max-w-2xl">
              {description}
            </p>
          )}
          
          {/* [Implementation] CTA Button */}
          {ctaText && ctaUrl && (
            <div className="pt-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-purple-900 hover:bg-white/90 font-semibold px-8 py-6 text-lg"
              >
                <a href={ctaUrl}>{ctaText}</a>
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* [GEO] Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
    </section>
  );
}

