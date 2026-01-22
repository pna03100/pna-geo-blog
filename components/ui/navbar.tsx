/**
 * [UI] Navbar - Flat Design
 * [Design] Clean & Simple Navigation
 */

'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show navbar after initial hero animation
    const showTimer = setTimeout(() => {
      setIsVisible(true)
    }, 1500) // Show after 1.5s

    const handleScroll = () => {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
      // Show immediately on scroll
      if (window.scrollY > 50) {
        setIsVisible(true)
      }
      // 스크롤 10px 이상일 때 배경 강화
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      clearTimeout(showTimer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isMobileMenuOpen])

  return (
    <>
      {/* [Careons] Floating Glassmorphic Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
      }`}>
        <div className="container mx-auto px-4 md:px-6 max-w-7xl pt-4 md:pt-6">
          
          {/* [Careons] Rounded Container with Glassmorphism */}
          <div className={`rounded-full transition-all duration-300 ${
            isScrolled 
              ? 'bg-slate-900/90 backdrop-blur-xl shadow-2xl shadow-slate-900/20 border border-slate-700/50' 
              : 'bg-slate-900/70 backdrop-blur-md border border-slate-700/30'
          }`}>
          
          {/* Desktop Layout */}
          <div className="hidden lg:flex items-center justify-between h-16 px-6">
            
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <Image
                src="/logo.png"
                alt="PNA Company"
                width={130}
                height={34}
                priority
                className="w-auto h-8 transition-all duration-300 group-hover:opacity-80 group-hover:scale-105 brightness-0 invert"
              />
            </Link>

            {/* Center Menu */}
            <nav className="flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 py-2 text-sm font-semibold text-white/90 hover:text-white transition-all duration-200 hover:bg-white/10 rounded-full"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* [Careons] CTA Button - Blue Accent */}
            <Link href="/contact">
              <button className="px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105">
                문의하기
              </button>
            </Link>
          </div>

          {/* Mobile Layout */}
          <div className="flex lg:hidden items-center justify-between h-14 px-5">
            
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <Image
                src="/logo.png"
                alt="PNA Company"
                width={110}
                height={29}
                priority
                className="w-auto h-7 transition-all duration-300 group-hover:opacity-80 brightness-0 invert"
              />
            </Link>

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full text-white hover:bg-white/20 transition-all duration-200"
              aria-label={isMobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

          </div>
          
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown - Careons Style */}
      {isMobileMenuOpen && (
        <div className="fixed top-20 left-0 right-0 z-40 lg:hidden">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl shadow-slate-900/40 p-4">
              <div className="space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 text-sm font-semibold text-white/90 hover:text-white hover:bg-white/10 rounded-2xl transition-all duration-200"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-2">
                  <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="block w-full px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all duration-200">
                      문의하기
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
