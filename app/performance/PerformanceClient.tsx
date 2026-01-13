/**
 * [Client] Performance Marketing Service Page
 * Premium Green Theme
 * [Animation] Scroll-triggered entrance for sections
 */

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { TrendingUp, Target, BarChart3, Zap, CheckCircle2, ArrowRight, Sparkles, Award, DollarSign } from "lucide-react";
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
      <section className="relative bg-gradient-to-br from-[#0F9D58] via-[#0F9D58] to-[#0A8043] text-white py-20 overflow-hidden">
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

            <p className="text-xl text-green-100 leading-relaxed">
              데이터로 증명하는 광고 성과<br className="hidden md:block" />
              평균 ROAS 500%를 달성합니다
            </p>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="container mx-auto px-4 md:px-6 max-w-7xl py-20">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-green-50 text-green-600 text-sm font-semibold mb-4">
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
                className="group p-8 rounded-2xl bg-white border border-slate-200 hover:border-green-200 hover:shadow-xl transition-all duration-300 text-center"
              >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-green-50 mb-6">
                <DollarSign className="w-7 h-7 text-green-600" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">
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
      <section className="bg-gradient-to-br from-slate-50 to-green-50 py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-green-200 text-green-600 text-sm font-semibold mb-4">
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
                  className="group p-8 rounded-2xl bg-white border border-slate-200 hover:border-green-200 hover:shadow-xl transition-all duration-300"
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
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-600 flex items-center justify-center">
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

      {/* FAQ Section */}
      <PerformanceFAQ />

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-700 py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <FadeIn delay={0.1}>
            <div>
            <Sparkles className="w-12 h-12 text-white mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              성과 중심 광고, 지금 시작하세요
            </h2>
            <p className="text-xl text-green-100 mb-8">
              15년 노하우로 검증된 퍼포먼스 마케팅 전략을 무료로 상담받아보세요
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-green-600 font-bold hover:bg-green-50 transition-all duration-300 shadow-lg"
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
