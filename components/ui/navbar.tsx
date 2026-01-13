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
import { Menu, X } from 'lucide-react'
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
      // Close mobile menu on scroll
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMobileMenuOpen])

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
        isScrolled 
          ? "bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-sm" 
          : "bg-transparent"
      )}>
        {/* Layout Container: Matches page max-width (max-w-7xl) */}
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          
          {/* Desktop Layout: 3-Column Grid */}
          <div className="hidden lg:grid grid-cols-[1fr_auto_1fr] items-center h-[73px]">
            
            {/* 1. Logo Zone (Left Align, No Background) */}
            <div className="flex justify-start">
              <Link 
                href="/" 
                className="flex items-center shrink-0"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <Image
                  src="/logo.png"
                  alt="PNA Company"
                  width={150}
                  height={40}
                  priority
                  className="w-auto h-8 md:h-10 transition-all duration-300"
                  style={{
                    filter: 'brightness(1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter = 'brightness(0) saturate(100%) invert(27%) sepia(98%) saturate(2542%) hue-rotate(216deg) brightness(102%) contrast(91%)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = 'brightness(1)';
                  }}
                />
              </Link>
            </div>

            {/* 2. Menu Zone (Center Align, Dynamic Background) */}
            <nav>
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
              <Link href="/contact">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-7 py-3 rounded-full bg-blue-600 text-white font-bold text-base shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-colors"
                >
                  문의하기
                </motion.button>
              </Link>
            </div>

          </div>

          {/* Mobile Layout: Logo + Hamburger */}
          <div className="flex lg:hidden items-center justify-between h-[73px]">
            
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center shrink-0"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <Image
                src="/logo.png"
                alt="PNA Company"
                width={150}
                height={40}
                priority
                className="w-auto h-8 transition-all duration-300"
                style={{
                  filter: 'brightness(1)',
                }}
                onTouchStart={(e) => {
                  e.currentTarget.style.filter = 'brightness(0) saturate(100%) invert(27%) sepia(98%) saturate(2542%) hue-rotate(216deg) brightness(102%) contrast(91%)';
                }}
                onTouchEnd={(e) => {
                  e.currentTarget.style.filter = 'brightness(1)';
                }}
              />
            </Link>

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-800 hover:text-blue-600 transition-colors"
              aria-label={isMobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

          </div>

        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[73px] left-0 right-0 z-40 lg:hidden"
          >
            <div className="max-w-7xl mx-auto px-4">
              <div className="bg-white/95 backdrop-blur-lg border border-slate-200/50 shadow-xl rounded-2xl p-4 mt-2 space-y-1">
                {navItems.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="group relative block px-3 py-2.5 text-sm font-semibold text-slate-800 rounded-lg transition-all overflow-hidden"
                  >
                    {/* Hover Background with Scale Effect */}
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-lg -z-10"
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                    
                    {/* Blue Dot + Text */}
                    <span className="relative flex items-center gap-2.5">
                      <motion.span
                        className="w-1.5 h-1.5 rounded-full bg-blue-600"
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      />
                      <span className="group-hover:text-blue-600 transition-colors">
                        {item.name}
                      </span>
                    </span>
                  </Link>
                ))}
                <div className="pt-3 border-t border-slate-200/50">
                  <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      className="block w-full px-3 py-2.5 text-center text-sm font-bold bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-shadow"
                    >
                      문의하기
                    </motion.button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
