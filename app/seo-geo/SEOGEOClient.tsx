/**
 * [Client] SEO & GEO Service Page
 * Premium Blue Theme (Brand Color: #2563EB)
 * [Animation] Scroll-triggered entrance for sections
 */

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Search, Sparkles, TrendingUp, FileText, CheckCircle2, ArrowRight, Target, Zap, Award, Bot, Cloud, Cpu, Database } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { SEOFAQ } from "@/components/service/SEOFAQ";

const services = [
  {
    icon: Search,
    title: "기술 SEO (Technical SEO)",
    description: "구조화된 데이터, 메타태그, 사이트맵, robots.txt 등 검색엔진이 이해하기 쉬운 기술 구조를 구축합니다.",
    color: "#0F9D58" // Google Green
  },
  {
    icon: Sparkles,
    title: "GEO (Generative Engine Optimization)",
    description: "ChatGPT, Perplexity, Gemini 등 AI 검색 엔진에서 Featured Snippet으로 노출되도록 콘텐츠를 최적화합니다.",
    color: "#4285F4" // Google Blue
  },
  {
    icon: TrendingUp,
    title: "On-Page SEO",
    description: "키워드 전략, 내부 링크 구조, H1~H6 태그 최적화로 페이지 권위를 강화합니다.",
    color: "#F4B400" // Google Yellow
  },
  {
    icon: FileText,
    title: "콘텐츠 SEO 전략",
    description: "검색 의도에 맞춘 고품질 콘텐츠와 E-E-A-T(경험, 전문성, 권위, 신뢰도) 강화 전략을 제공합니다.",
    color: "#DB4437" // Google Red
  },
];

const aiSaasServices = [
  {
    icon: Bot,
    title: "AI 기반 콘텐츠 최적화",
    description: "ChatGPT, Claude, Gemini 등 LLM(대규모 언어 모델)이 이해하고 인용할 수 있는 구조화된 콘텐츠를 생성합니다. Prompt Engineering 전략으로 AI 검색 결과에서 상위 노출을 달성합니다.",
    features: ["RAG 최적화", "Semantic Search 대응", "Vector DB 인덱싱"]
  },
  {
    icon: Cloud,
    title: "SaaS 제품 SEO 전략",
    description: "B2B SaaS의 복잡한 Customer Journey를 고려한 Funnel 기반 SEO를 구축합니다. Product-Led Growth 전략과 연계하여 Free Trial → Paid Conversion을 극대화합니다.",
    features: ["Bottom-of-Funnel 키워드 공략", "Comparison 페이지 최적화", "Feature별 랜딩 페이지 전략"]
  },
  {
    icon: Cpu,
    title: "AI 검색 퍼스트 아키텍처",
    description: "JSON-LD Schema, FAQ Markup, How-To Markup 등 구조화된 데이터로 AI가 이해하기 쉬운 정보 구조를 설계합니다. Zero-Click Search에 대응하는 콘텐츠 전략을 제공합니다.",
    features: ["Featured Snippet 최적화", "Knowledge Graph 구축", "Entity SEO"]
  },
  {
    icon: Database,
    title: "SaaS 성장 지표 최적화",
    description: "MRR, CAC, LTV 등 SaaS 핵심 지표와 연동된 SEO 성과를 추적합니다. Product Analytics와 연계하여 검색 유입 → 가입 → 활성화 전환율을 실시간 모니터링합니다.",
    features: ["Cohort 분석", "Funnel Tracking", "Attribution Modeling"]
  }
];

const benefits = [
  {
    icon: Target,
    title: "자연 검색 트래픽 200% 증가",
    description: "유료 광고 없이 Google 검색 결과 상위 노출로 지속 가능한 트래픽 확보"
  },
  {
    icon: Sparkles,
    title: "AI 검색 엔진 대응",
    description: "ChatGPT, Perplexity 등 차세대 검색 엔진에서 Featured Answer로 노출"
  },
  {
    icon: Award,
    title: "브랜드 권위 구축",
    description: "검색 결과 상위 노출을 통한 브랜드 신뢰도 및 전문성 강화"
  }
];

const process = [
  {
    step: "01",
    title: "사이트 진단 & 키워드 리서치",
    description: "현재 검색 노출 상태를 분석하고, 타겟 키워드를 선정합니다."
  },
  {
    step: "02",
    title: "기술 SEO 최적화",
    description: "사이트 구조, 속도, 모바일 최적화, Schema Markup을 구현합니다."
  },
  {
    step: "03",
    title: "콘텐츠 최적화 & GEO 전략",
    description: "검색 의도에 맞춘 콘텐츠와 AI 검색용 답변형 콘텐츠를 작성합니다."
  },
  {
    step: "04",
    title: "모니터링 & 지속 개선",
    description: "Search Console 데이터를 기반으로 랭킹과 트래픽을 지속적으로 개선합니다."
  }
];

export function SEOGEOClient() {
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
              <Search className="w-4 h-4" />
              <span className="text-sm font-semibold">Search Optimization</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              SEO & GEO 최적화
            </h1>

            <p className="text-xl text-blue-100 leading-relaxed">
              Google 검색부터 ChatGPT까지<br className="hidden md:block" />
              모든 검색 엔진에서 상위 노출되는 전략
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 md:px-6 max-w-7xl py-20">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-4">
            Why SEO & GEO
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            왜 SEO & GEO가 필요한가?
          </h2>
          <p className="text-xl text-slate-600">
            유료 광고 없이 지속 가능한 트래픽 확보
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-blue-200 hover:shadow-xl transition-all duration-300">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-blue-50 mb-6">
                  <benefit.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {benefit.description}
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
              검색 노출을 극대화하는 4가지 전략
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
                  <service.icon 
                    className="w-7 h-7 transition-transform duration-300 group-hover:scale-110" 
                    style={{ color: service.color }}
                  />
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
        </div>
      </section>

      {/* AI & SaaS SEO Section */}
      <section className="container mx-auto px-4 md:px-6 max-w-7xl py-20">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-4">
            AI & SaaS Specialized
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            AI & SaaS 전문 SEO
          </h2>
          <p className="text-xl text-slate-600">
            차세대 검색 환경과 B2B SaaS에 특화된 고급 전략
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {aiSaasServices.map((service, index) => (
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

        {/* AI & SaaS Insight Box */}
        <FadeIn delay={0.4}>
          <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-green-50 border border-blue-100">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-start gap-4">
                <Sparkles className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">
                    왜 AI & SaaS SEO가 중요한가?
                  </h3>
                  <div className="space-y-3 text-slate-700 leading-relaxed">
                    <p>
                      <strong className="text-slate-900">• AI 검색 시대:</strong> 2024년 기준, ChatGPT의 월간 사용자는 1억 명을 돌파했으며, Google도 AI Overview(SGE)를 본격 도입했습니다. 전통적인 검색 결과 10개가 아닌, 단 하나의 AI 생성 답변만 노출되는 환경에서 살아남으려면 GEO 전략이 필수입니다.
                    </p>
                    <p>
                      <strong className="text-slate-900">• SaaS 특수성:</strong> B2B SaaS는 긴 구매 주기(3~12개월), 다수의 의사결정자(평균 6.8명), 높은 CAC(Customer Acquisition Cost)를 특징으로 합니다. "CRM software"같은 일반 키워드가 아닌, "HubSpot vs Salesforce pricing comparison 2026" 같은 Long-tail, High-intent 키워드 전략이 ROI를 결정합니다.
                    </p>
                    <p>
                      <strong className="text-slate-900">• Product-Led SEO:</strong> SaaS는 제품 자체가 마케팅 채널입니다. 무료 체험판(Freemium) 사용자가 검색을 통해 특정 기능(Feature)을 발견하고, Help Center 문서를 통해 활성화(Activation)되는 경로를 설계해야 합니다. 이는 단순한 트래픽 증가가 아닌, Qualified Lead 확보 전략입니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Process Section */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-4">
            Process
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            진행 프로세스
          </h2>
          <p className="text-xl text-slate-600">
            체계적인 4단계 SEO 최적화
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {process.map((item, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div className="relative p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-100">
                <div className="text-5xl font-bold text-blue-600/20 mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
        </div>
      </section>

      {/* FAQ Section */}
      <SEOFAQ />

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-600 py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <FadeIn delay={0.1}>
            <div>
            <Sparkles className="w-12 h-12 text-white mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              지금 바로 무료 SEO 진단을 받아보세요
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              현재 사이트의 검색 노출 상태를 분석하고 개선 방안을 무료로 제안해드립니다
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
