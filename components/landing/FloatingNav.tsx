/**
 * [Navigation] FloatingNav - Glassmorphism floating navbar
 * [Design] Pill-shaped, backdrop-blur, fixed position
 */

"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

const menuItems = [
  { label: "회사 소개", href: "#about" },
  { label: "Google Ads", href: "#google-ads" },
  { label: "SEO & GEO", href: "#seo" },
  { label: "WordPress", href: "#wordpress" },
  { label: "Performance", href: "#performance" },
  { label: "Insights", href: "/blog" },
];

export function FloatingNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

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
          "mx-auto max-w-6xl rounded-full",
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

        {/* CTA Button */}
        <Link href="#contact">
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
            문의하기
          </motion.button>
        </Link>
      </nav>
    </motion.header>
  );
}
