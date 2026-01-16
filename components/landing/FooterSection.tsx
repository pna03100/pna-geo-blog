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
    <footer className="relative bg-[#0B0C10] overflow-hidden pt-8 md:pt-16 pb-8 md:pb-16 mt-0">
      {/* Glowing Gradient Top Border - Electric Blue */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#2563EB] to-transparent opacity-70" />
      
      {/* Giant Brand Typography Background - Electric Blue Glow */}
      <div 
        className="absolute bottom-[-2rem] left-0 text-[8rem] md:text-[12rem] lg:text-[16rem] font-black text-blue-600/5 leading-none pointer-events-none select-none z-0 whitespace-nowrap overflow-hidden"
        style={{ 
          textShadow: '0 0 80px rgba(37, 99, 235, 0.15)',
          letterSpacing: '-0.05em'
        }}
      >
        PNA GROWTH
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6 max-w-7xl">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-8 mb-8 md:mb-12">
          {/* Company Info */}
          <div className="lg:col-span-3 space-y-3 md:space-y-4">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="PNA Company"
                width={140}
                height={40}
                className="w-auto h-7 md:h-9 mb-2 brightness-0 invert opacity-40 hover:opacity-60 transition-opacity"
              />
            </Link>
            <div className="text-xs md:text-sm text-slate-400 leading-relaxed space-y-0.5 md:space-y-1">
              <p className="font-bold text-white">주식회사 피앤에이컴퍼니</p>
              <p>대표자: 안태민</p>
              <p>사업자등록번호: 845-81-02768</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-white mb-3 md:mb-4 text-sm md:text-base">빠른 링크</h4>
            <ul className="space-y-1.5 md:space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs md:text-sm text-slate-400 hover:text-[#60A5FA] transition-colors font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-white mb-3 md:mb-4 text-sm md:text-base">서비스</h4>
            <ul className="space-y-1.5 md:space-y-2">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-xs md:text-sm text-slate-400 hover:text-[#60A5FA] transition-colors font-medium"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Map */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              {/* Contact Info */}
              <div>
                <h4 className="font-bold text-white mb-3 md:mb-4 text-sm md:text-base">문의</h4>
                <ul className="space-y-2 md:space-y-3 text-xs md:text-sm">
                  <li className="flex items-start gap-2 text-slate-400">
                    <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#60A5FA] mt-0.5 flex-shrink-0" />
                    <span className="leading-relaxed">
                      경기 고양시 일산동구 백마로195<br />
                      SK엠시티 상가동 2층 2120호
                    </span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-400">
                    <Phone className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#60A5FA] flex-shrink-0" />
                    <a
                      href="tel:070-7733-7905"
                      className="hover:text-[#60A5FA] transition-colors"
                    >
                      Tel: 070-7733-7905
                    </a>
                  </li>
                  <li className="flex items-center gap-2 text-slate-400">
                    <Printer className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#60A5FA] flex-shrink-0" />
                    <span>Fax: 031-908-2225</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-400">
                    <Mail className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#60A5FA] flex-shrink-0" />
                    <a
                      href="/contact"
                      className="hover:text-[#60A5FA] transition-colors"
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
                  <div className="relative w-full h-full min-h-[180px] lg:min-h-0 rounded-xl overflow-hidden border border-slate-700 shadow-sm hover:shadow-lg hover:border-blue-500 transition-all">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3158.780766513604!2d126.76813457652135!3d37.65435791908621!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c8546188e35e9%3A0xebe2b6747f0c7786!2zU0vsl6Dsi5zti7A!5e0!3m2!1sko!2skr!4v1768281891666!5m2!1sko!2skr"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="brightness-90 group-hover:brightness-100 transition-all duration-500"
                      title="PNA Company Location"
                    />
                    <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-all pointer-events-none" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
            <p className="text-xs md:text-sm text-slate-500">
              © {new Date().getFullYear()} PNA Company. All rights reserved.
            </p>
            <div className="flex items-center gap-4 md:gap-6 text-xs md:text-sm text-slate-400">
              <Link href="/privacy" className="hover:text-[#60A5FA] transition-colors font-medium">
                개인정보처리방침
              </Link>
              <Link href="/terms" className="hover:text-[#60A5FA] transition-colors font-medium">
                이용약관
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
