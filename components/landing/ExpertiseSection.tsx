/**
 * [Section] Trust & Authority - Complete Redesign
 * [Design] Premium B2B Layout with Strong Visual Hierarchy
 * [Purpose] Build credibility through data and partnerships
 */

"use client";

import { motion } from "framer-motion";
import { Award, Briefcase, TrendingUp, Users, CheckCircle2, Building2, Target } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionWrapper } from "./SectionWrapper";
import { SectionTitle } from "./SectionTitle";

const stats = [
  {
    icon: Award,
    value: "500%",
    label: "평균 ROAS",
    description: "업계 최고 수준"
  },
  {
    icon: TrendingUp,
    value: "470억+",
    label: "누적 광고비 집행",
    description: "검증된 실적"
  },
  {
    icon: Users,
    value: "500+",
    label: "성공 프로젝트",
    description: "15년간 쌓은 노하우"
  },
  {
    icon: Target,
    value: "98%",
    label: "고객 만족도",
    description: "지속 파트너십"
  },
];

const partners = [
  { name: "삼성전자", emoji: "🔷", category: "대기업" },
  { name: "한화시스템", emoji: "🟠", category: "방산/에너지" },
  { name: "대보건설", emoji: "🏗️", category: "건설" },
  { name: "Google", emoji: "🔴", category: "공식 파트너" },
  { name: "Naver", emoji: "🟢", category: "플랫폼" },
  { name: "Kakao", emoji: "🟡", category: "플랫폼" },
];

const certifications = [
  {
    icon: Award,
    title: "Google Partner",
    description: "구글 공식 인증 파트너",
    badge: "Official"
  },
  {
    icon: Briefcase,
    title: "15년+ 경력",
    description: "대기업 포트폴리오 다수",
    badge: "Expert"
  },
  {
    icon: Building2,
    title: "광고 법인",
    description: "15년 운영 실적",
    badge: "Trusted"
  },
];

export function ExpertiseSection() {
  return (
    <SectionWrapper id="about" className="bg-white">
      <SectionTitle
        badge="Trust & Authority"
        title="검증된 전문성"
        description="대한민국 대표 기업들이 선택한 데이터 마케팅 파트너"
        align="center"
      />

      {/* CEO Profile - Full Width */}
      <FadeIn delay={0.2}>
        <div className="rounded-2xl overflow-hidden mb-12 shadow-xl">
          <div className="grid md:grid-cols-[300px,1fr] gap-0">
            {/* Left: Avatar Only - Full Height */}
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-8xl md:text-9xl p-12 md:p-16">
              👨‍💼
            </div>

            {/* Right: Info + Achievements */}
            <div className="p-8 md:p-10 text-white space-y-6 bg-gradient-to-br from-slate-800 via-slate-900 to-blue-950">
              {/* Header Section */}
              <div className="space-y-4 pb-6 border-b border-slate-600">
                {/* Name */}
                <h3 className="text-3xl md:text-4xl font-bold" style={{ lineHeight: '1.3' }}>
                  안태민
                </h3>

                {/* Slogan */}
                <p className="text-slate-200 text-base md:text-lg">
                  Founder & CEO
                </p>

                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-bold">
                  <span>✨</span>
                  <span>AI · SEO · GEO 전문 컨설턴트</span>
                </div>
              </div>

              {/* Friendly Introduction - Extended */}
              <div className="space-y-3">
                <p className="text-base md:text-lg text-slate-200 leading-relaxed">
                  데이터 기반의 과학적 마케팅으로 고객사의 성공을 함께 만들어갑니다.
                </p>
                <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                  15년간 대기업부터 스타트업까지 다양한 비즈니스와 함께하며 쌓아온 경험과 노하우를 바탕으로, 
                  데이터에 기반한 전략적 마케팅 솔루션을 제공합니다. 
                  고객사의 지속 가능한 성장과 성공이 저희의 가장 큰 목표입니다.
                </p>
              </div>

              {/* Achievements - 2x2 Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-300 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm md:text-base text-white font-bold leading-relaxed">
                      15년 퍼포먼스 마케터
                    </p>
                    <p className="text-xs md:text-sm text-slate-300">
                      구글 애즈 및 GA4 전문가
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-300 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm md:text-base text-white font-bold leading-relaxed">
                      구글 우수 100대 캠페인
                    </p>
                    <p className="text-xs md:text-sm text-slate-300">
                      2023년 공식 선정
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-300 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm md:text-base text-white font-bold leading-relaxed">
                      한화시스템 · 대보건설
                    </p>
                    <p className="text-xs md:text-sm text-slate-300">
                      마케팅 총괄 CFO
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-300 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm md:text-base text-white font-bold leading-relaxed">
                      광고 법인 15년 운영
                    </p>
                    <p className="text-xs md:text-sm text-slate-300">
                      500+ 성공 프로젝트
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Certifications - Centered Below */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:divide-x md:divide-slate-200 max-w-4xl mx-auto">
        {certifications.map((cert, index) => {
          const Icon = cert.icon;
          return (
            <FadeIn key={cert.title} delay={0.3 + index * 0.1}>
              <div className="px-8 py-6 md:py-0 text-center">
                {/* Badge */}
                <div className="inline-block px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold mb-6">
                  {cert.badge}
                </div>
                
                {/* Icon */}
                <Icon className="w-12 h-12 text-blue-600 mx-auto mb-5" />
                
                {/* Content */}
                <h4 className="text-lg font-bold text-slate-900 mb-2" style={{ lineHeight: '1.35' }}>
                  {cert.title}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {cert.description}
                </p>
              </div>
            </FadeIn>
          );
        })}
      </div>

    </SectionWrapper>
  );
}
