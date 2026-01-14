/**
 * [Page] About - Company Introduction
 * [Design] Clean & Professional with Brand Consistency
 * [Focus] Google Award Showcase + Data Visualization
 */

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { 
  Users, 
  Award, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  Lightbulb,
  Shield,
  Zap,
  Heart,
  Trophy,
  Star
} from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

// Counter Animation Hook
function useCountUp(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isVisible) return;
    
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      setCount(Math.floor(end * percentage));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isVisible]);

  return { count, setIsVisible };
}

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
  { year: "2010", title: "피앤에이컴퍼니 설립", icon: Star },
  { year: "2015", title: "Google Partner 인증", icon: Award },
  { year: "2020", title: "대기업 프로젝트 확대", icon: Trophy },
  { year: "2023", title: "구글 코리아 우수 100대 캠페인 선정", icon: Sparkles },
  { year: "2025", title: "AI & GEO 전문 서비스 출시", icon: Zap }
];

const partners = [
  { name: "Samsung", logo: "🔵" },
  { name: "Hanwha", logo: "🟠" },
  { name: "Daebo", logo: "🟢" },
  { name: "Google", logo: "🔴" },
  { name: "Naver", logo: "🟢" },
  { name: "Kakao", logo: "🟡" }
];

export function AboutClient() {
  return (
    <main className="relative min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(15 23 42) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />

        <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <FadeIn delay={0.1}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-sm font-semibold mb-6">
                <Sparkles className="w-4 h-4" />
                <span>About PNA Company</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                데이터가 말하고,<br />
                <span className="text-blue-600">성과가 증명합니다</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8">
                15년간 쌓아온 전문성과 검증된 성과로<br className="hidden md:block" />
                클라이언트의 지속 가능한 성장을 이끌어냅니다
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
                >
                  <span>무료 상담 신청</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/insights"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 font-bold rounded-full border-2 border-slate-200 hover:border-blue-600 hover:text-blue-600 transition-all"
                >
                  <span>인사이트 보기</span>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Google Award Banner */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <FadeIn delay={0.1}>
            <div className="relative group">
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition duration-1000"></div>
              
              <div className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50/30 rounded-3xl border-2 border-blue-200 shadow-2xl overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.02]" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, rgb(37 99 235) 1px, transparent 0)`,
                  backgroundSize: '32px 32px'
                }} />
                
                <div className="relative p-8 md:p-12 lg:p-16 text-center">
                  {/* Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-200 text-blue-700 text-sm md:text-base font-bold mb-8 shadow-sm"
                  >
                    <Star className="w-5 h-5 fill-blue-600 text-blue-600" />
                    <span>Google Korea Recognition</span>
                  </motion.div>

                  {/* Main Title with Laurel */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="mb-6"
                  >
                    <div className="flex items-center justify-center gap-4 md:gap-6 mb-3">
                      <span className="text-4xl md:text-5xl lg:text-6xl">🏆</span>
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 whitespace-nowrap">
                          2023 구글 선정
                        </span>
                      </h2>
                      <span className="text-4xl md:text-5xl lg:text-6xl">🏆</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">
                      우수 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">100대</span> 캠페인
                    </h3>
                  </motion.div>

                  {/* Subtitle */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="text-base md:text-lg text-slate-600 mb-10 font-medium"
                  >
                    Google Korea가 인정한 대한민국 대표 마케팅 캠페인
                  </motion.p>

                  {/* Stats Grid */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="grid grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto"
                  >
                    <div className="bg-white rounded-2xl p-5 md:p-6 border border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
                      <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-indigo-600 mb-2 break-words">
                        TOP<br className="md:hidden" /> 100
                      </div>
                      <div className="text-xs md:text-sm text-slate-600 font-semibold">전국 선정</div>
                    </div>
                    <div className="bg-white rounded-2xl p-5 md:p-6 border border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
                      <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-indigo-600 mb-2">
                        2023
                      </div>
                      <div className="text-xs md:text-sm text-slate-600 font-semibold">공식 인증</div>
                    </div>
                    <div className="bg-white rounded-2xl p-5 md:p-6 border border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
                      <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-indigo-600 mb-2">
                        Google
                      </div>
                      <div className="text-xs md:text-sm text-slate-600 font-semibold">공식 파트너</div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 md:py-24 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { end: 500, label: "성공 프로젝트", icon: CheckCircle2, suffix: "+" },
              { end: 98, label: "고객 만족도", icon: Heart, suffix: "%" },
              { end: 15, label: "업계 경력", icon: Award, suffix: "년+" },
              { end: 24, label: "실시간 지원", icon: Users, suffix: "/7" }
            ].map((item, index) => {
              const Icon = item.icon;
              const { count, setIsVisible } = useCountUp(item.end, 2000);
              
              return (
                <FadeIn key={item.label} delay={index * 0.1}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    onViewportEnter={() => setIsVisible(true)}
                    className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm hover:shadow-lg transition-all text-center"
                  >
                    <Icon className="w-8 h-8 md:w-10 md:h-10 text-blue-600 mx-auto mb-4" />
                    <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                      {count}{item.suffix}
                    </div>
                    <div className="text-sm md:text-base text-slate-600 font-semibold">
                      {item.label}
                    </div>
                  </motion.div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Company Overview & CEO */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
            {/* Left: Company Story */}
            <FadeIn delay={0.1}>
              <div>
                <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-sm font-semibold rounded-full mb-6">
                  Company Story
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                  피앤에이컴퍼니는<br />
                  <span className="text-blue-600">데이터기반 마케팅을</span><br />
                  선도하는 기업입니다
                </h2>
                <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-6">
                  2010년 설립 이후 15년간 디지털 마케팅 분야에서 쌓아온 노하우와 경험을 바탕으로, 
                  데이터 기반의 과학적인 마케팅 전략을 제공합니다.
                </p>
                <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                  구글 애즈, SEO, 워드프레스 개발, 퍼포먼스 마케팅 등 디지털 마케팅의 모든 영역에서 
                  전문성을 인정받으며, 대기업부터 스타트업까지 다양한 클라이언트와 함께 성장하고 있습니다.
                </p>
              </div>
            </FadeIn>

            {/* Right: CEO */}
            <FadeIn delay={0.2}>
              <div>
                <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-sm font-semibold rounded-full mb-6">
                  Leadership
                </div>
                <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-200 shadow-lg p-6 md:p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-5xl md:text-6xl shadow-lg flex-shrink-0">
                      👨‍💼
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-2xl md:text-3xl font-bold text-slate-900">안태민 CEO</h3>
                        <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                      </div>
                      <p className="text-sm md:text-base text-slate-600 font-semibold mb-2">Founder & CEO</p>
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 rounded-full">
                        <Sparkles className="w-3 h-3 text-blue-600" />
                        <span className="text-xs md:text-sm text-blue-700 font-bold">AI · SEO · GEO 전문 컨설턴트</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-blue-100">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-slate-700">
                        <span className="font-bold">15년 퍼포먼스 마케터</span> - 구글 애즈 및 GA4 전문가
                      </p>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-blue-100">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-slate-700">
                        <span className="font-bold">2023년 구글 코리아</span> 공식 포럼 초청
                      </p>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-blue-100">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-slate-700">
                        <span className="font-bold">한화시스템 · 대보건설</span> 마케팅 총괄 CFO
                      </p>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-blue-100">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-slate-700">
                        <span className="font-bold">광고 법인 15년 운영</span> - 500+ 성공 프로젝트
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 md:py-24 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-12 md:mb-16">
            <FadeIn delay={0.1}>
              <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-sm font-semibold rounded-full mb-4">
                History
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                회사 연혁
              </h2>
              <p className="text-lg text-slate-600">
                15년간의 성장 여정
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6 max-w-5xl mx-auto">
            {timeline.map((item, index) => {
              const Icon = item.icon;
              return (
                <FadeIn key={item.year} delay={0.1 + index * 0.05}>
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-all text-center">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-xl font-bold text-blue-600 mb-2">{item.year}</div>
                    <p className="text-sm text-slate-700 font-medium">{item.title}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-12 md:mb-16">
            <FadeIn delay={0.1}>
              <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-sm font-semibold rounded-full mb-4">
                Core Values
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                우리의 핵심 가치
              </h2>
              <p className="text-lg text-slate-600">
                피앤에이컴퍼니가 일하는 방식
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {coreValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <FadeIn key={value.title} delay={0.1 + index * 0.1}>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
                    <div className="relative bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all h-full">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-6 shadow-lg`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">
                        {value.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-20 md:py-24 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-12 md:mb-16">
            <FadeIn delay={0.1}>
              <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-sm font-semibold rounded-full mb-4">
                Partners
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                주요 파트너사
              </h2>
              <p className="text-lg text-slate-600">
                대기업부터 스타트업까지, 다양한 산업군과 함께합니다
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.3}>
            <div className="bg-white rounded-2xl p-8 md:p-12 border border-slate-200 shadow-lg max-w-5xl mx-auto">
              <div className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-8">
                {partners.map((partner, index) => (
                  <motion.div
                    key={partner.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    className="flex flex-col items-center justify-center p-6 rounded-xl bg-slate-50 hover:bg-blue-50 transition-all"
                  >
                    <span className="text-4xl md:text-5xl mb-2">{partner.logo}</span>
                    <span className="text-sm font-medium text-slate-700">
                      {partner.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-600 py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <FadeIn delay={0.1}>
            <div>
            <Sparkles className="w-12 h-12 text-white mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              함께 성장할 준비가 되셨나요?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8">
              15년 경력의 전문가가 직접 상담해드립니다.<br />
              지금 바로 무료 컨설팅을 받아보세요.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-full hover:bg-blue-50 transition-all shadow-lg"
              >
                <span>무료 상담 신청</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/insights"
                className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-white font-bold rounded-full border-2 border-white hover:bg-white/10 transition-all"
              >
                <span>성공 사례 보기</span>
              </Link>
            </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
