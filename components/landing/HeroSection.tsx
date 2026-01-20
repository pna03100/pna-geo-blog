/**
 * [Section] Hero - Fizens-inspired SaaS Style
 * [Design] Left-aligned with sensory effects
 * [Performance] LCP Optimized - Server Component (H1 즉시 렌더링)
 */

import { HeroContent } from "./HeroContent";
import { HeroBackgroundTypo } from "./HeroBackgroundTypo";

export function HeroSection() {
  return (
    <>
      {/* SECTION: #HERO */}
      <section data-section="HERO" className="relative w-full overflow-hidden">
      
      {/* Background Text Watermark - Animated */}
      <HeroBackgroundTypo />
      
      {/* 🎯 LCP CRITICAL: Server-Rendered Content (JavaScript 없이 즉시 표시) */}
      <div className="container relative z-10 mx-auto px-4 md:px-6 lg:px-8 max-w-7xl pt-24 md:pt-32 lg:pt-40 pb-20 md:pb-28 lg:pb-32">
        <HeroContent />
      </div>
    </section>
    </>
  );
}
