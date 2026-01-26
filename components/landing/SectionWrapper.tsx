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
    <section id={id} className={cn("py-20 md:py-32 relative", className)}>
      <div className={cn("section-container", containerClassName)}>
        {children}
      </div>
    </section>
  );
}
