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
        <div className="fixed right-6 bottom-6 z-40 flex flex-col gap-3 animate-tab-fade-in">
          {/* CTA Button */}
          <Link
            href="/contact"
            className="group flex items-center justify-center w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 will-change-transform"
            title="문의하기"
          >
            <Phone className="w-5 h-5" />
            <span className="absolute right-16 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              문의하기
            </span>
          </Link>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="group flex items-center justify-center w-14 h-14 rounded-full bg-white border border-slate-200 text-slate-700 shadow-lg hover:shadow-xl hover:-translate-y-0.5 hover:border-blue-600 hover:text-blue-600 active:scale-[0.98] transition-all duration-200 will-change-transform"
            title="공유하기"
          >
            <Share2 className="w-5 h-5" />
            <span className="absolute right-16 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              공유하기
            </span>
          </button>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="group flex items-center justify-center w-14 h-14 rounded-full bg-white border border-slate-200 text-slate-700 shadow-lg hover:shadow-xl hover:-translate-y-0.5 hover:border-blue-600 hover:text-blue-600 active:scale-[0.98] transition-all duration-200 will-change-transform"
            title="맨 위로"
          >
            <ArrowUp className="w-5 h-5" />
            <span className="absolute right-16 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              맨 위로
            </span>
          </button>
        </div>
      )}
    </>
  );
}
