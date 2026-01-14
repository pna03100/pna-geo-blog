/**
 * [UI] Navbar - Floating Command Center (Neo-Tech 2026)
 * [Design] Appears on scroll as glassmorphism pill
 * [Behavior] Spring animation with magnetic CTA
 */

'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navItems = [
  { name: '회사소개', href: '/about' },
  { name: '구글 애즈', href: '/google-ads' },
  { name: 'SEO & GEO', href: '/seo-geo' },
  { name: '워드프레스', href: '/wordpress' },
  { name: '퍼포먼스', href: '/performance' },
  { name: '인사이트', href: '/insights' },
]

export function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
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
      {/* Floating Command Center - Appears after 1 second */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 100, 
          damping: 20,
          delay: 1
        }}
        className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
      >
        <div className="w-full max-w-5xl bg-white/80 backdrop-blur-xl border border-white/20 shadow-lg shadow-blue-900/5 rounded-full px-6 py-3">
          
          {/* Desktop Layout: Logo + Menu + CTA */}
          <div className="hidden lg:flex items-center justify-between gap-8">
            
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <Image
                src="/logo.png"
                alt="PNA Company"
                width={120}
                height={32}
                priority
                className="w-auto h-7"
              />
            </Link>

            {/* Center Menu */}
            <nav className="flex items-center gap-1">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative px-4 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors rounded-full"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <AnimatePresence>
                    {hoveredIndex === index && (
                      <motion.span
                        className="absolute inset-0 bg-blue-50 rounded-full -z-10"
                        layoutId="navbar-hover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </AnimatePresence>
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <Link href="/contact">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 rounded-full bg-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-500/30"
              >
                문의하기
              </motion.button>
            </Link>
          </div>

          {/* Mobile Layout: Logo + Hamburger */}
          <div className="flex lg:hidden items-center justify-between">
            
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <Image
                src="/logo.png"
                alt="PNA Company"
                width={100}
                height={28}
                priority
                className="w-auto h-6"
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
      </motion.header>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-0 right-0 z-40 lg:hidden px-4"
          >
            <div className="bg-white/95 backdrop-blur-lg border border-slate-200/50 shadow-xl rounded-2xl p-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="group relative block px-4 py-3 text-sm font-semibold text-slate-800 rounded-lg transition-all overflow-hidden hover:bg-blue-50"
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-3 border-t border-slate-200/50">
                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    className="block w-full px-4 py-3 text-center text-sm font-bold bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg shadow-lg shadow-blue-500/30"
                  >
                    문의하기
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
