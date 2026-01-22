/**
 * [Component] Section Header - Unified Design
 * [Design] Left: Badge + Title | Right: Description (Bottom Aligned)
 */

interface SectionHeaderProps {
  badge: string;
  title: string;
  description: string;
  titleClassName?: string;
}

export function SectionHeader({ badge, title, description, titleClassName = "" }: SectionHeaderProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.5fr,1fr] gap-8 lg:gap-12 items-end mb-12 md:mb-16">
      {/* Left: Badge + Title */}
      <div>
        <div className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm mb-6">
          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
          {badge}
        </div>
        <h2 className={`text-3xl md:text-5xl font-bold text-slate-900 ${titleClassName}`} style={{ lineHeight: '1.35' }}>
          {title}
        </h2>
      </div>

      {/* Right: Description (Aligned to Bottom & Right) */}
      <div className="flex items-end justify-end">
        <p className="text-base md:text-lg text-slate-600 leading-relaxed text-right">
          {description}
        </p>
      </div>
    </div>
  );
}
