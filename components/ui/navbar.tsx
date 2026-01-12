/**
 * [UI] Navbar - Decoupled 3-Column Grid Layout
 * [Design] Logo (Left) | Menu Pill (Center) | CTA (Right)
 * [Alignment] Matches page max-w-7xl container
 */

'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const navItems = [
  { name: '구글 애즈', href: '/google-ads' },
  { name: '워드프레스', href: '/wordpress' },
  { name: '퍼포먼스', href: '/performance' },
  { name: '인사이트', href: '/insights' },
]

export function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
      isScrolled 
        ? "bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-sm" 
        : "bg-transparent"
    )}>
      {/* Layout Container: Matches page max-width (max-w-7xl) */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-[1fr_auto_1fr] items-center h-[73px]">
        
        {/* 1. Logo Zone (Left Align, No Background) */}
        <div className="flex justify-start">
          <Link 
            href="/" 
            className="flex items-center hover:opacity-80 transition-opacity shrink-0"
          >
            <Image
              src="/logo.png"
              alt="PNA Company"
              width={150}
              height={40}
              priority
              className="w-auto h-10"
            />
          </Link>
        </div>

        {/* 2. Menu Zone (Center Align, Dynamic Background) */}
        <nav className="hidden lg:block">
          <ul className={cn(
            "flex items-center gap-1 rounded-full px-3 py-2 transition-all duration-300",
            isScrolled
              ? "bg-transparent shadow-none border-0"
              : "bg-white/90 backdrop-blur-md border border-slate-200 shadow-lg shadow-slate-200/20"
          )}>
            {navItems.map((item, index) => (
              <li key={item.name} className="relative">
                <Link
                  href={item.href}
                  className="relative px-5 py-2.5 text-base font-semibold flex items-center justify-center rounded-full transition-all duration-300"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Hover Background (Light Blue Pill) */}
                  <AnimatePresence>
                    {hoveredIndex === index && (
                      <motion.span
                        className="absolute inset-0 bg-blue-50 rounded-full -z-10"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Content: The Fizens Dot + Text */}
                  <div className="flex items-center relative z-10">
                    {/* The Blue Dot (Grows on Hover) */}
                    <motion.span
                      initial={{ width: 0, opacity: 0, marginRight: 0 }}
                      animate={{ 
                        width: hoveredIndex === index ? 6 : 0, 
                        opacity: hoveredIndex === index ? 1 : 0,
                        marginRight: hoveredIndex === index ? 8 : 0
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="h-1.5 rounded-full bg-blue-600 block"
                    />
                    
                    {/* Text */}
                    <span className={cn(
                      "transition-colors duration-200 whitespace-nowrap",
                      hoveredIndex === index ? "text-[#2563EB]" : "text-slate-600"
                    )}>
                      {item.name}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* 3. CTA Button Zone (Right Align) */}
        <div className="flex justify-end">
          <a href="tel:07077337905">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-7 py-3 rounded-full bg-blue-600 text-white font-bold text-base shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-colors"
            >
              무료 상담 신청
            </motion.button>
          </a>
        </div>

      </div>
    </header>
  )
}
