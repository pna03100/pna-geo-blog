/**
 * [UX] Floating Action Buttons
 * Share, CTA, and Scroll to Top buttons
 */

"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Share2, Phone } from "lucide-react";
import Link from "next/link";

export function FloatingActions() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const toggleVisibility = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.pageYOffset > 300) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    // Performance: passive 리스너로 스크롤 성능 개선
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("링크가 복사되었습니다!");
    }
  };

  return (
    <>
      {isVisible && (
        <div className="hidden md:flex fixed right-6 bottom-6 z-40 flex-col gap-4 animate-tab-fade-in">
          {/* CTA Button - Premium Blue */}
          <Link
            href="/contact"
            className="group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-xl shadow-blue-600/40 hover:shadow-2xl hover:shadow-blue-600/50 hover:scale-105 active:scale-95 transition-all duration-300"
            title="문의하기"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Phone className="w-6 h-6 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
            <span className="absolute right-20 px-4 py-2 rounded-xl bg-slate-900/95 backdrop-blur-sm text-white text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-xl pointer-events-none">
              문의하기
            </span>
          </Link>

          {/* Share Button - Premium Glass */}
          <button
            onClick={handleShare}
            className="group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/50 text-slate-700 shadow-xl shadow-slate-900/10 hover:shadow-2xl hover:shadow-blue-600/20 hover:scale-105 hover:border-blue-500/50 hover:text-blue-600 active:scale-95 transition-all duration-300"
            title="공유하기"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Share2 className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            <span className="absolute right-20 px-4 py-2 rounded-xl bg-slate-900/95 backdrop-blur-sm text-white text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-xl pointer-events-none">
              공유하기
            </span>
          </button>

          {/* Scroll to Top - Premium Glass */}
          <button
            onClick={scrollToTop}
            className="group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/50 text-slate-700 shadow-xl shadow-slate-900/10 hover:shadow-2xl hover:shadow-blue-600/20 hover:scale-105 hover:border-blue-500/50 hover:text-blue-600 active:scale-95 transition-all duration-300"
            title="맨 위로"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <ArrowUp className="w-5 h-5 relative z-10 group-hover:-translate-y-1 transition-transform duration-300" />
            <span className="absolute right-20 px-4 py-2 rounded-xl bg-slate-900/95 backdrop-blur-sm text-white text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-xl pointer-events-none">
              맨 위로
            </span>
          </button>
        </div>
      )}
    </>
  );
}
