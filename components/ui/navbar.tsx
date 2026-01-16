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

  useEffect(() => {
    const handleScroll = () => {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMobileMenuOpen])

  return (
    <>
      {/* Fixed Header - Dark Mode Always */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          
          {/* Desktop Layout */}
          <div className="hidden lg:flex items-center justify-between h-16">
            
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <Image
                src="/logo.png"
                alt="PNA Company"
                width={140}
                height={36}
                priority
                className="w-auto h-8 brightness-0 invert transition-all duration-300 group-hover:scale-105 group-hover:opacity-80"
              />
            </Link>

            {/* Center Menu */}
            <nav className="flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 py-2 text-sm font-semibold text-white hover:text-blue-400 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <Link href="/contact">
              <button className="px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 hover:shadow-xl hover:shadow-blue-600/30 font-bold text-sm transition-all duration-300 shadow-lg shadow-blue-600/20">
                문의하기
              </button>
            </Link>
          </div>

          {/* Mobile Layout */}
          <div className="flex lg:hidden items-center justify-between h-16">
            
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <Image
                src="/logo.png"
                alt="PNA Company"
                width={120}
                height={32}
                priority
                className="w-auto h-7 brightness-0 invert transition-all duration-300 group-hover:scale-105 group-hover:opacity-80"
              />
            </Link>

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white hover:text-blue-400 transition-colors"
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
        <div className="fixed top-16 left-0 right-0 z-40 lg:hidden border-b border-white/10 shadow-lg">
          <div className="bg-black/95 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-2 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-sm font-semibold text-white hover:text-blue-400 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-2 pb-2">
                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="block w-full px-4 py-3 text-center text-sm font-bold rounded-md bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 hover:shadow-xl hover:shadow-blue-600/30 transition-all duration-300 shadow-lg shadow-blue-600/20">
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
