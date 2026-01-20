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

  useEffect(() => {
    const handleScroll = () => {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
      // 스크롤 10px 이상일 때 배경 강화
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMobileMenuOpen])

  return (
    <>
      {/* Fixed Header - Glassmorphism */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'border-b border-slate-200/50 bg-white/80 backdrop-blur-xl shadow-sm shadow-slate-900/5' 
          : 'border-b border-slate-100/0 bg-white/70 backdrop-blur-lg'
      }`}>
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          
          {/* Desktop Layout */}
          <div className="hidden lg:flex items-center justify-between h-20">
            
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <Image
                src="/logo.png"
                alt="PNA Company"
                width={150}
                height={38}
                priority
                className="w-auto h-9 transition-all duration-300 group-hover:opacity-80 group-hover:scale-105"
              />
            </Link>

            {/* Center Menu */}
            <nav className="flex items-center gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative px-4 py-2.5 text-sm font-semibold text-slate-700 hover:text-blue-600 transition-all duration-200 rounded-lg hover:bg-blue-50/80 group"
                >
                  <span className="relative z-10">{item.name}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <Link href="/contact">
              <button className="px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 hover:-translate-y-0.5">
                문의하기
              </button>
            </Link>
          </div>

          {/* Mobile Layout */}
          <div className="flex lg:hidden items-center justify-between h-18">
            
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <Image
                src="/logo.png"
                alt="PNA Company"
                width={130}
                height={34}
                priority
                className="w-auto h-8 transition-all duration-300 group-hover:opacity-80"
              />
            </Link>

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-lg text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
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
      {isMobileMenuOpen && (
        <div className="fixed top-18 left-0 right-0 z-40 lg:hidden border-b border-slate-200/50 shadow-xl shadow-slate-900/10">
          <div className="bg-white/95 backdrop-blur-xl">
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-5 py-3.5 text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 rounded-xl transition-all duration-200"
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-3 pb-1">
                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="block w-full px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm hover:from-blue-700 hover:to-indigo-700 transition-all duration-200">
                    문의하기
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
