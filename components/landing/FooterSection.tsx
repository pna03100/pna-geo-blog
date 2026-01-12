/**
 * [Section] Footer - Clean, minimalist closure
 * [Design] Glassmorphism consistent with overall theme
 */

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

const quickLinks = [
  { label: "회사 소개", href: "#about" },
  { label: "서비스", href: "#solutions" },
  { label: "블로그", href: "/blog" },
  { label: "문의하기", href: "#contact" },
];

const services = [
  { label: "구글 애즈", href: "#google-ads" },
  { label: "SEO & GEO", href: "#seo" },
  { label: "워드프레스", href: "#wordpress" },
  { label: "퍼포먼스", href: "#performance" },
];

export function FooterSection() {
  return (
    <footer className="relative py-12 md:py-16 mt-0">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="PNA Company"
                width={140}
                height={40}
                className="w-auto h-9 mb-2"
              />
            </Link>
            <div className="text-sm text-slate-600 leading-relaxed space-y-1">
              <p className="font-bold text-slate-900">주식회사 피앤에이컴퍼니</p>
              <p>대표자: 안태민</p>
              <p>사업자등록번호: 845-81-02768</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4">빠른 링크</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-600 hover:text-[#2563EB] transition-colors font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4">서비스</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-slate-600 hover:text-[#2563EB] transition-colors font-medium"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4">문의</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-slate-600">
                <MapPin className="w-4 h-4 text-[#2563EB] mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">
                  경기 고양시 일산동구 백마로195<br />
                  SK엠시티 상가동 2층 2120호
                </span>
              </li>
              <li className="flex items-center gap-2 text-slate-600">
                <Phone className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                <div className="flex flex-col">
                  <a
                    href="tel:070-7733-7905"
                    className="hover:text-[#2563EB] transition-colors"
                  >
                    Tel: 070-7733-7905
                  </a>
                  <span className="text-slate-500">Fax: 031-908-2225</span>
                </div>
              </li>
              <li className="flex items-center gap-2 text-slate-600">
                <Mail className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                <a
                  href="mailto:pna0310@naver.com"
                  className="hover:text-[#2563EB] transition-colors"
                >
                  pna0310@naver.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} PNA Company. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-slate-600">
              <Link href="/privacy" className="hover:text-[#2563EB] transition-colors font-medium">
                개인정보처리방침
              </Link>
              <Link href="/terms" className="hover:text-[#2563EB] transition-colors font-medium">
                이용약관
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
