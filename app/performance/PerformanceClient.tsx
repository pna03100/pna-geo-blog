/**
 * [Client] Performance Marketing Service Page
 * Premium Blue Theme (Brand Color: #2563EB)
 * [Animation] Scroll-triggered entrance for sections
 */

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { TrendingUp, Target, BarChart3, Zap, CheckCircle2, ArrowRight, Sparkles, Award, DollarSign, LineChart, PieChart, Activity, Users } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { PerformanceFAQ } from "@/components/service/PerformanceFAQ";

const services = [
  {
    icon: TrendingUp,
    title: "ROAS 최적화",
    description: "데이터 기반 의사결정으로 광고 수익률을 최대 500% 향상시킵니다.",
    color: "#0F9D58" // Google Green
  },
  {
    icon: Target,
    title: "정밀 타겟팅",
    description: "고객 여정 맵핑과 검색 의도 분석으로 정확한 타겟을 공략합니다.",
    color: "#4285F4" // Google Blue
  },
  {
    icon: BarChart3,
    title: "실시간 성과 분석",
    description: "24/7 모니터링과 주간 리포트로 투명한 성과 관리를 제공합니다.",
    color: "#F4B400" // Google Yellow
  },
  {
    icon: Zap,
    title: "통합 캠페인 관리",
    description: "Google Ads, Meta, 네이버 등 멀티 채널을 통합 관리합니다.",
    color: "#DB4437" // Google Red
  },
];

const advancedServices = [
  {
    icon: LineChart,
    title: "Data-Driven Marketing Mix Modeling",
    description: "MMM(Marketing Mix Modeling)으로 온·오프라인 전체 마케팅 채널의 실제 기여도를 측정합니다. 광고, 프로모션, 시즌, 경쟁사 동향 등 외부 변수까지 고려한 회귀 분석으로 최적 예산 배분 전략을 제시합니다.",
    features: ["Multi-Touch Attribution", "Incrementality Test", "Predictive Analytics"]
  },
  {
    icon: PieChart,
    title: "Customer Lifetime Value (LTV) 최적화",
    description: "단순 전환율이 아닌, 고객의 평생 가치(LTV)를 기준으로 마케팅 ROI를 재정의합니다. Cohort 분석, Retention Rate, Churn 예측 모델로 '가치 있는 고객'에게 마케팅 비용을 집중합니다.",
    features: ["Cohort Analysis", "RFM Segmentation", "Churn Prediction"]
  },
  {
    icon: Activity,
    title: "Full-Funnel Performance 전략",
    description: "인지(Awareness) → 고려(Consideration) → 전환(Conversion) → 리텐션(Retention) 전체 퍼널을 최적화합니다. TOFU, MOFU, BOFU별 KPI를 정의하고, 각 단계에 최적화된 크리에이티브와 메시지를 설계합니다.",
    features: ["AARRR 프레임워크", "Funnel Optimization", "CRO (Conversion Rate Optimization)"]
  },
  {
    icon: Users,
    title: "Advanced Audience Segmentation",
    description: "RFM 분석, 행동 기반 세그먼트, Lookalike Modeling으로 '전환 가능성이 높은' 오디언스를 정밀하게 타겟합니다. CRM 데이터, 웹 행동 데이터, 구매 이력을 통합한 CDP(Customer Data Platform) 구축도 지원합니다.",
    features: ["RFM 모델", "Predictive Scoring", "CDP 통합"]
  }
];

const metrics = [
  {
    number: "500%",
    label: "평균 ROAS",
    description: "광고주 평균 달성 수익률"
  },
  {
    number: "100억+",
    label: "누적 광고비",
    description: "15년간 집행한 총 광고비"
  },
  {
    number: "200+",
    label: "성공 캠페인",
    description: "다양한 업종 최적화 경험"
  }
];

const features = [
  "구글 공식 파트너사",
  "15년+ 광고 운영 노하우",
  "업종별 맞춤 전략 수립",
  "실시간 성과 모니터링",
  "주간/월간 상세 리포트",
  "평생 무료 컨설팅"
];

export function PerformanceClient() {
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
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-semibold">데이터 기반 마케팅</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              퍼포먼스 마케팅
            </h1>

            <p className="text-xl text-blue-100 leading-relaxed">
              데이터로 증명하는 광고 성과<br className="hidden md:block" />
              평균 ROAS 500%를 달성합니다
            </p>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="container mx-auto px-4 md:px-6 max-w-7xl py-20">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-4">
            Proven Results
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            데이터로 증명하는 성과
          </h2>
          <p className="text-xl text-slate-600">
            15년간 쌓아온 광고 최적화 노하우
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metrics.map((metric, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div
                className="group p-8 rounded-2xl bg-white border border-slate-200 hover:border-blue-200 hover:shadow-xl transition-all duration-300 text-center"
              >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-blue-50 mb-6">
                <DollarSign className="w-7 h-7 text-blue-600" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                {metric.number}
              </div>
              <div className="text-xl font-bold text-slate-900 mb-2">
                {metric.label}
              </div>
              <p className="text-slate-600">
                {metric.description}
              </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-4">
              Services
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              핵심 서비스
            </h2>
            <p className="text-xl text-slate-600">
              성과를 극대화하는 전문 솔루션
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
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

          {/* Features List */}
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <FadeIn key={index} delay={0.4 + index * 0.05}>
                  <div
                    className="flex items-center gap-3 p-4 rounded-xl bg-white border border-slate-200"
                  >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg text-slate-700">{feature}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Analytics Section */}
      <section className="container mx-auto px-4 md:px-6 max-w-7xl py-20">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-4">
            Advanced Analytics
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            데이터 과학 기반 마케팅
          </h2>
          <p className="text-xl text-slate-600">
            단순 광고 집행을 넘어, 비즈니스 성장을 설계합니다
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
                    퍼포먼스 마케팅 vs 브랜드 마케팅
                  </h3>
                  <div className="space-y-3 text-slate-700 leading-relaxed">
                    <p>
                      <strong className="text-slate-900">• 퍼포먼스 마케팅의 정의:</strong> 클릭, 전환, 매출 등 '측정 가능한 성과(Performance)'를 목표로 하는 마케팅입니다. CPA(Cost Per Action), ROAS(Return On Ad Spend), LTV(Lifetime Value) 같은 정량적 지표로 효율을 평가하며, A/B 테스트와 데이터 분석으로 지속적으로 최적화합니다. Google Ads, Meta Ads, 네이버 검색 광고가 대표적입니다.
                    </p>
                    <p>
                      <strong className="text-slate-900">• 브랜드 마케팅과의 차이:</strong> 브랜드 마케팅은 '인지도', '호감도', '브랜드 가치' 같은 정성적 목표를 추구하며, TV 광고, 유튜브 브랜디드 콘텐츠, 스폰서십이 주요 수단입니다. 퍼포먼스 마케팅은 단기 매출 극대화에, 브랜드 마케팅은 장기 자산 구축에 집중합니다. 최근에는 두 전략을 통합한 'Full-Funnel Marketing'이 트렌드입니다.
                    </p>
                    <p>
                      <strong className="text-slate-900">• 데이터 기반 의사결정:</strong> 감이 아닌 데이터로 판단합니다. Google Analytics, Meta Pixel, 전환 추적으로 '어떤 광고가, 어떤 고객에게, 얼마의 비용으로 전환을 만들었는지' 정확히 파악하고, 효율이 낮은 광고는 즉시 중단하며, 효율이 높은 광고에 예산을 재배분합니다. 이것이 평균 ROAS 500%를 만드는 비결입니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* FAQ Section */}
      <PerformanceFAQ />

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-600 py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <FadeIn delay={0.1}>
            <div>
            <Sparkles className="w-12 h-12 text-white mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              성과 중심 광고, 지금 시작하세요
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              15년 노하우로 검증된 퍼포먼스 마케팅 전략을 무료로 상담받아보세요
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
