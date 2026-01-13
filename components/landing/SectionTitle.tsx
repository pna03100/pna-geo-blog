/**
 * [Component] Section Title
 * Reusable title component for all sections
 * No animation effects for better performance
 */

interface SectionTitleProps {
  badge: string;
  title: string;
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
      <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-white border border-slate-200 shadow-lg shadow-slate-900/5 text-blue-600 text-xs md:text-sm font-semibold mb-5 md:mb-7">
        {badge}
      </span>
      
      {/* Title */}
      <h2 className="text-3xl md:text-6xl font-bold text-slate-900 mb-4 md:mb-6 tracking-tight leading-snug" style={{ letterSpacing: '-1.5px' }}>
        {title}
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
