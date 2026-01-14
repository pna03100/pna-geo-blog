/**
 * [Client] Google Ads Service Page
 * Premium Blue Theme (Brand Color: #2563EB)
 * [Animation] Scroll-triggered entrance for sections
 */

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Target, TrendingUp, BarChart3, Zap, CheckCircle2, ArrowRight, Sparkles, Award, Shield, Brain, Layers, Activity, Users } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { GoogleAdsFAQ } from "@/components/service/GoogleAdsFAQ";

const services = [
  {
    icon: Target,
    title: "검색 광고 최적화",
    description: "의도 기반 타겟팅으로 정확한 고객에게 도달합니다.",
    color: "#4285F4" // Google Blue
  },
  {
    icon: TrendingUp,
    title: "ROAS 극대화",
    description: "데이터 분석을 통해 광고비 대비 매출을 최대 500% 향상시킵니다.",
    color: "#DB4437" // Google Red
  },
  {
    icon: BarChart3,
    title: "실시간 성과 리포팅",
    description: "투명한 대시보드로 실시간 광고 성과를 확인하세요.",
    color: "#F4B400" // Google Yellow
  },
  {
    icon: Zap,
    title: "AI 자동 입찰 전략",
    description: "구글 AI 기술을 활용한 스마트 입찰로 효율을 극대화합니다.",
    color: "#0F9D58" // Google Green
  },
];

const advancedServices = [
  {
    icon: Brain,
    title: "Performance Max (P-Max) 전략",
    description: "Google의 최신 AI 캠페인으로 검색, 디스플레이, YouTube, Gmail, Discover를 통합 운영합니다. 머신러닝이 실시간으로 최적의 광고 조합을 찾아 전환율을 극대화하며, Asset Group별 세밀한 성과 분석을 제공합니다.",
    features: ["Asset Group 최적화", "실시간 A/B 테스팅", "Cross-Channel 통합 전략"]
  },
  {
    icon: Layers,
    title: "Smart Bidding & 입찰 전략",
    description: "Target ROAS, Maximize Conversions, Target CPA 등 비즈니스 목표에 맞는 AI 입찰 전략을 설계합니다. Bid Adjustment, Ad Schedule, Device 타겟팅을 조합하여 광고 효율을 200% 이상 개선합니다.",
    features: ["tROAS/tCPA 최적화", "Enhanced CPC", "Portfolio Bidding"]
  },
  {
    icon: Activity,
    title: "Attribution & Conversion Tracking",
    description: "GA4, GTM, Server-Side Tracking을 활용한 정밀한 전환 추적 시스템을 구축합니다. Data-Driven Attribution으로 각 채널의 실제 기여도를 측정하고, Offline Conversion Import로 오프라인 매출도 연동합니다.",
    features: ["GA4 고급 설정", "Enhanced Conversions", "Offline Import"]
  },
  {
    icon: Users,
    title: "Audience & Remarketing 전략",
    description: "Customer Match, Similar Audiences, In-Market Audiences를 조합한 고급 오디언스 타겟팅을 제공합니다. RLSA(검색 리마케팅)와 Dynamic Remarketing으로 이탈 고객을 재유입시켜 전환율을 3배 이상 향상시킵니다.",
    features: ["Customer Match CRM 연동", "Dynamic Remarketing", "RLSA 전략"]
  }
];

const features = [
  "Google 공식 파트너 인증",
  "15년+ 광고 운영 노하우",
  "평균 ROAS 500% 달성",
  "월 1회 무료 전략 리포트",
  "실시간 성과 모니터링",
  "전담 광고 매니저 배정"
];

const process = [
  {
    step: "01",
    title: "무료 광고 진단",
    description: "현재 광고 계정을 분석하고 개선점을 찾아드립니다."
  },
  {
    step: "02",
    title: "맞춤 전략 수립",
    description: "비즈니스 목표에 맞는 광고 전략을 설계합니다."
  },
  {
    step: "03",
    title: "캠페인 구축 및 실행",
    description: "최적화된 광고 구조로 캠페인을 세팅하고 운영합니다."
  },
  {
    step: "04",
    title: "지속적인 최적화",
    description: "데이터 분석을 통해 지속적으로 성과를 개선합니다."
  }
];

export function GoogleAdsClient() {
  return (
    <main className="min-h-screen pt-[73px]">
      {/* Hero Section - NO ANIMATION for LCP */}
      <section className="relative bg-gradient-to-br from-[#4285F4] via-[#4285F4] to-[#3367D6] text-white py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Content */}
        <div className="container relative z-10 mx-auto px-4 md:px-6 max-w-7xl">
          <div className="max-w-4xl mx-auto text-center">
            {/* Heading - NO ANIMATION for SEO & LCP */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.35]">
              구글 애즈 광고 대행
            </h1>

            {/* Description - Instant Visibility */}
            <p className="text-xl text-blue-100 leading-relaxed">
              검색 광고부터 디스플레이, YouTube까지<br className="hidden md:block" />
              Google 공식 파트너가 직접 관리하는 프리미엄 광고 서비스
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-[1.4]">
            핵심 서비스
          </h2>
          <p className="text-xl text-slate-600">
            데이터 기반의 체계적인 광고 운영 시스템
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
              <h3 className="text-xl font-bold text-slate-900 mb-3 leading-[1.4]">
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

      {/* Advanced AI Strategy Section */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-4">
              Advanced Strategy
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-[1.4]">
              AI 기반 고급 광고 전략
            </h2>
            <p className="text-xl text-slate-600">
              Google 최신 AI 기술과 데이터 과학을 결합한 전문가 전략
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
                      <h3 className="text-xl font-bold text-slate-900 mb-2 leading-[1.4]">
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
                      왜 Google Ads AI 전략이 필수인가?
                    </h3>
                    <div className="space-y-3 text-slate-700 leading-relaxed">
                      <p>
                        <strong className="text-slate-900">• Performance Max의 혁신:</strong> 2023년 Google은 Smart Shopping과 Local 캠페인을 P-Max로 통합했습니다. P-Max는 전환 목표만 설정하면 AI가 자동으로 최적의 광고 조합을 찾아 노출합니다. 기존 캠페인 대비 평균 전환율 18% 증가, CPA 12% 감소 효과를 보이고 있습니다.
                      </p>
                      <p>
                        <strong className="text-slate-900">• Smart Bidding의 진화:</strong> Google AI는 70억 개 이상의 신호(Device, Location, Time, Browser, Past Behavior 등)를 실시간으로 분석하여 각 경매(Auction)마다 최적 입찰가를 결정합니다. 수동 입찰로는 불가능한 수준의 정밀도입니다. 특히 tROAS(Target ROAS) 전략은 광고비를 늘릴수록 효율이 개선되는 '규모의 경제' 효과를 냅니다.
                      </p>
                      <p>
                        <strong className="text-slate-900">• Attribution의 중요성:</strong> 고객은 구매 전 평균 7~13개의 터치포인트를 경험합니다. Last-Click Attribution(마지막 클릭만 인정)은 중간 기여 채널을 무시하여 의사결정을 왜곡합니다. Data-Driven Attribution은 머신러닝으로 각 터치포인트의 실제 기여도를 계산하여, 광고비를 진짜 효과 있는 채널에 재분배합니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 md:px-6 max-w-7xl py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <FadeIn delay={0.1}>
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-blue-200 text-blue-600 text-sm font-semibold mb-4">
                Why Choose Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6" style={{ lineHeight: '1.35' }}>
                피앤에이컴퍼니를<br />
                선택해야 하는 이유
              </h2>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3"
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

          {/* Right: Stats Card */}
          <FadeIn delay={0.2}>
            <div className="p-8 rounded-2xl bg-white shadow-xl border border-slate-200">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 rounded-xl bg-blue-50">
                <div className="text-4xl font-bold text-blue-600 mb-2">500%</div>
                <div className="text-sm text-slate-600">평균 ROAS</div>
              </div>
              <div className="text-center p-6 rounded-xl bg-green-50">
                <div className="text-4xl font-bold text-green-600 mb-2">100억+</div>
                <div className="text-sm text-slate-600">월 광고비 운영</div>
              </div>
              <div className="text-center p-6 rounded-xl bg-yellow-50">
                <div className="text-4xl font-bold text-yellow-600 mb-2">20억</div>
                <div className="text-sm text-slate-600">평균 예산 절감</div>
              </div>
              <div className="text-center p-6 rounded-xl bg-red-50">
                <div className="text-4xl font-bold text-red-600 mb-2">200+</div>
                <div className="text-sm text-slate-600">성공 캠페인</div>
              </div>
            </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-4">
            Process
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-[1.4]">
            광고 운영 프로세스
          </h2>
          <p className="text-xl text-slate-600">
            체계적인 4단계 프로세스로 성과를 보장합니다
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {process.map((item, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div
                className="relative p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
              >
              <div className="text-6xl font-bold text-blue-100 mb-4">{item.step}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 leading-[1.4]">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed">{item.description}</p>
              
              {/* Connector Arrow (except last) */}
              {index < process.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-blue-200">
                  <ArrowRight className="w-6 h-6" />
                </div>
              )}
              </div>
            </FadeIn>
          ))}
        </div>
        </div>
      </section>

      {/* FAQ Section */}
      <GoogleAdsFAQ />

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-600 py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <FadeIn delay={0.1}>
            <div>
            <Sparkles className="w-12 h-12 text-white mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-[1.4]">
              지금 바로 광고 효율을 개선하세요
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Google 공식 파트너가 직접 분석하는 무료 광고 상담을 받아보세요
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
