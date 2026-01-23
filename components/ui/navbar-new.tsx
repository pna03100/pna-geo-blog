/**
 * [UI] Navbar - Clean Design
 * [Design] Simple white navigation with blue CTA
 */

'use client'

import React, { useState, useEffect, useRef } from 'react'
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const navRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const pathname = usePathname()
  
  // 투명 히어로를 가진 페이지들
  const transparentHeroPages = ['/', '/about', '/google-ads', '/seo-geo', '/wordpress', '/performance', '/insights']
  const hasTransparentHero = transparentHeroPages.includes(pathname)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMobileMenuOpen])

  // 투명 히어로 페이지에서 스크롤 전: 투명 배경
  const getHeaderStyle = () => {
    if (hasTransparentHero && !isScrolled) {
      return 'bg-transparent'
    }
    if (isScrolled) {
      return 'bg-slate-50/90 backdrop-blur-xl shadow-sm border-b border-slate-200'
    }
    return 'bg-slate-50/70 backdrop-blur-lg'
  }

  // 투명 히어로 페이지에서 스크롤 전: 흰색 텍스트
  const getTextColor = (isActive: boolean) => {
    if (hasTransparentHero && !isScrolled) {
      return isActive ? 'text-white' : 'text-white/80 hover:text-white'
    }
    return isActive ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'
  }

  const getIconColor = () => {
    if (hasTransparentHero && !isScrolled) {
      return 'text-white'
    }
    return 'text-slate-900'
  }

  return (
    <>
      {/* Clean White Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getHeaderStyle()}`}>
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
                className={`w-auto h-8 transition-all duration-300 group-hover:opacity-80 ${
                  hasTransparentHero && !isScrolled ? 'brightness-0 invert' : ''
                }`}
              />
            </Link>

            {/* Navigation */}
            <div 
              className="relative"
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <nav className="relative flex items-center gap-8 pb-4">
                {navItems.map((item, index) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                  return (
                    <Link
                      key={item.name}
                      ref={(el) => {
                        navRefs.current[index] = el
                      }}
                      href={item.href}
                      onMouseEnter={() => setHoveredIndex(index)}
                      className={`relative text-base font-medium transition-colors duration-200 ${getTextColor(isActive)}`}
                    >
                      {item.name}
                    </Link>
                  )
                })}
              </nav>
              
              {/* Base continuous bar */}
              <div className={`absolute left-0 right-0 bottom-0 h-[3px] transition-colors duration-300 ${
                hasTransparentHero && !isScrolled ? 'bg-white/10' : 'bg-slate-300/30'
              }`} />
              
              {/* Animated gauge bar */}
              {(() => {
                const activeIndex = navItems.findIndex(item => 
                  pathname === item.href || pathname.startsWith(item.href + '/')
                )
                const displayIndex = hoveredIndex !== null ? hoveredIndex : activeIndex
                const targetRef = navRefs.current[displayIndex]
                
                if (displayIndex === -1 || !targetRef) return null
                
                const left = targetRef.offsetLeft
                const width = targetRef.offsetWidth
                
                return (
                  <div
                    className={`absolute bottom-0 h-[3px] transition-all duration-300 ease-out`}
                    style={{
                      left: `${left}px`,
                      width: `${width}px`,
                      backgroundColor: hasTransparentHero && !isScrolled ? 'white' : '#2563eb',
                      transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                    }}
                  />
                )
              })()}
            </div>

            {/* CTA Button */}
            <Link
              href="/contact"
              className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                hasTransparentHero && !isScrolled
                  ? 'bg-white/10 backdrop-blur-md text-white border border-white/30 hover:bg-white/20 hover:border-white/50 hover:shadow-lg hover:shadow-white/10'
                  : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/25'
              }`}
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
                className={`w-auto h-7 transition-all duration-300 ${
                  hasTransparentHero && !isScrolled ? 'brightness-0 invert' : ''
                }`}
              />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${
                hasTransparentHero && !isScrolled ? 'hover:bg-white/10' : 'hover:bg-slate-100'
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className={`w-6 h-6 ${getIconColor()}`} />
              ) : (
                <Menu className={`w-6 h-6 ${getIconColor()}`} />
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
