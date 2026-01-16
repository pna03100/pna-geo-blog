/**
 * [Client] Google Ads Service Page
 * [Design] 2026 Complete Renewal - Data-Driven & Persuasive
 * [Style] Light/Slate Mix + Minimal Cards
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Target, TrendingUp, Zap, ArrowRight, Sparkles, 
  BarChart3, Users, Award, CheckCircle2, X,
  Search, ShoppingBag, Video, Smartphone, Globe
} from "lucide-react";
import { GoogleAdsFAQ } from "@/components/service/GoogleAdsFAQ";

const benefits = [
  {
    icon: Zap,
    title: "즉시 효과",
    description: "광고 집행 즉시 상위 노출. SEO와 달리 3~6개월 기다릴 필요 없이 당일부터 트래픽 확보"
  },
  {
    icon: Target,
    title: "정확한 타겟팅",
    description: "연령, 지역, 관심사, 검색 의도까지 세밀하게 타겟팅. 우리 제품이 필요한 사람에게만 광고 노출"
  },
  {
    icon: BarChart3,
    title: "실시간 데이터",
    description: "GA4 연동으로 클릭, 전환, ROAS를 실시간 추적. 데이터 기반으로 광고 최적화"
  }
];

const successCases = [
  {
    category: "이커머스 (뷰티)",
    challenge: "광고비 대비 매출 불명확, 브랜드 인지도 낮음",
    solution: "Shopping 광고 + Performance Max + Dynamic Remarketing",
    adBudget: "월 500만원",
    results: [
      { label: "ROAS", before: "1:2.1", after: "1:8.3" },
      { label: "월 매출", before: "1,050만원", after: "4,150만원" },
      { label: "CPA", before: "12,000원", after: "6,800원" }
    ],
    period: "3개월"
  },
  {
    category: "B2B SaaS (HR 솔루션)",
    challenge: "무료 체험 신청 부족, 리드 품질 낮음",
    solution: "Search 광고 + LinkedIn 연동 + Long-tail 키워드 전략",
    adBudget: "월 300만원",
    results: [
      { label: "MQL", before: "월 22건", after: "월 87건" },
      { label: "전환율", before: "3.2%", after: "11.8%" },
      { label: "리드 단가", before: "42,000원", after: "15,300원" }
    ],
    period: "6개월"
  },
  {
    category: "로컬 비즈니스 (피부과)",
    challenge: "예약 문의 부족, 광고비 낭비",
    solution: "Local 광고 + Google My Business + Call Extension",
    adBudget: "월 150만원",
    results: [
      { label: "예약 문의", before: "월 45건", after: "월 240건" },
      { label: "예약 전환율", before: "32%", after: "68%" },
      { label: "고객 획득 단가", before: "18,500원", after: "6,250원" }
    ],
    period: "2개월"
  }
];

const campaignTypes = [
  {
    icon: Zap,
    name: "Performance Max",
    description: (
      <>
        Google의 <strong>모든 광고 채널(Search, Display, YouTube, Gmail, Discover, Maps)</strong>을 단일 캠페인으로 통합하여 <strong>AI가 자동으로 최적화</strong>합니다. 전환 목표만 설정하면 Google AI가 실시간으로 최적의 채널, 오디언스, 입찰가, 크리에이티브 조합을 자동 선택합니다. 기존 Search 캠페인 대비 <strong>평균 15~30% 높은 전환율</strong>을 달성하며, 자동화된 Asset 최적화로 가장 성과가 좋은 조합을 자동으로 선택합니다.
      </>
    ),
    bestFor: "전환 극대화",
    recommendedFor: ["이커머스", "리드 생성", "다채널 활용"]
  },
  {
    icon: Search,
    name: "Search",
    description: (
      <>
        사용자가 Google에서 특정 키워드를 검색할 때 <strong>검색 결과 상단에 텍스트 광고로 노출</strong>됩니다. <strong>구매 의도가 명확한 고객</strong>을 타겟팅할 수 있어 즉시 매출 전환이 가능합니다. <strong>RSA(반응형 검색 광고)</strong>를 활용하면 최대 15개의 헤드라인과 4개의 설명을 조합하여 Google AI가 가장 효과적인 광고 문구를 자동 생성합니다. <strong>품질 점수 최적화</strong>를 통해 동일한 예산으로 더 낮은 CPC와 높은 광고 순위를 달성할 수 있습니다.
      </>
    ),
    bestFor: "즉시 매출",
    recommendedFor: ["서비스업", "B2B", "고관여 제품"]
  },
  {
    icon: ShoppingBag,
    name: "Shopping",
    description: (
      <>
        제품의 <strong>이미지, 가격, 브랜드명, 리뷰 평점을 시각적으로 노출</strong>하여 클릭률(CTR)과 전환율을 극대화합니다. <strong>Google Merchant Center와 연동</strong>하여 제품 카탈로그를 자동으로 업데이트하며, <strong>Dynamic Remarketing</strong>으로 장바구니 이탈 고객을 재타겟팅할 수 있습니다. 경쟁사 대비 가격 비교가 가능하여 가격 경쟁력이 있는 제품에 특히 효과적입니다. 이커머스 비즈니스라면 필수로 운영해야 하는 캠페인 유형입니다.
      </>
    ),
    bestFor: "온라인 쇼핑몰",
    recommendedFor: ["패션", "뷰티", "전자제품", "생활용품"]
  },
  {
    icon: Video,
    name: "YouTube",
    description: (
      <>
        <strong>전 세계 20억+ 월간 활성 사용자</strong>를 보유한 YouTube에서 동영상 광고를 집행합니다. <strong>In-Stream 광고, Bumper 광고(6초), Discovery 광고</strong>를 통해 브랜드 메시지를 전달할 수 있습니다. 특히 <strong>15~34세 연령층과 밀레니얼/Z세대 타겟팅</strong>에 강력하며, Skippable 광고는 30초 시청 시에만 과금되어 비용 효율적입니다. <strong>Video Action 캠페인</strong>을 통해 동영상 하단에 CTA 버튼을 추가하여 즉시 전환을 유도할 수 있습니다.
      </>
    ),
    bestFor: "브랜드 인지도",
    recommendedFor: ["신제품 론칭", "브랜드 스토리", "교육/금융/SaaS"]
  },
  {
    icon: Smartphone,
    name: "App",
    description: (
      <>
        모바일 앱의 <strong>다운로드와 인앱 전환(회원가입, 구매, 구독)</strong>을 최적화하는 전문 캠페인입니다. <strong>Google Play Store와 App Store에 직접 연동</strong>되며, Search, Display, YouTube, Google Play 전반에 자동으로 광고를 노출합니다. <strong>Universal App Campaign(UAC)</strong>은 텍스트, 이미지, 동영상 Asset만 제공하면 Google AI가 자동으로 수백 가지 광고 조합을 생성하고 최적화합니다. <strong>LTV(고객 생애 가치) 기반 입찰</strong>을 통해 수익성 높은 사용자를 타겟팅할 수 있습니다.
      </>
    ),
    bestFor: "앱 다운로드",
    recommendedFor: ["게임", "핀테크", "배달앱", "O2O 서비스"]
  },
  {
    icon: Globe,
    name: "Display",
    description: (
      <>
        <strong>전 세계 300만+ 웹사이트, 앱, Gmail, YouTube</strong>에 이미지와 동영상 광고를 노출하여 광범위한 도달을 실현합니다. <strong>구매 의도가 명확하지 않은 초기 단계 고객</strong>을 발굴하고, <strong>Remarketing</strong>으로 웹사이트 방문자를 재타겟팅하여 전환율을 높입니다. <strong>Demand Gen 캠페인</strong>(구 Discovery 광고)은 YouTube, Gmail, Discover 피드에 네이티브 형식으로 광고를 노출하여 자연스러운 사용자 경험을 제공합니다.
      </>
    ),
    bestFor: "잠재 고객 발굴",
    recommendedFor: ["브랜드 인지도", "신규 고객", "대규모 프로모션"]
  }
];

const coreStrategy = [
  {
    icon: Target,
    title: "품질 점수 9~10점 유지",
    description: "Google의 품질 점수(QS)를 최고 수준으로 유지하여 클릭당 비용(CPC)을 최대 50% 절감합니다. 광고 문구, 랜딩 페이지, 키워드 관련성을 지속적으로 최적화합니다."
  },
  {
    icon: BarChart3,
    title: "전환 추적 & GA4 연동",
    description: "모든 전환 액션(구매, 가입, 문의, 전화)을 정확히 추적하고 GA4와 연동하여 고객 여정 전체를 분석합니다. ROAS, CPA, LTV를 실시간으로 모니터링합니다."
  },
  {
    icon: Zap,
    title: "AI 기반 자동 최적화",
    description: "Google의 Smart Bidding과 자체 알고리즘을 결합하여 24시간 자동 입찰 최적화를 수행합니다. 시간대, 기기, 위치별로 전환율이 높은 구간에 예산을 집중 투입합니다."
  },
  {
    icon: TrendingUp,
    title: "A/B 테스트 & 지속 개선",
    description: "광고 문구, 이미지, 랜딩 페이지를 매주 A/B 테스트하여 CTR과 전환율을 지속적으로 개선합니다. 데이터 기반으로 의사결정하며, 주간 리포트를 통해 투명하게 공유합니다."
  }
];

const pnaAdvantages = [
  {
    icon: Award,
    title: "Google 공식 파트너",
    description: "구글 우수 100대 캠페인 선정 (2023). Google Ads 공식 인증 보유"
  },
  {
    icon: Users,
    title: "15년 노하우, 1,200+ 캠페인",
    description: "2010년부터 Google Ads 전문. 스타트업부터 대기업까지 다양한 경험"
  },
  {
    icon: Zap,
    title: "AI 기반 자동 최적화",
    description: "Google AI + 자체 알고리즘으로 24시간 입찰 최적화. 광고비 효율 극대화"
  },
  {
    icon: BarChart3,
    title: "투명한 리포팅",
    description: "주간 ROAS, CPA, 전환율 공유. Google Ads 계정 접근 권한 100% 제공"
  }
];

const industryStrategy = [
  {
    title: "이커머스",
    strategy: "Shopping 광고 + Dynamic Remarketing",
    points: [
      "제품 카탈로그 자동 연동으로 재고 실시간 업데이트",
      "장바구니 이탈 고객 72시간 이내 리타게팅 (전환율 35% 향상)",
      "계절별/이벤트별 입찰 조정 (블랙프라이데이 등)",
      "가격 경쟁력 분석으로 최적 노출 위치 선점"
    ]
  },
  {
    title: "B2B SaaS",
    strategy: "Search + LinkedIn 연동",
    points: [
      "Long-tail 키워드로 구매 의도 높은 고객 타겟팅",
      "Feature별 맞춤 랜딩 페이지 (CRM, HR, Marketing 등)",
      "MQL/SQL 구분 추적으로 영업팀 효율성 극대화",
      "무료 체험 신청 후 이메일 자동화 시퀀스 연동"
    ]
  },
  {
    title: "로컬 비즈니스",
    strategy: "Local 광고 + Google My Business",
    points: [
      "반경 5km 이내 고객 타겟팅 (지역별 입찰가 조정)",
      "전화 전환 추적으로 실제 예약/문의 측정",
      "구글 리뷰 5점 이상 유지로 광고 신뢰도 향상",
      "오프라인 방문 측정 (Store Visit Conversion 활용)"
    ]
  },
  {
    title: "앱 서비스",
    strategy: "Universal App Campaign",
    points: [
      "앱 다운로드 최적화 (CPI 기반 입찰)",
      "인앱 이벤트 추적 (회원가입, 첫 구매, 레벨 완료)",
      "LTV 기반 입찰로 장기 수익성 높은 사용자 확보",
      "Google Play/App Store ASO 최적화 병행"
    ]
  }
];

const targetCustomers = {
  recommended: [
    "즉시 매출이 필요한 이커머스",
    "신제품 론칭으로 빠른 인지도 확보가 필요한 스타트업",
    "시즌별 프로모션을 운영하는 브랜드 (블랙프라이데이, 설날 등)",
    "명확한 타겟 고객이 있는 B2B 기업",
    "경쟁사가 Google Ads를 적극 활용 중인 업종"
  ],
  notRecommended: [
    "광고비 예산이 월 200만원 미만인 경우 (학습 데이터 부족)",
    "장기적 브랜딩만 원하는 경우 (SEO/콘텐츠 마케팅 추천)",
    "제품/서비스가 명확하지 않거나 시장 검증 전인 경우",
    "전환 추적 불가능한 비즈니스 (오프라인 전용, 측정 거부 등)"
  ]
};

const budgetGuide = [
  {
    tier: "스타트업 / 소규모",
    budget: "월 200~500만원",
    expectedROAS: "1:3~1:5",
    features: [
      "Search 광고 집중",
      "1~2개 캠페인",
      "주간 리포트",
      "이메일/카톡 지원"
    ]
  },
  {
    tier: "중소기업",
    budget: "월 500~1,500만원",
    expectedROAS: "1:5~1:8",
    features: [
      "Search + Display + Shopping",
      "3~5개 캠페인",
      "격주 화상 미팅",
      "전담 매니저",
      "A/B 테스트"
    ],
    recommended: true
  },
  {
    tier: "대기업",
    budget: "월 1,500만원 이상",
    expectedROAS: "1:6~1:10",
    features: [
      "전 캠페인 유형 활용",
      "10개 이상 캠페인",
      "주간 미팅",
      "전담 팀 배정",
      "커스텀 리포트"
    ]
  }
];

const platformComparison = {
  criteria: [
    { label: "타겟 정확도", key: "targeting" as const },
    { label: "글로벌 도달", key: "reach" as const },
    { label: "평균 CPC", key: "cpc" as const },
    { label: "AI 최적화", key: "ai" as const },
    { label: "투명성", key: "transparency" as const }
  ],
  platforms: [
    {
      name: "Google Ads",
      highlight: true,
      values: {
        targeting: "매우 높음 (검색 의도)",
        reach: "전 세계 1위",
        cpc: "중간 (500~2,000원)",
        ai: "Smart Bidding",
        transparency: "실시간 데이터 공개"
      }
    },
    {
      name: "네이버",
      highlight: false,
      values: {
        targeting: "중간 (키워드 중심)",
        reach: "한국 한정",
        cpc: "높음 (800~3,000원)",
        ai: "기본 수준",
        transparency: "제한적"
      }
    },
    {
      name: "메타 (Facebook/Instagram)",
      highlight: false,
      values: {
        targeting: "높음 (관심사 중심)",
        reach: "글로벌 2위",
        cpc: "낮음 (300~1,000원)",
        ai: "Advantage+",
        transparency: "중간"
      }
    }
  ]
};


// Campaign Types Tab Component
function CampaignTypesSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="border-t border-slate-200 bg-slate-50 py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4" style={{ lineHeight: '1.35' }}>
            Google Ads 캠페인 유형
          </h2>
          <p className="text-xl text-slate-600">
            비즈니스 목표에 맞는 6가지 광고 솔루션
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 max-w-5xl mx-auto">
          {campaignTypes.map((campaign, index) => {
            const Icon = campaign.icon;
            return (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`
                  flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm transition-all
                  ${activeTab === index 
                    ? 'bg-blue-600 text-white shadow-lg scale-105' 
                    : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-blue-300'
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                {campaign.name}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="max-w-5xl mx-auto">
          <div
            key={activeTab}
            className="opacity-0 animate-tab-fade-in"
          >
            <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
              {/* Title */}
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {campaignTypes[activeTab].name}
              </h3>

              {/* Label */}
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-bold">
                  {campaignTypes[activeTab].bestFor}
                </span>
              </div>

              {/* Description */}
              <div className="text-base md:text-lg text-slate-700 leading-relaxed mb-6">
                {campaignTypes[activeTab].description}
              </div>

              {/* Recommended For Tags */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-blue-200">
                <span className="text-sm font-bold text-slate-600">추천 대상:</span>
                {campaignTypes[activeTab].recommendedFor.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1.5 rounded-full bg-white border border-blue-300 text-blue-700 text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function GoogleAdsClient() {
  return (
    <main className="min-h-screen pt-16 relative">
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* HERO SECTION (고정) */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
        {/* 1. Background Image */}
        <div className="absolute inset-0 z-0 bg-slate-900">
          <Image
            src="/images/hero/google-ads-hero-bg.jpg"
            alt="피앤에이컴퍼니 구글 애즈 광고 대행 서비스 - 데이터 분석 대시보드"
            fill
            className="object-cover"
            quality={60}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
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
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8"
          >
            <Target className="w-4 h-4 text-white" />
            <span className="text-sm font-bold text-white">Google Ads Certified Partner</span>
          </motion.div>

          {/* Kinetic Typography Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ lineHeight: '1.35' }}>
            구글 광고 대행
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-slate-200 font-medium max-w-3xl mx-auto">
            낭비 없는 광고비, 데이터로 증명하는 성과
          </p>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* WHY GOOGLE ADS */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="border-t border-slate-200 bg-white py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4" style={{ lineHeight: '1.35' }}>
            왜 구글 광고를 해야 하나요?
          </h2>
          <p className="text-xl text-slate-600">
            검증된 성과로 비즈니스를 성장시키는 3가지 이유
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x md:divide-slate-200 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <div key={index} className="md:px-8 text-center">
              <benefit.icon className="w-12 h-12 text-blue-600 mx-auto mb-5" />
              <h3 className="text-xl font-bold text-slate-900 mb-3" style={{ lineHeight: '1.35' }}>
                {benefit.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* PLATFORM COMPARISON */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="border-t border-white/10 bg-[#0B0B0D] py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ lineHeight: '1.35' }}>
              Google Ads vs 타 플랫폼
            </h2>
            <p className="text-xl text-white/70">
              데이터로 확인하는 구글 광고의 강점
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-white/10">
                  <th className="text-left p-4 font-bold text-white bg-white/5">비교 항목</th>
                  {platformComparison.platforms.map((platform, index) => (
                    <th 
                      key={index}
                      className={`text-center p-4 font-bold ${
                        platform.highlight 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-white/5 text-white'
                      }`}
                    >
                      {platform.name}
                      {platform.highlight && (
                        <div className="text-xs font-normal mt-1 text-blue-100">추천</div>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {platformComparison.criteria.map((criterion, rowIndex) => (
                  <tr key={rowIndex} className="border-b border-white/10">
                    <td className="p-4 font-medium text-white/70 bg-white/5">
                      {criterion.label}
                    </td>
                    {platformComparison.platforms.map((platform, colIndex) => (
                      <td 
                        key={colIndex}
                        className={`text-center p-4 ${
                          platform.highlight 
                            ? 'bg-blue-500/20 font-bold text-blue-300' 
                            : 'bg-black/40 text-white/70'
                        }`}
                      >
                        {platform.values[criterion.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-white/50">
              * 데이터는 2024년 기준이며, 업종에 따라 차이가 있을 수 있습니다
            </p>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* SUCCESS CASES */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="border-t border-slate-200 bg-white py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4" style={{ lineHeight: '1.35' }}>
              실제 광고 성과
            </h2>
            <p className="text-xl text-slate-600">
              데이터로 증명하는 광고 효과
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {successCases.map((project, index) => (
              <div key={index} className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300">
                  {/* Category Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-bold mb-4">
                    <TrendingUp className="w-4 h-4" />
                    {project.category}
                  </div>

                  {/* Challenge */}
                  <div className="mb-4 p-3 rounded-lg bg-slate-50 border-l-4 border-slate-300">
                    <div className="text-xs font-bold text-slate-500 uppercase mb-1">도전 과제</div>
                    <p className="text-sm text-slate-700">{project.challenge}</p>
                  </div>

                  {/* Ad Budget */}
                  <div className="mb-4 p-4 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-white" />
                        <div className="text-xs font-bold text-white uppercase">투입 광고비</div>
                      </div>
                      <div className="text-3xl font-bold text-white mb-1">{project.adBudget}</div>
                      <div className="text-xs text-blue-100">기간: {project.period}</div>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="space-y-3 mb-4 p-4 rounded-lg bg-green-50">
                    <div className="text-xs font-bold text-green-700 uppercase mb-2">성과 지표</div>
                    {project.results.map((result, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <span className="text-slate-700 font-medium">{result.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500 line-through">{result.before}</span>
                          <ArrowRight className="w-4 h-4 text-green-600" />
                          <span className="font-bold text-green-700">{result.after}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Solution */}
                  <div className="pt-4 border-t border-slate-200">
                    <div className="text-xs font-bold text-slate-500 uppercase mb-2">적용 솔루션</div>
                    <p className="text-sm text-slate-700 font-medium">{project.solution}</p>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* CAMPAIGN TYPES - TAB VERSION */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <CampaignTypesSection />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* CORE STRATEGY */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="border-t border-slate-200 bg-white py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4" style={{ lineHeight: '1.35' }}>
              PNA의 광고 전략
            </h2>
            <p className="text-xl text-slate-600">
              광고비 효율을 극대화하는 4가지 핵심 전략
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-8">
            {coreStrategy.map((strategy, index) => {
              const Icon = strategy.icon;
              return (
                <div key={index} className="flex items-start gap-6 p-8 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                    {/* Icon */}
                    <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-slate-900 mb-3" style={{ lineHeight: '1.35' }}>
                        {strategy.title}
                      </h3>
                      <p className="text-base text-slate-600 leading-relaxed">
                        {strategy.description}
                      </p>
                    </div>
                  </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* WHY PNA */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="border-t border-white/10 bg-[#0B0B0D] py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ lineHeight: '1.35' }}>
              왜 PNA인가?
            </h2>
            <p className="text-xl text-white/70">
              15년 노하우와 데이터 기반 전략
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-white/10 max-w-7xl mx-auto">
            {pnaAdvantages.map((advantage, index) => (
              <div key={index} className="md:px-8 text-center">
                <advantage.icon className="w-12 h-12 text-blue-400 mx-auto mb-5" />
                <h3 className="text-lg font-bold text-white mb-3" style={{ lineHeight: '1.35' }}>
                  {advantage.title}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  {advantage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* INDUSTRY STRATEGY */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="border-t border-slate-200 bg-white py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4" style={{ lineHeight: '1.35' }}>
              업종별 맞춤 전략
            </h2>
            <p className="text-xl text-slate-600">
              비즈니스 특성에 맞는 최적의 광고 솔루션
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {industryStrategy.map((industry, index) => (
              <div key={index} className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900" style={{ lineHeight: '1.35' }}>
                        {industry.title}
                      </h3>
                      <div className="text-blue-600 font-bold text-xs">
                        {industry.strategy}
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-2.5">
                    {industry.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* TARGET CUSTOMERS */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="border-t border-slate-200 bg-slate-50 py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4" style={{ lineHeight: '1.35' }}>
              이런 분들께 추천합니다
            </h2>
            <p className="text-xl text-slate-600">
              Google Ads가 적합한지 확인하세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Recommended */}
            <div className="p-8 rounded-2xl bg-white border-2 border-blue-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    추천합니다
                  </h3>
                </div>
                <ul className="space-y-4">
                  {targetCustomers.recommended.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-slate-700">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            {/* Not Recommended */}
            <div className="p-8 rounded-2xl bg-white border-2 border-slate-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-slate-400 flex items-center justify-center">
                    <X className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    권장하지 않습니다
                  </h3>
                </div>
                <ul className="space-y-4">
                  {targetCustomers.notRecommended.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-slate-700">
                      <X className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* BUDGET GUIDE */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="border-t border-slate-200 bg-white py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4" style={{ lineHeight: '1.35' }}>
              광고비 가이드
            </h2>
            <p className="text-xl text-slate-600">
              비즈니스 규모에 맞는 권장 예산
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {budgetGuide.map((guide, index) => (
              <div key={index} className={`p-8 rounded-2xl border-2 transition-all duration-300 ${
                guide.recommended 
                  ? 'border-blue-600 bg-blue-50/50 shadow-xl' 
                  : 'border-slate-200 bg-white'
              }`}>
                  {guide.recommended && (
                    <div className="text-center mb-4">
                      <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600 text-white text-sm font-bold">
                        추천
                      </span>
                    </div>
                  )}

                  <h3 className="text-2xl font-bold text-slate-900 mb-2 text-center">
                    {guide.tier}
                  </h3>

                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {guide.budget}
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-200">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-bold text-green-700">예상 ROAS: {guide.expectedROAS}</span>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {guide.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                        <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
            ))}
          </div>

          <div className="mt-12 max-w-4xl mx-auto">
            <div className="p-6 rounded-2xl bg-blue-50 border border-blue-200">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">예상 ROAS는 어떻게 계산되나요?</h4>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    제시된 ROAS는 이커머스/리드 생성 비즈니스 기준 평균값입니다. 실제 성과는 업종, 제품 단가, 경쟁 강도, 랜딩 페이지 품질에 따라 달라질 수 있습니다. 초기 1~2개월은 학습 기간이며, 3개월 이후부터 안정적인 ROAS를 달성합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* FAQ SECTION (고정) */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <GoogleAdsFAQ />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* CTA SECTION (고정) */}
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
            광고비 낭비, 이제 그만
          </h2>

          {/* Description */}
          <p className="text-base md:text-lg text-blue-50 mb-8 leading-relaxed">
            현재 광고 계정 무료 진단 → ROAS 개선 전략 제안 → 데이터 기반 성과 최적화
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
