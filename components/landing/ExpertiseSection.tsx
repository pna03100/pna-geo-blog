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

      {/* CEO & Certifications - Split Layout */}
      <div className="grid lg:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-20">
        {/* Left: CEO Profile - Premium Edition */}
        <FadeIn delay={0.2}>
          <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-2 border-slate-700/50 p-8 md:p-10 text-white overflow-hidden group hover:border-slate-600 transition-all duration-500">
            {/* Sophisticated Pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(59 130 246) 1px, transparent 0)',
              backgroundSize: '32px 32px'
            }} />
            
            {/* Blue Glow Accents */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-blue-500/15 to-indigo-500/10 rounded-full blur-3xl group-hover:opacity-100 opacity-75 transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-600/10 to-transparent rounded-full blur-2xl" />
            
            <div className="relative">
              {/* Header with Enhanced Avatar */}
              <div className="flex items-start gap-5 mb-8">
                {/* Premium Avatar */}
                <div className="relative flex-shrink-0">
                  {/* Glow Ring */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                  
                  <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-5xl shadow-2xl border-2 border-blue-400/30">
                    👨‍💼
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white" style={{ lineHeight: '1.3' }}>
                    안태민 CEO
                  </h3>
                  <p className="text-blue-300 font-semibold text-sm md:text-base mb-3">
                    Founder & Chief Executive Officer
                  </p>
                  
                  {/* Status Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/20 border border-blue-500/30">
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                    <span className="text-xs font-bold text-blue-300">Active Leader</span>
                  </div>
                </div>
              </div>

              {/* Achievements with Modern Icons */}
              <div className="space-y-4">
                <div className="flex items-start gap-4 group/item">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center group-hover/item:bg-blue-600/30 transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-blue-400" />
                  </div>
                  <p className="text-sm md:text-base font-medium text-slate-200 leading-relaxed pt-2">
                    <span className="text-blue-400 font-bold">AI · SEO · GEO</span> 전문 컨설턴트
                  </p>
                </div>

                <div className="flex items-start gap-4 group/item">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center group-hover/item:bg-blue-600/30 transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-blue-400" />
                  </div>
                  <p className="text-sm md:text-base font-medium text-slate-200 leading-relaxed pt-2">
                    <span className="text-blue-400 font-bold">15년</span> 퍼포먼스 마케터 - 구글 애즈 및 GA4 전문
                  </p>
                </div>

                <div className="flex items-start gap-4 group/item">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center group-hover/item:bg-blue-600/30 transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-blue-400" />
                  </div>
                  <p className="text-sm md:text-base font-medium text-slate-200 leading-relaxed pt-2">
                    <span className="text-blue-400 font-bold">2023년</span> 구글 코리아 공식 포럼 초청 인사
                  </p>
                </div>

                <div className="flex items-start gap-4 group/item">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center group-hover/item:bg-blue-600/30 transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-blue-400" />
                  </div>
                  <p className="text-sm md:text-base font-medium text-slate-200 leading-relaxed pt-2">
                    한화시스템 · 대보건설 태양광 프로젝트 마케팅 총괄 CFO
                  </p>
                </div>
              </div>

              {/* Bottom Accent Line */}
              <div className="mt-8 h-1 bg-gradient-to-r from-blue-500/50 via-indigo-500/50 to-transparent rounded-full" />
            </div>
          </div>
        </FadeIn>

        {/* Right: Certifications - Premium Style */}
        <div className="grid gap-6">
          {certifications.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <FadeIn key={cert.title} delay={0.3 + index * 0.1}>
                <div className="relative rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/20 border-2 border-slate-100 p-6 md:p-8 hover:border-blue-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group overflow-hidden">
                  {/* Subtle Background Pattern */}
                  <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(37 99 235) 1px, transparent 0)',
                    backgroundSize: '24px 24px'
                  }} />
                  
                  {/* Badge with Glow */}
                  <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold shadow-lg shadow-blue-600/30">
                    {cert.badge}
                  </div>
                  
                  <div className="relative flex items-start gap-4">
                    {/* Icon with Enhanced Glow */}
                    <div className="relative flex-shrink-0">
                      {/* Glow Effect */}
                      <div className="absolute inset-0 bg-blue-500 rounded-xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                      
                      <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 border-2 border-blue-300 flex items-center justify-center group-hover:scale-110 group-hover:border-blue-400 transition-all duration-300">
                        <Icon className="w-7 h-7 text-[#2563EB]" />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <h4 className="text-lg md:text-xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors duration-300" style={{ lineHeight: '1.4' }}>
                        {cert.title}
                      </h4>
                      <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                        {cert.description}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>

    </SectionWrapper>
  );
}
