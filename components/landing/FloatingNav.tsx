/**
 * [Navigation] FloatingNav - Glassmorphism floating navbar
 * [Design] Pill-shaped, backdrop-blur, fixed position
 */

"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { label: "회사 소개", href: "#about" },
  { label: "구글 애즈", href: "#google-ads" },
  { label: "SEO & GEO", href: "#seo" },
  { label: "워드프레스", href: "#wordpress" },
  { label: "퍼포먼스", href: "#performance" },
  { label: "인사이트", href: "/blog" },
];

export function FloatingNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  // Close mobile menu on scroll
  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isScrolled]);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      className={cn(
        "fixed top-6 left-0 right-0 z-50 transition-all duration-300",
        "px-4 md:px-6"
      )}
    >
      <nav
        className={cn(
          "mx-auto max-w-7xl rounded-full",
          "bg-white/70 backdrop-blur-lg",
          "border border-white/20",
          "shadow-lg shadow-black/5",
          "px-6 py-4",
          "flex items-center justify-between",
          "transition-all duration-300",
          isScrolled && "bg-white/80 shadow-xl"
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-sky-500 bg-clip-text text-transparent">
            PNA Company
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-8">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm font-medium text-slate-800 hover:text-blue-600 transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA Button - Desktop Only */}
        <Link href="tel:07077337905" className="hidden lg:block">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "px-6 py-2.5 rounded-full font-semibold text-sm",
              "bg-gradient-to-r from-blue-600 to-blue-500",
              "text-white",
              "shadow-lg shadow-blue-500/30",
              "transition-all duration-300"
            )}
          >
            무료 상담 신청
          </motion.button>
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-slate-800 hover:text-blue-600 transition-colors"
          aria-label={isMobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden mx-auto max-w-7xl px-4 mt-3"
          >
            <div className="bg-white/90 backdrop-blur-lg border border-white/20 shadow-xl rounded-3xl p-6 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-slate-800 hover:text-blue-600 hover:bg-blue-50/50 rounded-xl transition-all"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-slate-200/50">
                <Link
                  href="tel:07077337905"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full px-4 py-3 text-center text-sm font-semibold bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl shadow-lg shadow-blue-500/30"
                >
                  무료 상담 신청
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
