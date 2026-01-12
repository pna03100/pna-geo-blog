/**
 * [Section] Expertise & Partners - Authority signals
 * [Layout] Asymmetric split design
 */

"use client";

import { motion } from "framer-motion";
import { Award, Users, Briefcase, TrendingUp } from "lucide-react";
import { FadeIn } from "./FadeIn";
import { SectionWrapper } from "./SectionWrapper";
import { GlassCard } from "./GlassCard";
import Image from "next/image";

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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: CEO & Expertise */}
        <div className="space-y-8">
          <FadeIn>
            <span className="inline-block px-4 py-2 rounded-full bg-blue-500/15 border border-blue-200/50 text-blue-600 text-sm font-bold">
              Expertise
            </span>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-950 tracking-tight leading-tight md:!leading-[1.3]">
              검증된 전문성과
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
                신뢰할 수 있는 파트너
              </span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <GlassCard hover={false}>
              <div className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-4xl shadow-lg">
                    👨‍💼
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-950">안태민 CEO</h3>
                    <p className="text-slate-700 font-medium">Founder & Chief Executive Officer</p>
                  </div>
                </div>
                <p className="text-slate-800 leading-relaxed font-medium">
                  15년간 대기업 마케팅 프로젝트를 진행하며 쌓은 경험과 데이터 기반
                  접근법으로 클라이언트의 비즈니스 성장을 이끌어냅니다.
                </p>
              </div>
            </GlassCard>
          </FadeIn>

          <div className="grid grid-cols-2 gap-4">
            {expertise.map((item, index) => {
              const Icon = item.icon;
              return (
                <FadeIn key={item.title} delay={0.3 + index * 0.1}>
                  <GlassCard hover={false}>
                    <div className="p-6">
                      <Icon className="w-6 h-6 text-blue-600 mb-3" />
                      <h4 className="font-bold text-slate-950 mb-1">
                        {item.title}
                      </h4>
                      <p className="text-sm text-slate-700 font-medium">{item.description}</p>
                    </div>
                  </GlassCard>
                </FadeIn>
              );
            })}
          </div>
        </div>

        {/* Right: Partners */}
        <div className="space-y-8">
          <FadeIn delay={0.2}>
            <h3 className="text-3xl font-bold text-slate-950 mb-4">
              주요 파트너사
            </h3>
            <p className="text-slate-700 mb-8 font-medium">
              대기업부터 스타트업까지, 다양한 산업군의 클라이언트와 함께합니다
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <GlassCard hover={false}>
              <div className="p-8">
                <div className="grid grid-cols-3 gap-6">
                  {partners.map((partner, index) => (
                    <motion.div
                      key={partner.name}
                      initial={{ opacity: 0.5, scale: 0.95 }}
                      whileHover={{ opacity: 1, scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-50/50 hover:bg-white/80 transition-all duration-300"
                    >
                      <span className="text-4xl mb-2">{partner.logo}</span>
                      <span className="text-sm font-medium text-slate-700">
                        {partner.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="bg-gradient-to-r from-blue-500/15 to-sky-500/15 rounded-3xl p-8 border border-blue-200/50">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    500+
                  </div>
                  <div className="text-sm text-slate-800 font-semibold">성공 프로젝트</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-1">98%</div>
                  <div className="text-sm text-slate-800 font-semibold">고객 만족도</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    24/7
                  </div>
                  <div className="text-sm text-slate-800 font-semibold">실시간 지원</div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </SectionWrapper>
  );
}
