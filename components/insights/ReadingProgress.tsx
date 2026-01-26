/**
 * [UX] Reading Progress Bar
 * Shows scroll progress at the top of the page
 */

"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.pageYOffset;
          const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          const scrollPercent = (scrollTop / docHeight) * 100;
          
          setProgress(scrollPercent);
          setIsVisible(scrollTop > 10);
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {isVisible && (
        <div 
          className="fixed top-16 left-0 h-1 bg-blue-600 origin-left z-40 transition-opacity duration-150"
          style={{ width: `${progress}%`, zIndex: 40 }}
        />
      )}
    </>
  );
}
