/**
 * [Section] Footer - Careons Dark Style
 * [Design] Dark background with 4-column layout
 */

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { LazyMap } from "./LazyMap";

const quickLinks = [
  { label: "회사소개", href: "/about" },
  { label: "서비스", href: "/google-ads" },
  { label: "인사이트", href: "/insights" },
  { label: "문의하기", href: "/contact" },
];

const serviceLinks = [
  { label: "구글 애즈", href: "/google-ads" },
  { label: "SEO & GEO", href: "/seo-geo" },
  { label: "워드프레스", href: "/wordpress" },
  { label: "퍼포먼스", href: "/performance" },
];

export function FooterSection() {
  return (
    <footer className="relative bg-black text-white overflow-hidden">
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div 
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
          className="w-full h-full"
        />
      </div>

      <div className="section-container relative z-10 max-w-7xl py-16 md:py-20">
        {/* Top Section: Brand */}
        <div className="mb-16 pb-16 border-b border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            {/* Left: Brand Section */}
            <div>
              <Link href="/" className="inline-block group mb-4">
                <Image
                  src="/logo.png"
                  alt="PNA Company"
                  width={140}
                  height={36}
                  className="w-auto h-9 transition-all duration-300 group-hover:opacity-80 brightness-0 invert"
                  loading="lazy"
                />
              </Link>
              <h3 className="text-white font-semibold text-base mb-2">주식회사 피앤에이컴퍼니</h3>
              <p className="text-white/60 text-sm mb-1">대표자: 안태민</p>
              <p className="text-white/60 text-sm">사업자등록번호: 845-81-02768</p>
            </div>

            {/* Right: Slogan - 모바일 숨김 */}
            <div className="hidden md:block md:text-right">
              <p className="text-white/70 text-base md:text-lg leading-relaxed text-right">
                데이터 기반 성과 마케팅으로<br />
                비즈니스 성장을 만듭니다.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Grid: 4 Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          
          {/* 빠른 링크 - 모바일 숨김 */}
          <div className="hidden md:block">
            <h4 className="text-white font-semibold mb-4">빠른 링크</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors duration-200 inline-flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 서비스 - 모바일 숨김 */}
          <div className="hidden md:block">
            <h4 className="text-white font-semibold mb-4">서비스</h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors duration-200 inline-flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 문의 */}
          <div>
            <h4 className="text-white font-semibold mb-4">문의</h4>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li className="text-white/50 leading-relaxed">
                경기 고양시 일산동구 백마로195<br />
                SK엠시티 상가1동 2층 2120호
              </li>
              <li>
                <a
                  href="tel:070-7733-7905"
                  className="hover:text-white transition-colors"
                >
                  Tel: 070-7733-7905
                </a>
              </li>
              <li>
                <a
                  href="fax:031-908-2225"
                  className="hover:text-white transition-colors"
                >
                  Fax: 031-908-2225
                </a>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-white/60 hover:text-white transition-colors duration-200 inline-flex items-center gap-2 group"
                >
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all" />
                  문의하기
                </Link>
              </li>
            </ul>
          </div>

          {/* 지도 */}
          <div>
            <a
              href="https://www.google.com/maps/place/SK%EC%97%A0%EC%8B%9C%ED%8B%B0/@37.6543579,126.7681346,17z"
              target="_blank"
              rel="noopener noreferrer"
              className="block group h-full"
            >
              <LazyMap />
            </a>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
            <p>
              © 2026 PNA Company. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-white transition-colors">
                개인정보처리방침
              </Link>
              <span>|</span>
              <Link href="/terms" className="hover:text-white transition-colors">
                이용약관
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
