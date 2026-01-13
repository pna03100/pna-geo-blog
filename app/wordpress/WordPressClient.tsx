/**
 * [Client] WordPress Website Service Page
 * Premium Blue Theme (Brand Color: #2563EB)
 * [Animation] Scroll-triggered entrance for sections
 */

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Code, Palette, Zap, Shield, CheckCircle2, ArrowRight, Sparkles, Settings, Blocks, Workflow, Package, Lock } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { WordPressFAQ } from "@/components/service/WordPressFAQ";

const services = [
  {
    icon: Palette,
    title: "맞춤형 디자인 & 개발",
    description: "브랜드 아이덴티티에 맞춘 독창적인 워드프레스 테마를 제작합니다. 템플릿이 아닌, 완전히 맞춤 제작된 디자인을 제공합니다.",
    color: "#4285F4" // Google Blue
  },
  {
    icon: Zap,
    title: "빠른 속도 & 성능 최적화",
    description: "이미지 최적화, 캐싱, CDN 적용으로 초고속 로딩 속도를 구현합니다. 모바일에서도 쾌적한 사용자 경험을 보장합니다.",
    color: "#F4B400" // Google Yellow
  },
  {
    icon: Shield,
    title: "보안 & 유지보수",
    description: "정기적인 백업, 보안 플러그인, 악성코드 차단으로 안전한 사이트를 유지합니다. 업데이트와 긴급 복구도 지원합니다.",
    color: "#0F9D58" // Google Green
  },
  {
    icon: Settings,
    title: "관리자 교육 & 지원",
    description: "비개발자도 쉽게 콘텐츠를 업데이트할 수 있도록 직관적인 관리자 화면과 교육을 제공합니다. 평생 기술 지원이 포함됩니다.",
    color: "#DB4437" // Google Red
  },
];

const advancedServices = [
  {
    icon: Blocks,
    title: "Headless CMS & API 아키텍처",
    description: "워드프레스를 Headless CMS로 활용하여 Next.js, React, Vue 등 모던 프론트엔드와 연동합니다. REST API와 GraphQL을 통해 콘텐츠를 분리하여 관리하며, 멀티 플랫폼(웹, 앱, IoT)에 동일한 콘텐츠를 배포할 수 있습니다.",
    features: ["WP REST API", "WPGraphQL", "JWT 인증"]
  },
  {
    icon: Workflow,
    title: "커스텀 플러그인 & 테마 개발",
    description: "비즈니스 요구사항에 맞춘 완전 맞춤형 플러그인과 테마를 개발합니다. Gutenberg 블록 에디터 확장, Custom Post Types, Advanced Custom Fields(ACF) 설계로 관리자 경험을 혁신적으로 개선합니다.",
    features: ["Custom Gutenberg Blocks", "ACF Pro", "Custom Taxonomies"]
  },
  {
    icon: Package,
    title: "WooCommerce & 회원 시스템",
    description: "온라인 쇼핑몰 구축부터 결제 연동(PG사, PayPal, Stripe), 재고 관리, 배송 추적까지 E-Commerce 전체 솔루션을 제공합니다. 멤버십 사이트 구축 시 BuddyPress, MemberPress를 활용한 고급 회원 관리 시스템을 설계합니다.",
    features: ["PG 결제 연동", "쿠폰 & 프로모션", "정기 결제(Subscription)"]
  },
  {
    icon: Lock,
    title: "보안 강화 & 성능 최적화",
    description: "OWASP Top 10 취약점 점검, Wordfence/Sucuri 보안 플러그인 설정, SSL 인증서 적용, 2FA(2단계 인증) 구현으로 해킹을 원천 차단합니다. LiteSpeed Cache, Redis, Varnish를 활용한 엔터프라이즈급 캐싱 시스템으로 TPS 1000+ 처리 가능합니다.",
    features: ["WAF 방화벽", "CDN 연동", "Database 최적화"]
  }
];

const features = [
  "완전 반응형 디자인 (Mobile First)",
  "Google 검색 친화적인 구조",
  "보안 강화 (OWASP 기준)",
  "고급 플러그인 & 커스터마이징",
  "다국어 & 다중 사이트 지원",
  "평생 무료 기술 지원"
];

const benefits = [
  {
    title: "쉬운 콘텐츠 관리",
    description: "개발 지식 없이도 글, 이미지, 페이지를 자유롭게 추가하고 수정할 수 있습니다"
  },
  {
    title: "확장성 & 유연성",
    description: "쇼핑몰, 회원가입, 예약 시스템 등 비즈니스 성장에 맞춰 기능을 추가할 수 있습니다"
  },
  {
    title: "비용 효율적",
    description: "저렴한 호스팅 비용과 무료 플러그인으로 운영 비용을 최소화할 수 있습니다"
  }
];

export function WordPressClient() {
  return (
    <main className="min-h-screen pt-[73px]">
      {/* Hero Section - NO ANIMATION for LCP */}
      <section className="relative bg-gradient-to-br from-[#4285F4] via-[#4285F4] to-[#3367D6] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6 max-w-7xl">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 mb-6">
              <Code className="w-4 h-4" />
              <span className="text-sm font-semibold">Website Development</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              워드프레스 웹사이트 제작
            </h1>

            <p className="text-xl text-blue-100 leading-relaxed">
              비즈니스 성장을 위한 프리미엄 워드프레스 솔루션<br className="hidden md:block" />
              빠르고, 안전하고, 관리하기 쉬운 웹사이트를 만들어드립니다
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto px-4 md:px-6 max-w-7xl py-20">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-4">
            Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            핵심 서비스
          </h2>
          <p className="text-xl text-slate-600">
            비즈니스 성장을 위한 맞춤형 웹사이트
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div
                className="group p-8 rounded-2xl bg-white border border-slate-200 hover:border-blue-200 hover:shadow-xl transition-all duration-300"
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

      {/* Advanced Development Section */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-4">
              Advanced Development
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              고급 개발 & 커스터마이징
            </h2>
            <p className="text-xl text-slate-600">
              엔터프라이즈급 워드프레스 솔루션
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {advancedServices.map((service, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-blue-200 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center">
                      <service.icon className="w-7 h-7 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">
                        {service.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium"
                      >
                        <CheckCircle2 className="w-3 h-3 mr-1.5" />
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Expert Insight Box */}
          <FadeIn delay={0.4}>
            <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-start gap-4">
                  <Sparkles className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">
                      왜 워드프레스인가?
                    </h3>
                    <div className="space-y-3 text-slate-700 leading-relaxed">
                      <p>
                        <strong className="text-slate-900">• 전 세계 43% 점유율:</strong> 워드프레스는 전 세계 웹사이트의 43%를 차지하며, Fortune 500 기업 중 수백 곳이 사용하는 검증된 플랫폼입니다. White House, Sony Music, Microsoft News도 워드프레스로 운영됩니다.
                      </p>
                      <p>
                        <strong className="text-slate-900">• Headless CMS의 진화:</strong> 워드프레스를 백엔드(콘텐츠 관리)로만 활용하고, 프론트엔드는 Next.js, Gatsby 등 모던 프레임워크로 구현하는 'Headless WordPress' 아키텍처가 급부상하고 있습니다. 이는 빠른 속도와 유연한 디자인을 동시에 확보하는 전략으로, TechCrunch, The New York Times도 Headless 아키텍처를 채택했습니다.
                      </p>
                      <p>
                        <strong className="text-slate-900">• 무한한 확장성:</strong> 60,000개 이상의 무료 플러그인과 커스텀 개발로 쇼핑몰(WooCommerce), 회원제 사이트(MemberPress), 예약 시스템(Amelia), 포럼(bbPress), LMS(LearnDash) 등 모든 기능을 구현할 수 있습니다. REST API와 WPGraphQL로 모바일 앱, IoT, AI 챗봇과도 연동 가능합니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 md:px-6 max-w-7xl py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeIn delay={0.1}>
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-blue-200 text-blue-600 text-sm font-semibold mb-4">
                Benefits
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                워드프레스를 선택하는<br />
                이유
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
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg text-slate-700">{feature}</span>
                </div>
              ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ Section */}
      <WordPressFAQ />

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-600 py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <FadeIn delay={0.1}>
            <div>
            <Sparkles className="w-12 h-12 text-white mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              프리미엄 워드프레스 웹사이트를 만나보세요
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              비즈니스에 최적화된 맞춤형 솔루션을 무료로 상담받아보세요
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-blue-600 font-bold hover:bg-blue-50 transition-all duration-300 shadow-lg"
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
