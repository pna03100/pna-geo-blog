/**
 * [Section] Footer - Clean, minimalist closure
 * [Design] Glassmorphism consistent with overall theme
 */

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

const quickLinks = [
  { label: "회사 소개", href: "#about" },
  { label: "서비스", href: "#solutions" },
  { label: "블로그", href: "/blog" },
  { label: "문의하기", href: "#contact" },
];

const services = [
  { label: "Google Ads", href: "#google-ads" },
  { label: "SEO & GEO", href: "#seo" },
  { label: "WordPress", href: "#wordpress" },
  { label: "Performance", href: "#performance" },
];

export function FooterSection() {
  return (
    <footer className="relative py-20 mt-32">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
              PNA Company
            </h3>
            <p className="text-slate-700 leading-relaxed font-medium">
              데이터 기반 성과 마케팅 전문
              <br />
              Google Ads · SEO · GEO 최적화
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-slate-950 mb-4">빠른 링크</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-700 hover:text-blue-600 transition-colors font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-slate-950 mb-4">서비스</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-slate-700 hover:text-blue-600 transition-colors font-medium"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-slate-950 mb-4">문의</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-slate-700 font-medium">
                <Mail className="w-4 h-4 text-blue-600" />
                <a
                  href="mailto:contact@pnamarketing.co.kr"
                  className="hover:text-blue-600 transition-colors"
                >
                  contact@pnamarketing.co.kr
                </a>
              </li>
              <li className="flex items-center gap-2 text-slate-700 font-medium">
                <Phone className="w-4 h-4 text-blue-600" />
                <span>02-1234-5678</span>
              </li>
              <li className="flex items-center gap-2 text-slate-700 font-medium">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>서울특별시 강남구</span>
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
              <Link href="#" className="hover:text-blue-600 transition-colors font-medium">
                개인정보처리방침
              </Link>
              <Link href="#" className="hover:text-blue-600 transition-colors font-medium">
                이용약관
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
