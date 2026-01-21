/**
 * [Section] Footer - Clean, minimalist closure
 * [Design] Glassmorphism consistent with overall theme
 */

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Printer } from "lucide-react";

const quickLinks = [
  { label: "회사소개", href: "/about" },
  { label: "서비스", href: "/#solutions" },
  { label: "인사이트", href: "/insights" },
  { label: "문의하기", href: "/contact" },
];

const services = [
  { label: "구글 애즈", href: "/google-ads" },
  { label: "SEO & GEO", href: "/seo-geo" },
  { label: "워드프레스", href: "/wordpress" },
  { label: "퍼포먼스", href: "/performance" },
];

export function FooterSection() {
  return (
    <footer className="relative bg-gradient-to-b from-slate-50 to-slate-100 backdrop-blur-sm border-t border-slate-200/50 overflow-hidden pt-16 md:pt-24 pb-8 md:pb-12 mt-0">
      {/* Elegant Gradient Top Border */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div 
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
          className="w-full h-full"
        />
      </div>
      
      {/* Giant Brand Typography Background - Ultra Subtle */}
      <div 
        className="absolute bottom-[-1rem] left-0 text-[8rem] md:text-[12rem] lg:text-[14rem] font-black text-slate-900/[0.02] leading-none pointer-events-none select-none z-0 whitespace-nowrap overflow-hidden"
        style={{ 
          letterSpacing: '-0.05em'
        }}
      >
        PERFORMANCE MARKETING
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6 max-w-7xl">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12 mb-12 md:mb-16">
          {/* Company Info */}
          <div className="lg:col-span-4 space-y-5 md:space-y-6">
            <Link href="/" className="inline-block group">
              <Image
                src="/logo.png"
                alt="PNA Company"
                width={160}
                height={42}
                className="w-auto h-9 md:h-10 mb-3 opacity-80 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105"
              />
            </Link>
            <div className="text-sm text-slate-600 leading-relaxed space-y-2">
              <p className="font-bold text-slate-900 text-base">주식회사 피앤에이컴퍼니</p>
              <p className="text-slate-500">대표자: 안태민</p>
              <p className="text-slate-500">사업자등록번호: 845-81-02768</p>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
              데이터 기반 성과 마케팅으로<br />비즈니스 성장을 만듭니다.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-slate-900 mb-4 md:mb-5 text-base">빠른 링크</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 hover:text-blue-600 hover:translate-x-1 transition-all duration-200 font-medium inline-flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-300 group-hover:bg-blue-600 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-slate-900 mb-4 md:mb-5 text-base">서비스</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-sm text-slate-600 hover:text-blue-600 hover:translate-x-1 transition-all duration-200 font-medium inline-flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-300 group-hover:bg-blue-600 transition-colors" />
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Map */}
          <div className="lg:col-span-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {/* Contact Info */}
              <div>
                <h4 className="font-bold text-slate-900 mb-4 md:mb-5 text-base">문의</h4>
                <ul className="space-y-3 md:space-y-4 text-sm">
                  <li className="flex items-start gap-3 text-slate-600">
                    <MapPin className="w-4 h-4 md:w-5 md:h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="leading-relaxed">
                      경기 고양시 일산동구 백마로195<br />
                      SK엠시티 상가동 2층 2120호
                    </span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-600">
                    <Phone className="w-4 h-4 md:w-5 md:h-5 text-blue-600 flex-shrink-0" />
                    <a
                      href="tel:070-7733-7905"
                      className="hover:text-blue-600 transition-colors"
                    >
                      Tel: 070-7733-7905
                    </a>
                  </li>
                  <li className="flex items-center gap-3 text-slate-600">
                    <Printer className="w-4 h-4 md:w-5 md:h-5 text-blue-600 flex-shrink-0" />
                    <span>Fax: 031-908-2225</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-600">
                    <Mail className="w-4 h-4 md:w-5 md:h-5 text-blue-600 flex-shrink-0" />
                    <a
                      href="/contact"
                      className="hover:text-blue-600 transition-colors"
                    >
                      문의하기
                    </a>
                  </li>
                </ul>
              </div>

              {/* Location Map */}
              <div className="lg:row-span-1">
                <a
                  href="https://www.google.com/maps/place/SK%EC%97%A0%EC%8B%9C%ED%8B%B0/@37.6543579,126.7681346,17z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group h-full"
                >
                  <div className="relative w-full h-full min-h-[200px] lg:min-h-0 rounded-2xl overflow-hidden border-2 border-slate-200 shadow-md hover:shadow-xl hover:border-blue-400 transition-all duration-300">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3158.780766513604!2d126.76813457652135!3d37.65435791908621!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c8546188e35e9%3A0xebe2b6747f0c7786!2zU0vsl6Dsi5zti7A!5e0!3m2!1sko!2skr!4v1768281891666!5m2!1sko!2skr"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="brightness-95 group-hover:brightness-100 transition-all duration-500"
                      title="PNA Company Location"
                    />
                    <div className="absolute inset-0 bg-slate-100/10 group-hover:bg-transparent transition-all pointer-events-none" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-200/60 pt-8 md:pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
            <p className="text-sm text-slate-500 font-medium">
              © {new Date().getFullYear()} PNA Company. All rights reserved.
            </p>
            <div className="flex items-center gap-6 md:gap-8 text-sm text-slate-600">
              <Link href="/privacy" className="hover:text-blue-600 transition-all duration-200 font-medium hover:underline underline-offset-4">
                개인정보처리방침
              </Link>
              <Link href="/terms" className="hover:text-blue-600 transition-all duration-200 font-medium hover:underline underline-offset-4">
                이용약관
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
