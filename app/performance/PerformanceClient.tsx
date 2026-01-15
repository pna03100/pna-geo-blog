/**
 * [Client] Performance Marketing Service Page
 * [Design] Professional B2B Tone - 2026
 * [Style] Multi-Channel Focus, Data-Driven
 */

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { 
  TrendingUp, Target, BarChart3, Zap, CheckCircle2, ArrowRight, 
  Sparkles, Search, Share2, Award, X 
} from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { TextReveal } from "@/components/ui/text-reveal";
import { PerformanceFAQ } from "@/components/service/PerformanceFAQ";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 섹션 2: 단일 채널 vs 통합 전략
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const comparison = {
  single: {
    title: "단일 채널 마케팅",
    channels: "Google Ads만 또는 Meta Ads만 또는 네이버 광고만",
    problems: [
      "채널 간 시너지 없음",
      "고객 여정 추적 불가",
      "최적 채널 믹스 파악 어려움"
    ]
  },
  integrated: {
    title: "퍼포먼스 마케팅 (통합 전략)",
    channels: "Google Ads + Meta + 네이버 + SEO",
    benefits: [
      "채널 간 데이터 연동",
      "전체 고객 여정 추적",
      "최적 예산 배분 (채널 믹스 최적화)",
      "멀티 터치 어트리뷰션"
    ],
    result: "단일 채널 대비 평균 40% 높은 ROAS"
  }
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 섹션 3: 멀티 채널 전략
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const channels = [
  {
    icon: Search,
    title: "Google Ads",
    role: "검색 의도 기반 즉시 전환",
    budget: "40~50%",
    suitable: [
      "구매 의도 명확한 키워드",
      "B2B 리드 생성",
      "이커머스 제품 판매"
    ]
  },
  {
    icon: Share2,
    title: "Meta Ads (Facebook, Instagram)",
    role: "관심사 기반 발견 & 리타겟팅",
    budget: "30~40%",
    suitable: [
      "비주얼 중심 제품 (패션, 뷰티)",
      "브랜드 인지도 확대",
      "리타겟팅 (장바구니 이탈자)"
    ]
  },
  {
    icon: Award,
    title: "네이버 광고",
    role: "한국 시장 특화",
    budget: "10~20%",
    suitable: [
      "로컬 비즈니스",
      "40대 이상 타겟",
      "네이버 쇼핑 활용"
    ]
  },
  {
    icon: TrendingUp,
    title: "SEO (자연 검색)",
    role: "장기 자산 구축",
    budget: "초기 투자 후 유지",
    suitable: [
      "모든 비즈니스",
      "광고비 절감",
      "브랜드 권위 구축"
    ]
  }
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 섹션 4: 데이터 기반 최적화
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const optimizationSteps = [
  {
    number: "1",
    title: "측정",
    items: [
      "GA4 전환 추적",
      "Meta Pixel, Google Tag Manager",
      "전화 추적 (콜 트래킹)",
      "매출 연동 (CRM, POS)"
    ]
  },
  {
    number: "2",
    title: "분석",
    items: [
      "ROAS (광고 수익률)",
      "CPA (고객 획득 비용)",
      "전환율 (채널별, 캠페인별)",
      "퍼널 분석 (이탈 구간 파악)"
    ]
  },
  {
    number: "3",
    title: "최적화",
    items: [
      "효율 낮은 광고 중단",
      "효율 높은 광고에 예산 재배분",
      "A/B 테스트 (소재, 타겟, 입찰)",
      "랜딩 페이지 CRO (전환율 최적화)"
    ]
  }
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 섹션 5: 검증된 성과
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const successCases = [
  {
    category: "이커머스 (패션)",
    challenge: "Google Ads만 월 800만원 집행, ROAS 1:3.2",
    strategy: [
      "Google Shopping 최적화",
      "Meta 리타겟팅 추가",
      "네이버 쇼핑 연동",
      "랜딩 페이지 A/B 테스트"
    ],
    period: "6개월",
    results: {
      channelMix: "Google 50% / Meta 35% / 네이버 15%",
      roas: "1:3.2 → 1:7.8 (2.4배 증가)",
      sales: "월 2,560만원 → 6,240만원"
    }
  },
  {
    category: "B2B SaaS (CRM)",
    challenge: "Google Ads 리드 단가 85,000원 (높음)",
    strategy: [
      "Long-tail 키워드 추가",
      "LinkedIn Ads 병행",
      "SEO 콘텐츠 마케팅",
      "리드 스코어링 시스템"
    ],
    period: "6개월",
    results: {
      channelMix: "Google 60% / LinkedIn 25% / SEO 15%",
      cpl: "85,000원 → 32,000원 (62% 절감)",
      conversion: "유료 전환율: 12% → 28%"
    }
  },
  {
    category: "로컬 비즈니스 (피부과)",
    challenge: "네이버 광고만 월 350만원, 예약 단가 높음",
    strategy: [
      "Google 로컬 광고 추가",
      "Meta 인스타그램 비주얼 광고",
      "네이버 블로그 SEO",
      "리뷰 관리 자동화"
    ],
    period: "3개월",
    results: {
      channelMix: "네이버 40% / Google 35% / Meta 25%",
      cpa: "예약 단가: 48,000원 → 18,500원",
      volume: "월 예약: 73건 → 189건"
    }
  }
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 섹션 6: 추천 대상
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const targetCustomers = {
  recommended: [
    "단일 채널만 운영 중인 경우",
    "광고비 월 300만원 이상 집행 중",
    "채널 간 데이터 연동 필요",
    "ROAS 개선이 필요한 경우",
    "멀티 채널 전략 수립 역량 부족"
  ],
  notRecommended: [
    "광고 예산 월 100만원 미만 (단일 채널 집중 권장)",
    "측정 시스템 구축 불가능 (웹사이트 없음)",
    "1~2개월 단기 캠페인 (셋업 기간 고려)"
  ]
};

export function PerformanceClient() {
  return (
    <main className="min-h-screen pt-[73px] relative">
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* HERO SECTION */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
        {/* 1. Background Image */}
        <div className="absolute inset-0 z-0 bg-slate-900">
          <Image
            src="/images/hero/performance-hero-bg.jpg.jpg"
            alt="Performance Marketing Background"
            fill
            className="object-cover"
            quality={40}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA5AAAAA//Z"
          />
          {/* 2. Dark Overlay */}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* 3. Content */}
        <div className="relative z-10 container mx-auto px-4 md:px-6 max-w-7xl text-center">
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8"
          >
            <BarChart3 className="w-4 h-4 text-white" />
            <span className="text-sm font-bold text-white">Performance Marketing</span>
          </motion.div>

          {/* Kinetic Typography Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ lineHeight: '1.35' }}>
            퍼포먼스 마케팅
          </h1>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg md:text-xl text-slate-200 font-medium max-w-3xl mx-auto"
          >
            측정 가능한 성과, 데이터 기반 최적화
          </motion.p>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* 단일 채널 vs 통합 전략 */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="border-t border-slate-200 bg-white py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4" style={{ lineHeight: '1.35' }}>
            퍼포먼스 마케팅이란
          </h2>
          <p className="text-xl text-slate-600">
            단일 채널 vs 멀티 채널 통합 전략
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* 단일 채널 */}
          <FadeIn delay={0.1}>
            <div className="p-10 rounded-2xl bg-white border-2 border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">{comparison.single.title}</h3>
              
              <div className="mb-6">
                <p className="text-base text-slate-700">{comparison.single.channels}</p>
              </div>

              <div>
                <div className="text-sm font-bold text-slate-500 uppercase mb-3">문제점</div>
                <ul className="space-y-2">
                  {comparison.single.problems.map((problem, index) => (
                    <li key={index} className="flex items-start gap-2 text-slate-700">
                      <X className="w-4 h-4 text-slate-400 flex-shrink-0 mt-1" />
                      <span className="text-sm">{problem}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>

          {/* 통합 전략 */}
          <FadeIn delay={0.2}>
            <div className="p-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white border-2 border-blue-600 shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-6">{comparison.integrated.title}</h3>
              
              <div className="mb-6">
                <p className="text-base text-white font-bold">{comparison.integrated.channels}</p>
              </div>

              <div className="mb-6">
                <div className="text-sm font-bold text-blue-100 uppercase mb-3">장점</div>
                <ul className="space-y-2">
                  {comparison.integrated.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-white flex-shrink-0 mt-1" />
                      <span className="text-sm text-white">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-blue-400">
                <p className="text-lg font-bold text-white">
                  결론: {comparison.integrated.result}
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* 멀티 채널 전략 */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="border-t border-slate-200 bg-slate-50 py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4" style={{ lineHeight: '1.35' }}>
              멀티 채널 전략
            </h2>
            <p className="text-xl text-slate-600">
              4대 채널 통합 관리
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {channels.map((channel, index) => {
              const Icon = channel.icon;
              return (
                <FadeIn key={index} delay={index * 0.1}>
                  <div className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                    {/* Icon & Title */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900" style={{ lineHeight: '1.35' }}>
                          {channel.title}
                        </h3>
                      </div>
                    </div>

                    {/* Role */}
                    <div className="mb-4">
                      <div className="text-xs font-bold text-slate-500 uppercase mb-2">역할</div>
                      <p className="text-base font-bold text-blue-600">{channel.role}</p>
                    </div>

                    {/* Budget */}
                    <div className="mb-4">
                      <div className="text-xs font-bold text-slate-500 uppercase mb-2">예산 배분</div>
                      <p className="text-base text-slate-700">{channel.budget}</p>
                    </div>

                    {/* Suitable */}
                    <div>
                      <div className="text-xs font-bold text-slate-500 uppercase mb-3">적합</div>
                      <ul className="space-y-2">
                        {channel.suitable.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* 데이터 기반 최적화 */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="border-t border-slate-200 bg-white py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4" style={{ lineHeight: '1.35' }}>
              데이터 기반 최적화
            </h2>
            <p className="text-xl text-slate-600">
              3단계 프로세스
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-8">
            {optimizationSteps.map((step, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="p-8 md:p-10 rounded-2xl bg-white border-2 border-slate-200">
                  <div className="flex items-start gap-6">
                    {/* Number */}
                    <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-2xl">
                      {step.number}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-slate-900 mb-4" style={{ lineHeight: '1.35' }}>
                        {step.title}
                      </h3>
                      <ul className="space-y-2">
                        {step.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* 검증된 성과 */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="border-t border-slate-200 bg-slate-50 py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4" style={{ lineHeight: '1.35' }}>
              검증된 성과
            </h2>
            <p className="text-xl text-slate-600">
              실제 프로젝트 결과
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {successCases.map((project, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300">
                  {/* Category */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-bold mb-4">
                    <Target className="w-4 h-4" />
                    {project.category}
                  </div>

                  {/* Challenge */}
                  <div className="mb-4 p-4 rounded-lg bg-slate-50">
                    <div className="text-xs font-bold text-slate-500 uppercase mb-2">과제</div>
                    <p className="text-sm text-slate-700">{project.challenge}</p>
                  </div>

                  {/* Strategy */}
                  <div className="mb-4">
                    <div className="text-xs font-bold text-slate-500 uppercase mb-3">적용 전략</div>
                    <ul className="space-y-2">
                      {project.strategy.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                          <CheckCircle2 className="w-3 h-3 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Period */}
                  <div className="mb-4">
                    <div className="text-xs font-bold text-slate-500 uppercase mb-2">기간</div>
                    <p className="text-sm font-bold text-slate-900">{project.period}</p>
                  </div>

                  {/* Results */}
                  <div className="pt-4 border-t border-slate-200">
                    <div className="text-xs font-bold text-slate-500 uppercase mb-3">성과</div>
                    <div className="space-y-2 text-sm">
                      {Object.entries(project.results).map(([key, value], idx) => (
                        <p key={idx} className="text-slate-700">
                          <span className="font-bold text-blue-600">{value}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* 추천 대상 */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="border-t border-slate-200 bg-white py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4" style={{ lineHeight: '1.35' }}>
              추천 대상
            </h2>
            <p className="text-xl text-slate-600">
              퍼포먼스 마케팅이 적합한지 확인하세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Recommended */}
            <FadeIn delay={0.1}>
              <div className="p-8 rounded-2xl bg-white border-2 border-blue-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    권장
                  </h3>
                </div>
                <ul className="space-y-3">
                  {targetCustomers.recommended.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-slate-700">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* Not Recommended */}
            <FadeIn delay={0.2}>
              <div className="p-8 rounded-2xl bg-white border-2 border-slate-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-slate-400 flex items-center justify-center">
                    <X className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    비권장
                  </h3>
                </div>
                <ul className="space-y-3">
                  {targetCustomers.notRecommended.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-slate-700">
                      <X className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* FAQ SECTION */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <PerformanceFAQ />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* CTA SECTION */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative bg-blue-600 py-16 md:py-20 overflow-hidden">
        <div className="container relative mx-auto px-4 md:px-6 max-w-4xl text-center text-white">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5" style={{ lineHeight: '1.3' }}>
            멀티 채널 통합 전략
          </h2>

          {/* Description */}
          <p className="text-base md:text-lg text-blue-50 mb-8 leading-relaxed">
            Google Ads, Meta, 네이버, SEO를 하나로
          </p>

          {/* CTA Button */}
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-blue-600 font-bold rounded-full hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl text-base"
          >
            <span>문의하기</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
