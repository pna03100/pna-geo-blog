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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
        {/* Left: CEO & Expertise */}
        <div className="space-y-6 md:space-y-8">
          <div className="text-center md:text-left">
            <FadeIn>
              <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-white border border-slate-200 shadow-lg shadow-slate-900/5 text-[#2563EB] text-xs md:text-sm font-semibold mb-4 md:mb-6">
                Expertise
              </span>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-3 md:mb-4 tracking-tight !leading-[1.3]">
                검증된 전문성과
                <br />
                <span className="text-[#2563EB]">
                  신뢰할 수 있는 파트너
                </span>
              </h2>
            </FadeIn>
          </div>

          <FadeIn delay={0.2}>
            <div className="rounded-xl md:rounded-2xl bg-white border border-slate-200 shadow-sm p-5 md:p-8">
              <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-blue-50 flex items-center justify-center text-2xl md:text-4xl">
                  👨‍💼
                </div>
                <div>
                  <h3 className="text-lg md:text-2xl font-bold text-slate-900">안태민 CEO</h3>
                  <p className="text-xs md:text-base text-slate-500 font-medium">Founder & Chief Executive Officer</p>
                </div>
              </div>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed font-medium">
                15년간 대기업 마케팅 프로젝트를 진행하며 쌓은 경험과 데이터 기반
                접근법으로 클라이언트의 비즈니스 성장을 이끌어냅니다.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {expertise.map((item, index) => {
              const Icon = item.icon;
              return (
                <FadeIn key={item.title} delay={0.3 + index * 0.1}>
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
        </div>

        {/* Right: Partners */}
        <div className="lg:mt-[106px]">
          <FadeIn delay={0.2}>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-950 mb-3 md:mb-4 text-center md:text-left">
              주요 파트너사
            </h3>
            <p className="text-sm md:text-base text-slate-700 mb-6 md:mb-8 font-medium text-center md:text-left">
              대기업부터 스타트업까지, 다양한 산업군의 클라이언트와 함께합니다
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="rounded-xl md:rounded-2xl bg-white border border-slate-200 shadow-sm p-5 md:p-8">
              <div className="grid grid-cols-3 gap-4 md:gap-6">
                {partners.map((partner, index) => (
                  <motion.div
                    key={partner.name}
                    initial={{ opacity: 0.5, scale: 0.95 }}
                    whileHover={{ opacity: 1, scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center justify-center p-4 md:p-6 rounded-lg md:rounded-xl bg-slate-50 hover:bg-blue-50 transition-all duration-300"
                  >
                    <span className="text-2xl md:text-4xl mb-1 md:mb-2">{partner.logo}</span>
                    <span className="text-sm font-medium text-slate-700">
                      {partner.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100 mt-8">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-[#2563EB] mb-1">
                    500+
                  </div>
                  <div className="text-sm text-slate-600 font-semibold">성공 프로젝트</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#2563EB] mb-1">98%</div>
                  <div className="text-sm text-slate-600 font-semibold">고객 만족도</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#2563EB] mb-1">
                    24/7
                  </div>
                  <div className="text-sm text-slate-600 font-semibold">실시간 지원</div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </SectionWrapper>
  );
}
