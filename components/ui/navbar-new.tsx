/**
 * [UI] Navbar - Clean Design
 * [Design] Simple white navigation with blue CTA
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

export function NavbarNew() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMobileMenuOpen])

  return (
    <>
      {/* Clean White Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-50/90 backdrop-blur-xl shadow-sm border-b border-slate-200' 
          : 'bg-slate-50/70 backdrop-blur-lg'
      }`}>
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          
          {/* Desktop Layout */}
          <div className="hidden lg:flex items-center justify-between h-20">
            
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

            {/* Navigation */}
            <nav className="flex items-center gap-8">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-base font-medium transition-colors duration-200 ${
                      isActive 
                        ? 'text-slate-900' 
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </nav>

            {/* CTA Button */}
            <Link
              href="/contact"
              className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/25"
            >
              문의하기
            </Link>
          </div>

          {/* Mobile Layout */}
          <div className="flex lg:hidden items-center justify-between h-16">
            
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="PNA Company"
                width={110}
                height={28}
                priority
                className="w-auto h-7"
              />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-900" />
              ) : (
                <Menu className="w-6 h-6 text-slate-900" />
              )}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          
          <div className="fixed top-16 left-0 right-0 bg-slate-50 border-b border-slate-200 shadow-xl">
            <nav className="container mx-auto px-4 py-6 space-y-4">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block text-lg font-medium transition-colors ${
                      isActive 
                        ? 'text-blue-600' 
                        : 'text-slate-700 hover:text-blue-600'
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              })}
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full px-6 py-3 rounded-xl bg-blue-600 text-white text-center font-semibold"
              >
                문의하기
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
