/**
 * [Section] Expertise & Partners - Authority signals
 * [Layout] Asymmetric split design
 * [Animation] Scroll-triggered entrance for cards
 */

"use client";

import { motion } from "framer-motion";
import { Award, Users, Briefcase, TrendingUp, CheckCircle2, Sparkles } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionWrapper } from "./SectionWrapper";
import { SectionTitle } from "./SectionTitle";

const expertise = [
  {
    icon: Award,
    title: "Google Partner",
    description: "구글 공식 파트너 인증",
  },
  {
    icon: Briefcase,
    title: "15년+ 경험",
    description: "대기업 포트폴리오 다수 보유",
  },
  {
    icon: Users,
    title: "전담 매니저",
    description: "1:1 맞춤 전략 수립",
  },
  {
    icon: TrendingUp,
    title: "실시간 최적화",
    description: "24/7 캠페인 모니터링",
  },
];

const partners = [
  { name: "Samsung", logo: "🔵" },
  { name: "Hanwha", logo: "🟠" },
  { name: "Daebo", logo: "🟢" },
  { name: "Google", logo: "🔴" },
  { name: "Naver", logo: "🟢" },
  { name: "Kakao", logo: "🟡" },
];

export function ExpertiseSection() {
  return (
    <SectionWrapper id="about">
      <SectionTitle
        badge="Expertise"
        title={<>검증된 전문성과<br />신뢰할 수 있는 파트너</>}
        description="15년간 쌓아온 전문성과 대기업 프로젝트 경험으로 최고의 성과를 보장합니다"
        align="center"
      />

      {/* Google Award Banner - Matches About Page */}
      <FadeIn delay={0.2}>
        <div className="mt-12 md:mt-16 mb-8 md:mb-12">
          <div className="relative group max-w-6xl mx-auto">
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
                  <Award className="w-5 h-5 fill-blue-600 text-blue-600" />
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
                    <h4 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 whitespace-nowrap">
                        2023 구글 선정
                      </span>
                    </h4>
                    <span className="text-4xl md:text-5xl lg:text-6xl">🏆</span>
                  </div>
                  <h5 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">
                    우수 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">100대</span> 캠페인
                  </h5>
                </motion.div>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="text-base md:text-lg text-slate-600 font-medium"
                >
                  Google Korea가 인정한 대한민국 대표 마케팅 캠페인
                </motion.p>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-stretch mt-8 md:mt-12">
        {/* Left: CEO Profile */}
        <div>
          <FadeIn delay={0.1}>
            <div className="rounded-xl md:rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-200 shadow-lg p-6 md:p-8 h-full flex flex-col">
              {/* CEO Header */}
              <div className="flex items-start gap-3 md:gap-4 mb-6">
                <div className="w-14 h-14 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-3xl md:text-5xl shadow-lg">
                  👨‍💼
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl md:text-3xl font-bold text-slate-900 leading-[1.4]">안태민 CEO</h3>
                    <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                  </div>
                  <p className="text-sm md:text-base text-slate-600 font-semibold mb-2">Founder & Chief Executive Officer</p>
                  <p className="text-xs md:text-sm text-blue-600 font-bold">AI · SEO · GEO 전문 컨설턴트</p>
                </div>
              </div>

              {/* CEO Achievements */}
              <div className="space-y-3 mb-6 flex-1">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm md:text-base text-slate-700 font-medium">
                    <span className="font-bold text-slate-900">15년 퍼포먼스 마케터</span> - 구글 애즈 및 GA4 데이터 분석 전문가
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm md:text-base text-slate-700 font-medium">
                    <span className="font-bold text-slate-900">2023년 구글 코리아</span> 공식 포럼 초청 인사
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm md:text-base text-slate-700 font-medium">
                    <span className="font-bold text-slate-900">한화시스템 · 대보건설</span> 태양광 프로젝트 마케팅 총괄 CFO (2025~2026)
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm md:text-base text-slate-700 font-medium">
                    <span className="font-bold text-slate-900">광고 법인 15년 운영</span> - 500+ 성공 프로젝트 달성
                  </p>
                </div>
              </div>

              {/* Bottom Badge */}
              <div className="pt-5 pb-1 border-t border-blue-100 mt-auto">
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                  데이터 기반 마케팅 전략과 AI 기술을 활용한 차세대 디지털 마케팅으로 클라이언트의 비즈니스 성장을 이끌어냅니다.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Right: Expertise Cards & Stats */}
        <div className="flex flex-col h-full">
          {/* Expertise Cards */}
          <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
            {expertise.map((item, index) => {
              const Icon = item.icon;
              return (
                <FadeIn key={item.title} delay={0.2 + index * 0.1}>
                  <div className="rounded-xl md:rounded-2xl bg-white border border-slate-200 shadow-sm p-4 md:p-6 hover:border-[#2563EB] hover:shadow-md transition-all">
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-[#2563EB] mb-2 md:mb-3" />
                    <h4 className="text-sm md:text-base font-bold text-slate-900 mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs md:text-sm text-slate-500 font-medium">{item.description}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          {/* Stats - 2번 카드 밑으로 이동 */}
          <FadeIn delay={0.3}>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 md:p-8 border border-blue-100 flex-1 flex items-center justify-center">
              <div className="grid grid-cols-3 gap-4 md:gap-6 text-center w-full">
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-[#2563EB] mb-1">
                    500+
                  </div>
                  <div className="text-xs md:text-sm text-slate-600 font-semibold">성공 프로젝트</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-[#2563EB] mb-1">98%</div>
                  <div className="text-xs md:text-sm text-slate-600 font-semibold">고객 만족도</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-[#2563EB] mb-1">
                    15년+
                  </div>
                  <div className="text-xs md:text-sm text-slate-600 font-semibold">업계 경력</div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Partners Section - 전체 폭으로 아래 배치 */}
      <FadeIn delay={0.4}>
        <div className="rounded-xl md:rounded-2xl bg-white border border-slate-200 shadow-sm p-6 md:p-10 mt-12 md:mt-16">
          <div className="text-center mb-8 md:mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 md:mb-4">
              주요 파트너사
            </h3>
            <p className="text-sm md:text-base text-slate-600 font-medium">
              대기업부터 스타트업까지, 다양한 산업군과 함께합니다
            </p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6 max-w-5xl mx-auto">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0.5, scale: 0.95 }}
                whileHover={{ opacity: 1, scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center justify-center p-4 md:p-6 rounded-xl bg-slate-50 hover:bg-blue-50 transition-all duration-300"
              >
                <span className="text-2xl md:text-4xl mb-2">{partner.logo}</span>
                <span className="text-xs md:text-sm font-medium text-slate-700">
                  {partner.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </FadeIn>
    </SectionWrapper>
  );
}
