/**
 * [Component] Section Header - Unified Design
 * [Design] Vertical Layout (Badge → Title → Description)
 */

interface SectionHeaderProps {
  badge: string;
  title: string;
  description: string;
  titleClassName?: string;
}

export function SectionHeader({ badge, title, description, titleClassName = "" }: SectionHeaderProps) {
  return (
    <div className="mb-12 md:mb-16">
      {/* Badge */}
      <div className="badge-dot mb-6">
        {badge}
      </div>
      
      {/* Title */}
      <h2 className={`section-title mb-6 ${titleClassName}`}>
        {title}
      </h2>
      
      {/* Description */}
      <p className="section-description max-w-3xl">
        {description}
      </p>
    </div>
  );
}
