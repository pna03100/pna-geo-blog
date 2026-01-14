/**
 * [Client] SEO & GEO Service Page
 * [Design] Professional B2B Tone - 2026
 * [Style] Impact-Driven, Data-Focused, No Emoji
 */

"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  ArrowRight, Target, Award, CheckCircle2, X, 
  BarChart3, Clock, Rocket, Brain
} from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { SEOFAQ } from "@/components/service/SEOFAQ";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 섹션 2: 광고 vs SEO 비교
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const adVsSeo = {
  ads: {
    title: "광고",
    subtitle: "Google Ads, Meta",
    investment: "연 투자: 6,000만원",
    assetValue: "12개월 후 자산 가치: 0원",
    note: "광고 중단 시 트래픽 소멸"
  },
  seo: {
    title: "SEO",
    subtitle: "검색엔진 최적화",
    investment: "초기 투자: 1,800만원 (6개월)",
    assetValue: "12개월 후 자산 가치: 연 3,600만원",
    note: "지속적 트래픽 확보"
  }
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 섹션 3: 검증된 성과
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const overallPerformance = {
  totalProjects: 87,
  averageROI: "8.2배",
  averagePayback: "6.3개월",
  top10Rate: "92%"
};

const representativeCases = [
  {
    category: "B2B SaaS (HR)",
    challenge: "광고비 월 800만원 소진, 낮은 전환율",
    period: "8개월",
    results: [
      "검색 유입 75배 증가",
      "광고비 75% 절감",
      "ROI 12배"
    ]
  },
  {
    category: "이커머스 (가구)",
    challenge: "유료 광고 의존도 90%",
    period: "6개월",
    results: [
      "자연 검색 비율 12% → 68%",
      "월 매출 6.8배 증가",
      "ROI 5.4배"
    ]
  }
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 섹션 4: 업종별 전략
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const industryStrategies = [
  {
    title: "이커머스",
    target: "Product 키워드 20개",
    period: "6개월",
    investment: "1,800만원",
    expectedROI: "5~7배",
    strategies: [
      "Product Schema 적용",
      "비교 콘텐츠 제작",
      "리뷰 최적화"
    ]
  },
  {
    title: "B2B SaaS",
    target: "Solution 키워드 15개",
    period: "6개월",
    investment: "2,400만원",
    expectedROI: "7~10배",
    strategies: [
      "경쟁사 비교 콘텐츠",
      "무료 툴 제작",
      "Use Case 중심"
    ]
  },
  {
    title: "로컬 비즈니스",
    target: "Local 키워드 10개",
    period: "3개월",
    investment: "1,200만원",
    expectedROI: "6~8배",
    strategies: [
      "Google Business 최적화",
      "리뷰 관리 자동화",
      "로컬 백링크"
    ]
  },
  {
    title: "콘텐츠 미디어",
    target: "Topic 키워드 50개",
    period: "6개월",
    investment: "2,400만원",
    expectedRevenue: "월 1,500만원",
    strategies: [
      "Topic Cluster 구조",
      "E-E-A-T 강화",
      "전문가 협업"
    ]
  }
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 섹션 5: 투자 구조
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const investmentTiers = [
  {
    tier: "스타트업",
    price: "월 200만원 × 6개월",
    includes: [
      "기술 SEO 세팅",
      "키워드 30개",
      "월 콘텐츠 6~8개",
      "월간 리포트"
    ],
    performance: {
      keywords: "8~15개",
      adReplacement: "월 150만원"
    },
    highlight: false
  },
  {
    tier: "중소기업",
    price: "월 300~400만원 × 6개월",
    includes: [
      "전체 사이트 최적화",
      "키워드 80~120개",
      "월 콘텐츠 12~16개",
      "백링크 구축 월 8~12개",
      "전담 매니저 + GA4 대시보드"
    ],
    performance: {
      keywords: "20~40개",
      adReplacement: "월 400~600만원"
    },
    highlight: true
  },
  {
    tier: "대기업",
    price: "월 600만원 이상 × 12개월",
    includes: [
      "엔터프라이즈 전략",
      "키워드 300~500개",
      "월 콘텐츠 20개 이상",
      "GEO 완전 대응",
      "전담 팀 구성"
    ],
    performance: {
      keywords: "100~300개",
      adReplacement: "월 2,000만원 이상"
    },
    highlight: false
  }
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 섹션 6: GEO 대응
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const geoStrategies = [
  {
    number: "1",
    title: "Entity SEO",
    description: "브랜드를 명사로 인식시킴. Wikipedia, Crunchbase 등재."
  },
  {
    number: "2",
    title: "Authoritative Content",
    description: "AI가 인용할 데이터 생산. 산업 리포트, 전문가 인터뷰."
  },
  {
    number: "3",
    title: "Structured Data",
    description: "AI가 파싱 가능한 형식. JSON-LD, Schema.org 100% 적용."
  }
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 섹션 7: 차별화 요소
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const differentiators = [
  {
    icon: Target,
    title: "업종 전문 플레이북",
    description: "87개 프로젝트 데이터 기반 업종별 최적 전략. 이커머스, B2B SaaS, 로컬, 미디어 각각 다른 접근."
  },
  {
    icon: Brain,
    title: "GEO 선제 대응",
    description: "국내 유일 GEO 통합 제공. AI 검색 시대 생존 전략 포함."
  },
  {
    icon: BarChart3,
    title: "데이터 투명성",
    description: "매월 GSC 기반 리포트. 키워드 순위, 트래픽, 전환 실시간 추적. 구글 우수 100대 캠페인 선정 (2023)."
  }
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 섹션 8: 성과 타임라인
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const timeline = [
  {
    month: "0~3개월",
    phase: "기반 구축",
    work: [
      "기술 SEO, 키워드 리서치, 초기 콘텐츠"
    ],
    performance: "순위 20~50위권 진입, 매출 영향 미미"
  },
  {
    month: "4~6개월",
    phase: "성장 가속",
    work: [
      "콘텐츠 확장, 백링크 확보"
    ],
    performance: "순위 10~20위권 진입, 매출 2~3배 증가. 투자금 회수 시작."
  },
  {
    month: "7~12개월",
    phase: "안정화",
    work: [
      "E-E-A-T 강화, GEO 대응"
    ],
    performance: "순위 3~5위권 안정화, 매출 5~10배 증가. 광고 의존도 대폭 감소."
  }
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 섹션 9: 추천 대상
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const targetCustomers = {
  recommended: [
    "광고비가 매달 300만원 이상 나가는 경우",
    "장기적 브랜드 자산을 만들고 싶은 경우",
    "경쟁사가 아직 SEO 하지 않는 경우 (선점 기회)",
    "콘텐츠 제작 리소스 확보 가능한 경우",
    "6개월 이상 투자할 예산과 인내심이 있는 경우"
  ],
  notRecommended: [
    "1~2개월 내 즉시 매출 필요한 경우 (광고 권장)",
    "예산이 월 100만원 미만인 경우 (자체 운영 권장)",
    "웹사이트가 아예 없거나 모바일 최적화 안 된 경우",
    "검색량 자체가 거의 없는 초틈새 시장"
  ]
};

export function SEOGEOClient() {
  return (
    <main className="min-h-screen pt-[73px] relative">
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* 섹션 1: HERO */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
        {/* 1. Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/seo-hero-bg.jpg.jpg"
            alt="SEO Background"
            fill
            className="object-cover"
            quality={75}
            priority
            sizes="100vw"
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
            <Target className="w-4 h-4 text-white" />
            <span className="text-sm font-bold text-white">SEO & GEO Strategy</span>
          </motion.div>

          {/* Kinetic Typography Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ lineHeight: '1.35' }}>
            유일한 마케팅 자산, SEO
          </h1>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg md:text-xl text-slate-200 font-medium max-w-3xl mx-auto"
          >
            광고는 멈추면 끝납니다. SEO는 계속 작동합니다.
          </motion.p>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* 섹션 2: 광고 vs SEO */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="border-t border-slate-200 bg-white py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4" style={{ lineHeight: '1.35' }}>
            광고는 소비, SEO는 투자
          </h2>
          <p className="text-xl text-slate-600">
            같은 예산, 완전히 다른 결과
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* 광고 */}
          <FadeIn delay={0.1}>
            <div className="p-10 rounded-2xl bg-white border-2 border-slate-200">
              <h3 className="text-3xl font-bold text-slate-900 mb-2">{adVsSeo.ads.title}</h3>
              <p className="text-sm text-slate-500 mb-8">{adVsSeo.ads.subtitle}</p>

              <div className="space-y-6">
                <div>
                  <p className="text-lg text-slate-700 mb-1">{adVsSeo.ads.investment}</p>
                </div>

                <div className="pt-6 border-t border-slate-200">
                  <p className="text-2xl font-bold text-slate-900 mb-2">{adVsSeo.ads.assetValue}</p>
                  <p className="text-sm text-slate-500">{adVsSeo.ads.note}</p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* SEO */}
          <FadeIn delay={0.2}>
            <div className="p-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white border-2 border-blue-600 shadow-xl">
              <h3 className="text-3xl font-bold text-white mb-2">{adVsSeo.seo.title}</h3>
              <p className="text-sm text-blue-100 mb-8">{adVsSeo.seo.subtitle}</p>

              <div className="space-y-6">
                <div>
                  <p className="text-lg text-white mb-1">{adVsSeo.seo.investment}</p>
                </div>

                <div className="pt-6 border-t border-blue-400">
                  <p className="text-2xl font-bold text-white mb-2">{adVsSeo.seo.assetValue}</p>
                  <p className="text-sm text-blue-100">{adVsSeo.seo.note}</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        <div className="mt-16 text-center">
          <p className="text-xl font-bold text-slate-700">
            결론: 광고는 소비, SEO는 투자.
          </p>
        </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* 섹션 3: 검증된 성과 */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="border-t border-slate-200 bg-slate-50 py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4" style={{ lineHeight: '1.35' }}>
              검증된 성과
            </h2>
            <p className="text-xl text-slate-600">
              데이터로 증명하는 SEO의 힘
            </p>
          </div>

          {/* Overall Performance */}
          <div className="max-w-5xl mx-auto mb-16">
            <div className="p-10 rounded-2xl bg-white border-2 border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">
                PNA SEO 프로젝트 성과 (2023~2025)
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{overallPerformance.totalProjects}</div>
                  <div className="text-sm text-slate-600">총 프로젝트</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{overallPerformance.averageROI}</div>
                  <div className="text-sm text-slate-600">평균 ROI</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{overallPerformance.averagePayback}</div>
                  <div className="text-sm text-slate-600">평균 투자 회수 기간</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{overallPerformance.top10Rate}</div>
                  <div className="text-sm text-slate-600">상위 10위 달성률</div>
                </div>
              </div>
            </div>
          </div>

          {/* Representative Cases */}
          <div className="max-w-5xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">
              대표 사례
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {representativeCases.map((project, index) => (
                <FadeIn key={index} delay={index * 0.1}>
                  <div className="p-8 rounded-2xl bg-white border border-slate-200">
                    <div className="mb-4">
                      <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-bold mb-4">
                        {project.category}
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="text-sm font-bold text-slate-500 uppercase mb-2">과제</div>
                      <p className="text-slate-700">{project.challenge}</p>
                    </div>

                    <div className="mb-6">
                      <div className="text-sm font-bold text-slate-500 uppercase mb-2">기간</div>
                      <p className="text-lg font-bold text-slate-900">{project.period}</p>
                    </div>

                    <div>
                      <div className="text-sm font-bold text-slate-500 uppercase mb-3">성과</div>
                      <ul className="space-y-2">
                        {project.results.map((result, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                            <span className="text-sm font-medium">{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* 섹션 4: 업종별 전략 */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="border-t border-slate-200 bg-white py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4" style={{ lineHeight: '1.35' }}>
              업종별 전략
            </h2>
            <p className="text-xl text-slate-600">
              비즈니스 특성에 맞는 최적의 SEO 전략
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {industryStrategies.map((industry, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="p-8 rounded-2xl bg-white border-2 border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">{industry.title}</h3>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center py-2 border-b border-slate-200">
                      <span className="text-sm text-slate-600">타겟</span>
                      <span className="text-sm font-bold text-slate-900">{industry.target}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-200">
                      <span className="text-sm text-slate-600">기간</span>
                      <span className="text-sm font-bold text-slate-900">{industry.period}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-200">
                      <span className="text-sm text-slate-600">투자</span>
                      <span className="text-sm font-bold text-slate-900">{industry.investment}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-slate-600">예상 {industry.expectedRevenue ? '수익' : 'ROI'}</span>
                      <span className="text-lg font-bold text-blue-600">
                        {industry.expectedRevenue || industry.expectedROI}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-bold text-slate-500 uppercase mb-3">핵심 전략</div>
                    <ul className="space-y-2">
                      {industry.strategies.map((strategy, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span>{strategy}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* 섹션 5: 투자 구조 */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="border-t border-slate-200 bg-slate-50 py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4" style={{ lineHeight: '1.35' }}>
              투자 구조
            </h2>
            <p className="text-xl text-slate-600">
              예산별 예상 성과와 포함 내역
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {investmentTiers.map((tier, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className={`p-8 rounded-2xl transition-all duration-300 ${
                  tier.highlight 
                    ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white border-2 border-blue-600 shadow-2xl scale-105' 
                    : 'bg-white text-slate-900 border-2 border-slate-200 hover:border-blue-300 hover:shadow-lg'
                }`}>
                  {tier.highlight && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold mb-4">
                      <Award className="w-3 h-3" />
                      <span>권장</span>
                    </div>
                  )}

                  <h3 className={`text-2xl font-bold mb-6 ${tier.highlight ? 'text-white' : 'text-slate-900'}`}>
                    {tier.tier}
                  </h3>

                  <div className="mb-6">
                    <p className={`text-lg font-bold ${tier.highlight ? 'text-white' : 'text-slate-900'}`}>
                      {tier.price}
                    </p>
                  </div>

                  <div className="mb-6 pb-6 border-b border-slate-200" style={tier.highlight ? { borderColor: 'rgba(255,255,255,0.2)' } : {}}>
                    <div className={`text-sm font-bold uppercase mb-3 ${tier.highlight ? 'text-blue-100' : 'text-slate-500'}`}>
                      포함
                    </div>
                    <ul className="space-y-2">
                      {tier.includes.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className={`w-3 h-3 flex-shrink-0 mt-0.5 ${tier.highlight ? 'text-white' : 'text-blue-600'}`} />
                          <span className={tier.highlight ? 'text-white' : 'text-slate-700'}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className={`text-sm font-bold uppercase mb-3 ${tier.highlight ? 'text-blue-100' : 'text-slate-500'}`}>
                      예상 성과
                    </div>
                    <div className="space-y-2 text-sm">
                      <p className={tier.highlight ? 'text-white' : 'text-slate-700'}>
                        상위 10위 키워드: {tier.performance.keywords}
                      </p>
                      <p className={`font-bold ${tier.highlight ? 'text-white' : 'text-blue-600'}`}>
                        6개월 후 광고비 대체 효과: {tier.performance.adReplacement}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* 섹션 6: GEO 대응 */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="border-t border-slate-200 bg-white py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4" style={{ lineHeight: '1.35' }}>
              GEO (Generative Engine Optimization)
            </h2>
            <p className="text-xl text-slate-600">
              AI 검색 시대를 대비하는 차세대 전략
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Background */}
            <div className="p-8 rounded-2xl bg-white border-2 border-slate-200 mb-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4">배경</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                AI 검색(ChatGPT, Perplexity, Gemini)이 전체 검색의 35%를 차지. 2027년까지 50% 이상 예상.
              </p>
              <p className="text-lg font-bold text-slate-900">
                목표: AI가 귀사 브랜드를 "추천"하도록 만들기.
              </p>
            </div>

            {/* Strategies */}
            <div className="space-y-6 mb-12">
              {geoStrategies.map((strategy, index) => (
                <FadeIn key={index} delay={index * 0.1}>
                  <div className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl">
                        {strategy.number}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{strategy.title}</h3>
                        <p className="text-slate-700 leading-relaxed">{strategy.description}</p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* Verification */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">검증</h3>
              <p className="text-slate-700 leading-relaxed">
                PNA 클라이언트 B2B SaaS의 경우, GEO 적용 4개월 후 ChatGPT 추천 리스트 진입. 
                AI 검색 유입 월 1,200명 확보.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* 섹션 7: 차별화 요소 */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="border-t border-slate-200 bg-slate-50 py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4" style={{ lineHeight: '1.35' }}>
              차별화 요소
            </h2>
            <p className="text-xl text-slate-600">
              15년 노하우와 검증된 전략
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-8">
            {differentiators.map((item, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="p-8 md:p-10 rounded-2xl bg-white border-2 border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-slate-900 mb-3" style={{ lineHeight: '1.35' }}>
                        {item.title}
                      </h3>
                      <p className="text-base text-slate-700 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* 섹션 8: 성과 타임라인 */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="border-t border-slate-200 bg-white py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4" style={{ lineHeight: '1.35' }}>
              성과 타임라인
            </h2>
            <p className="text-xl text-slate-600">
              단계별 성장 과정과 예상 성과
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-8">
            {timeline.map((phase, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="p-8 md:p-10 rounded-2xl bg-white border-2 border-slate-200">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">{index + 1}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold mb-2">
                        <Clock className="w-3 h-3" />
                        {phase.month}
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900" style={{ lineHeight: '1.35' }}>
                        {phase.phase}
                      </h3>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="text-sm font-bold text-slate-500 uppercase mb-3">작업</div>
                      <ul className="space-y-2">
                        {phase.work.map((task, idx) => (
                          <li key={idx} className="text-sm text-slate-700">{task}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="text-sm font-bold text-slate-500 uppercase mb-3">성과</div>
                      <p className="text-sm text-slate-700 leading-relaxed">{phase.performance}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* 섹션 9: 추천 대상 */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="border-t border-slate-200 bg-slate-50 py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4" style={{ lineHeight: '1.35' }}>
              추천 대상
            </h2>
            <p className="text-xl text-slate-600">
              SEO가 적합한지 확인하세요
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
      <SEOFAQ />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* CTA SECTION */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative bg-blue-600 py-16 md:py-20 overflow-hidden">
        <div className="container relative mx-auto px-4 md:px-6 max-w-4xl text-center text-white">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Rocket className="w-7 h-7 text-white" />
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5" style={{ lineHeight: '1.3' }}>
            무료 SEO 진단
          </h2>

          {/* Description */}
          <p className="text-base md:text-lg text-blue-50 mb-8 leading-relaxed">
            현재 사이트의 검색 노출 상태를 분석하고 개선 방안을 제안합니다
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
