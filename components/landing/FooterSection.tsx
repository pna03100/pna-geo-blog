/**
 * [Section] Footer - Careons Dark Style
 * [Design] Dark background with newsletter section
 */

"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ArrowRight, Instagram, Linkedin } from "lucide-react";
import { useState } from "react";

const navigationLinks = [
  { label: "홈", href: "/" },
  { label: "회사소개", href: "/about" },
  { label: "구글 애즈", href: "/google-ads" },
  { label: "워드프레스", href: "/wordpress" },
];

const otherLinks = [
  { label: "퍼포먼스", href: "/performance" },
  { label: "SEO & GEO", href: "/seo-geo" },
  { label: "인사이트", href: "/insights" },
  { label: "개인정보처리방침", href: "/privacy" },
];

export function FooterSection() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter 구독 로직 추가
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

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

      <div className="container relative z-10 mx-auto px-4 md:px-6 max-w-7xl py-16 md:py-20">
        {/* Top Section: Brand & Newsletter */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16 pb-16 border-b border-white/10">
          
          {/* Brand Section */}
          <div className="max-w-md">
            <Link href="/" className="inline-block group mb-4">
              <Image
                src="/logo.png"
                alt="PNA Company"
                width={140}
                height={36}
                className="w-auto h-9 transition-all duration-300 group-hover:opacity-80 brightness-0 invert"
              />
            </Link>
            <p className="text-white/70 text-sm leading-relaxed">
              데이터 기반 성과 마케팅으로 비즈니스 성장을 만듭니다.
            </p>
          </div>

          {/* Newsletter Section */}
          <div className="w-full md:w-auto md:min-w-[400px]">
            <h3 className="text-white font-bold text-lg mb-2">Newsletter</h3>
            <p className="text-white/60 text-sm mb-4">
              최신 마케팅 인사이트를 받아보세요.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@email.com"
                className="w-full px-5 py-3 pr-14 bg-white/10 border border-white/20 rounded-full text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500 focus:bg-white/15 transition-all"
                required
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              >
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </form>
          </div>
        </div>

        {/* Main Footer Grid: 4 Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          
          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2.5">
              {navigationLinks.map((link) => (
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

          {/* Other Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Other Links</h4>
            <ul className="space-y-2.5">
              {otherLinks.map((link) => (
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

          {/* Social Connect */}
          <div>
            <h4 className="text-white font-semibold mb-4">Social Connect</h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="https://www.linkedin.com/company/pna-company"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white text-sm transition-colors duration-200 inline-flex items-center gap-2 group"
                >
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all" />
                  Linkedin
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/pna_company"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white text-sm transition-colors duration-200 inline-flex items-center gap-2 group"
                >
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all" />
                  Instagram
                </a>
              </li>
              <li>
                <Link
                  href="/insights"
                  className="text-white/60 hover:text-white text-sm transition-colors duration-200 inline-flex items-center gap-2 group"
                >
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all" />
                  인사이트 블로그
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact us */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact us</h4>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li>
                <a
                  href="tel:+82-70-7733-7905"
                  className="hover:text-white transition-colors"
                >
                  +82 070-7733-7905
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@pnacompany.com"
                  className="hover:text-white transition-colors"
                >
                  contact@pnacompany.com
                </a>
              </li>
              <li className="text-white/50 leading-relaxed pt-2">
                경기 고양시 일산동구 백마로195<br />
                SK엠시티 상가동 2층 2120호
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
            <p>
              All copyrights reserved for @PNACompany
            </p>
            <p>
              Designed by PNA Company
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
