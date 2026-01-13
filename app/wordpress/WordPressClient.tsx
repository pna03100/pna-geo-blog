/**
 * [Client] WordPress & SEO Service Page
 * Premium Red Theme
 * [Animation] Scroll-triggered entrance for sections
 */

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Code, Search, Zap, Globe, CheckCircle2, ArrowRight, Sparkles, Award, LineChart } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { WordPressFAQ } from "@/components/service/WordPressFAQ";

const services = [
  {
    icon: Code,
    title: "SEO 최적화 워드프레스 구축",
    description: "검색엔진과 AI가 이해하기 쉬운 시맨틱 구조로 사이트를 설계합니다.",
    color: "#DB4437" // Google Red
  },
  {
    icon: Search,
    title: "GEO 전략 (Generative Engine Optimization)",
    description: "ChatGPT, Perplexity 등 AI 검색 엔진에 최적화된 콘텐츠 구조를 제공합니다.",
    color: "#4285F4" // Google Blue
  },
  {
    icon: Zap,
    title: "페이지 속도 최적화",
    description: "Core Web Vitals 기준을 충족하는 초고속 로딩 속도를 보장합니다.",
    color: "#F4B400" // Google Yellow
  },
  {
    icon: Globe,
    title: "기술 SEO 컨설팅",
    description: "구조화된 데이터, 메타태그, 내부링크 등 기술적 SEO를 완벽하게 구현합니다.",
    color: "#0F9D58" // Google Green
  },
];

const features = [
  "검색 노출 최적화 설계",
  "반응형 디자인 (Mobile First)",
  "보안 강화 (OWASP 기준)",
  "Google Search Console 연동",
  "Schema Markup 구현",
  "평생 무료 기술 지원"
];

const benefits = [
  {
    title: "검색 노출 200% 증가",
    description: "SEO 최적화로 자연 검색 트래픽 대폭 상승"
  },
  {
    title: "광고비 절감",
    description: "자연 검색 노출로 유료 광고 의존도 감소"
  },
  {
    title: "브랜드 신뢰도 향상",
    description: "상위 노출을 통한 브랜드 권위 구축"
  }
];

export function WordPressClient() {
  return (
    <main className="min-h-screen pt-[73px]">
      {/* Hero Section - NO ANIMATION for LCP */}
      <section className="relative bg-gradient-to-br from-[#DB4437] via-[#DB4437] to-[#C33326] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6 max-w-7xl">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 mb-6">
              <Search className="w-4 h-4" />
              <span className="text-sm font-semibold">SEO & GEO 전문</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              워드프레스 & SEO 최적화
            </h1>

            <p className="text-xl text-red-100 leading-relaxed">
              검색엔진과 AI가 이해하는 웹사이트로<br className="hidden md:block" />
              자연 검색 트래픽을 200% 증가시키세요
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto px-4 md:px-6 max-w-7xl py-20">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-red-50 text-red-600 text-sm font-semibold mb-4">
            Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            핵심 서비스
          </h2>
          <p className="text-xl text-slate-600">
            검색 노출을 극대화하는 전문 솔루션
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div
                className="group p-8 rounded-2xl bg-white border border-slate-200 hover:border-red-200 hover:shadow-xl transition-all duration-300"
              >
              <div 
                className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${service.color}15` }}
              >
                <service.icon className="w-7 h-7" style={{ color: service.color }} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {service.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {service.description}
              </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gradient-to-br from-slate-50 to-red-50 py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn delay={0.1}>
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-red-200 text-red-600 text-sm font-semibold mb-4">
                  Benefits
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                  검색 최적화로<br />
                  얻을 수 있는 효과
                </h2>
                <div className="space-y-6">
                  {benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="p-6 rounded-xl bg-white border border-slate-200"
                    >
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{benefit.title}</h3>
                    <p className="text-slate-600">{benefit.description}</p>
                  </div>
                ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div>
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 rounded-xl bg-white border border-slate-200"
                    >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-600 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg text-slate-700">{feature}</span>
                  </div>
                ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <WordPressFAQ />

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-red-600 to-red-700 py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <FadeIn delay={0.1}>
            <div>
            <Sparkles className="w-12 h-12 text-white mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              검색 노출, 지금 바로 개선하세요
            </h2>
            <p className="text-xl text-red-100 mb-8">
              15년 노하우로 검증된 SEO 전략을 무료로 상담받아보세요
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-red-600 font-bold hover:bg-red-50 transition-all duration-300 shadow-lg"
              >
                <span>문의하기</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
