/**
 * [Page] About - "The Brand Story" Archetype
 * [Design] Typography Focus + Elegant Storytelling
 * [Style] 2026 Unified Design Language
 */

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { 
  Users, 
  Award, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  Lightbulb,
  Shield,
  Zap,
  Heart
} from "lucide-react";

const coreValues = [
  {
    icon: Lightbulb,
    title: "데이터 기반 의사결정",
    description: "직관이 아닌 데이터와 분석을 통해 최적의 마케팅 전략을 수립합니다.",
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: Shield,
    title: "투명한 커뮤니케이션",
    description: "모든 과정을 투명하게 공유하고 실시간 리포트로 성과를 확인하실 수 있습니다.",
    color: "from-indigo-500 to-indigo-600"
  },
  {
    icon: Zap,
    title: "빠른 실행력",
    description: "시장 변화에 민첩하게 대응하며 최적화 작업을 지속적으로 수행합니다.",
    color: "from-violet-500 to-violet-600"
  },
  {
    icon: Heart,
    title: "고객 성공 우선",
    description: "클라이언트의 성공이 곧 저희의 성공입니다. 함께 성장하는 파트너가 되겠습니다.",
    color: "from-purple-500 to-purple-600"
  }
];

const timeline = [
  { year: "2010", title: "피앤에이컴퍼니 설립" },
  { year: "2015", title: "Google Partner 인증" },
  { year: "2020", title: "대기업 프로젝트 확대" },
  { year: "2023", title: "구글 우수 100대 캠페인 선정" },
  { year: "2025", title: "AI & GEO 전문 서비스 출시" }
];


export function AboutClient() {
  return (
    <main className="relative min-h-screen pt-[73px]">
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* HERO SECTION */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
        {/* 1. Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/company-hero-bg.jpg.jpg"
            alt="Company Background"
            fill
            className="object-cover object-bottom"
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
            <Award className="w-4 h-4 text-white" />
            <span className="text-sm font-bold text-white">Company Story</span>
          </motion.div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ lineHeight: '1.35' }}>
            About PNA
          </h1>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg md:text-xl text-slate-200 font-medium max-w-3xl mx-auto"
          >
            데이터 기반 마케팅 전략과 AI 기술로 클라이언트의 성장을 이끄는 디지털 마케팅 전문 기업
          </motion.p>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* COMPANY STORY & CEO */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative pt-20 pb-20 md:pt-32 md:pb-32 border-b border-slate-300">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 items-center">
            {/* Left: Company Story - Typography Focus */}
            <div>
              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-8">
                    <div className="mb-3">피앤에이컴퍼니는</div>
                    <div className="mb-3">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                        데이터기반 마케팅을
                      </span>
                    </div>
                    <div>선도하는 기업입니다</div>
                  </h2>
                </div>

                <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                  <p>
                    2010년 설립 이후 <span className="font-bold text-slate-900">15년간</span> 디지털 마케팅 분야에서 쌓아온 노하우와 경험을 바탕으로, 
                    데이터 기반의 과학적인 마케팅 전략을 제공합니다.
                  </p>
                  <p>
                    구글 애즈, SEO, 워드프레스 개발, 퍼포먼스 마케팅 등 디지털 마케팅의 모든 영역에서 
                    전문성을 인정받으며, <span className="font-bold text-slate-900">대기업부터 스타트업까지</span> 다양한 클라이언트와 함께 성장하고 있습니다.
                  </p>
                </div>

                {/* Key Highlights */}
                <div className="grid grid-cols-2 gap-0 divide-x divide-slate-200 pt-6">
                  <div className="pr-6">
                    <div className="text-3xl font-bold text-blue-600 mb-1">500+</div>
                    <div className="text-sm font-bold text-slate-700">성공 프로젝트</div>
                  </div>
                  <div className="pl-6">
                    <div className="text-3xl font-bold text-blue-600 mb-1">98%</div>
                    <div className="text-sm font-bold text-slate-700">고객 만족도</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: CEO Card - Dark Mode Style */}
            <div>
              <div className="relative group">
                <div className="relative rounded-3xl bg-gradient-to-br from-slate-800 via-slate-900 to-blue-950 shadow-2xl p-8 md:p-10">
                  <span className="inline-block px-3 py-1.5 rounded-full bg-blue-600 text-white text-xs font-bold mb-6">
                    Leadership
                  </span>

                  {/* CEO Info */}
                  <div className="flex items-start gap-6 mb-8">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-6xl shadow-xl flex-shrink-0">
                      👨‍💼
                    </div>
                    <div className="flex-1">
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">안태민</h3>
                      <p className="text-base text-slate-200 font-bold mb-3">Founder & CEO</p>
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 rounded-full">
                        <Sparkles className="w-4 h-4 text-white" />
                        <span className="text-sm text-white font-bold">AI · SEO · GEO 전문 컨설턴트</span>
                      </div>
                    </div>
                  </div>

                  {/* Credentials */}
                  <div className="space-y-4">
                    {[
                      { label: "15년 퍼포먼스 마케터", desc: "구글 애즈 및 GA4 전문가" },
                      { label: "구글 우수 100대 캠페인", desc: "2023년 공식 선정" },
                      { label: "한화시스템 · 대보건설", desc: "마케팅 총괄 CFO" },
                      { label: "광고 법인 15년 운영", desc: "500+ 성공 프로젝트" }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-white/5 backdrop-blur border border-slate-700 hover:border-blue-500 hover:bg-white/10 transition-all">
                        <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-bold text-white">{item.label}</p>
                          <p className="text-xs text-slate-300">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* TIMELINE - Vertical Clean List */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative bg-slate-100 py-20 md:py-32 border-b border-slate-300 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4" style={{ lineHeight: '1.35' }}>
              15년간의 성장 여정
            </h2>
            <p className="text-lg text-slate-600">
              2010년부터 지금까지, 지속적인 혁신과 성장
            </p>
          </div>

          <div className="relative">
            {/* Horizontal Timeline */}
            <div className="hidden md:block">
              {/* Timeline Line */}
              <div className="absolute top-[50px] left-0 right-0 h-0.5 bg-slate-300" />

              <div className="flex justify-between items-start">
                {timeline.map((item, index) => (
                  <div key={item.year} className="relative flex flex-col items-center group" style={{ width: '20%' }}>
                    {/* Year */}
                    <div className="relative z-10 mb-8">
                      <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-indigo-600 group-hover:scale-110 transition-transform inline-block">
                        {item.year}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="text-center px-2">
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-relaxed">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile: Vertical Timeline */}
            <div className="md:hidden space-y-6">
              {timeline.map((item, index) => (
                <div key={item.year} className="flex items-center gap-4 group">
                  <div className="flex-shrink-0">
                    <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-indigo-600">
                      {item.year}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* WHY PNA - Customer-Friendly Approach */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative py-20 md:py-32 border-b border-slate-300">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4" style={{ lineHeight: '1.35' }}>
              왜 피앤에이컴퍼니인가요?
            </h2>
            <p className="text-xl text-slate-600">
              고객사들이 저희를 선택하는 이유입니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                emoji: "🤝",
                title: "함께 성장하는 파트너",
                desc: "단순 대행사가 아닌, 고객사의 성공이 곧 저희의 성공입니다. 장기적인 관점에서 함께 성장합니다."
              },
              {
                emoji: "💬",
                title: "투명한 소통",
                desc: "실시간 대시보드와 정기 리포트로 모든 과정을 투명하게 공유합니다. 궁금한 점은 언제든 물어보세요."
              },
              {
                emoji: "⚡",
                title: "빠른 실행력",
                desc: "시장은 빠르게 변합니다. 신속한 의사결정과 즉각적인 최적화로 기회를 놓치지 않습니다."
              }
            ].map((item, idx) => (
              <div key={item.title} className="p-8 rounded-2xl bg-white border-2 border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all text-center">
                <div className="text-5xl mb-6">{item.emoji}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* CORE VALUES - Card Grid */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative bg-slate-100 py-20 md:py-32 border-b border-slate-300">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4" style={{ lineHeight: '1.35' }}>
              우리가 일하는 방식
            </h2>
            <p className="text-xl text-slate-600">
              클라이언트의 성공을 위한 4가지 원칙
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-300 max-w-6xl mx-auto">
            {coreValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="bg-slate-100 p-8 md:p-10 hover:bg-white transition-all duration-300">
                  {/* Icon */}
                  <Icon className="w-12 h-12 text-blue-600 mb-6" />

                  {/* Content */}
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4" style={{ lineHeight: '1.35', minHeight: '2.7em' }}>
                    {value.title}
                  </h3>
                  <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* PARTNERS & CLIENTS - Split Layout */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative py-20 md:py-32 border-b border-slate-300">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20">
            {/* Left: Trust Indicators */}
            <div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 leading-[1.3]">
                  신뢰받는 파트너
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-900 mb-1">500+ 프로젝트</div>
                      <div className="text-sm text-slate-600">성공적으로 완수</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-900 mb-1">98% 만족도</div>
                      <div className="text-sm text-slate-600">고객 리텐션율</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-900 mb-1">대기업 협업</div>
                      <div className="text-sm text-slate-600">삼성, 한화, 대보건설 등</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-900 mb-1">Google Partner</div>
                      <div className="text-sm text-slate-600">공식 인증 파트너</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Client Types */}
            <div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 leading-[1.3]">
                  다양한 산업군과 함께
                </h2>

                <div className="space-y-4">
                  {[
                    { category: "대기업", examples: "삼성, 한화시스템, 대보건설" },
                    { category: "IT/테크", examples: "SaaS, 플랫폼, 모바일 앱" },
                    { category: "이커머스", examples: "온라인 쇼핑몰, D2C 브랜드" },
                    { category: "교육", examples: "에듀테크, 온라인 강의" },
                    { category: "의료/헬스케어", examples: "병원, 건강 서비스" },
                    { category: "금융/핀테크", examples: "금융 서비스, 결제 솔루션" }
                  ].map((item, idx) => (
                    <motion.div
                      key={item.category}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.05 * idx }}
                      className="p-4 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-baseline gap-3">
                        <div className="text-lg font-bold text-blue-600">{item.category}</div>
                        <div className="text-sm text-slate-600">{item.examples}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* CTA - Direct & Impactful */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative bg-slate-900 py-16 md:py-20 overflow-hidden border-t-4 border-blue-600">
        {/* Subtle Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />

        <div className="container relative mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Message */}
            <div className="text-left">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 whitespace-nowrap" style={{ lineHeight: '1.35' }}>
                다음 성공 프로젝트의 주인공은 당신입니다
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed">
                15년 경력의 전문가가 직접 상담해드립니다.<br />
                지금 바로 무료 컨설팅을 시작하세요.
              </p>
            </div>

            {/* Right: CTA */}
            <div className="flex justify-start lg:justify-end">
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-2xl hover:shadow-blue-600/50 text-lg overflow-hidden"
              >
                <span className="relative z-10">무료 상담 신청</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
