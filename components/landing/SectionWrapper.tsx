/**
 * [Layout] SectionWrapper - Consistent section spacing
 * [Design] No hard borders, seamless flow
 */

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
}

export function SectionWrapper({
  children,
  className = "",
  containerClassName = "",
  id,
}: SectionWrapperProps) {
  return (
    <section id={id} className={cn("py-12 md:py-32 relative", className)}>
      <div className={cn("container mx-auto px-4 md:px-6 max-w-7xl", containerClassName)}>
        {children}
      </div>
    </section>
  );
}
