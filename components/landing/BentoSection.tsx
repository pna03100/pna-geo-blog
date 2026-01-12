/**
 * [Section] Bento Grid - Core Solutions
 * [Layout] Masonry-like grid with varying sizes
 */

"use client";

import { motion } from "framer-motion";
import {
  Target,
  Sparkles,
  Code,
  BarChart3,
  Share2,
  Lightbulb,
} from "lucide-react";
import { FadeIn } from "./FadeIn";
import { SectionWrapper } from "./SectionWrapper";
import { GlassCard } from "./GlassCard";

const solutions = [
  {
    icon: Target,
    title: "Google Ads",
    description: "검색 의도 선점 타겟팅 & ROAS 최적화",
    features: ["스마트 입찰 전략", "키워드 최적화", "광고 A/B 테스팅"],
    gradient: "from-blue-600 to-blue-500",
    span: "md:col-span-2",
  },
  {
    icon: Sparkles,
    title: "SEO & GEO",
    description: "ChatGPT 검색 최적화 & AI 마케팅",
    features: ["AI 검색 최적화", "콘텐츠 전략", "백링크 구축"],
    gradient: "from-blue-500 to-sky-500",
    span: "md:col-span-1",
  },
  {
    icon: Code,
    title: "WordPress",
    description: "기술적 SEO & Core Web Vitals",
    features: ["성능 최적화", "SEO 구조화", "보안 강화"],
    gradient: "from-sky-500 to-blue-400",
    span: "md:col-span-1",
  },
  {
    icon: BarChart3,
    title: "Performance (Data)",
    description: "GA4 기반 정밀 분석",
    features: ["전환 추적", "사용자 행동 분석", "맞춤 리포트"],
    gradient: "from-blue-600 to-sky-600",
    span: "md:col-span-1",
  },
  {
    icon: Share2,
    title: "Performance (Social)",
    description: "Meta/Naver/Kakao 통합 관리",
    features: ["SNS 광고 통합", "크로스 채널 최적화", "리타겟팅"],
    gradient: "from-sky-600 to-blue-500",
    span: "md:col-span-1",
  },
  {
    icon: Lightbulb,
    title: "Insights",
    description: "최신 마케팅 트렌드",
    features: ["업계 인사이트", "마케팅 가이드", "케이스 스터디"],
    gradient: "from-blue-500 to-blue-600",
    span: "md:col-span-1",
  },
];

export function BentoSection() {
  return (
    <SectionWrapper id="solutions">
      <div className="text-center mb-16">
        <FadeIn>
          <span className="inline-block px-4 py-2 rounded-full bg-blue-500/15 border border-blue-200/50 text-blue-600 text-sm font-bold mb-4">
            Core Solutions
          </span>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="text-4xl md:text-6xl font-bold text-slate-950 mb-4 tracking-tight">
            통합 마케팅 솔루션
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-xl text-slate-700 max-w-2xl mx-auto font-medium">
            Google Ads부터 SEO, GEO, 소셜 미디어까지
            <br />
            데이터 기반 성과 마케팅의 모든 것
          </p>
        </FadeIn>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {solutions.map((solution, index) => {
          const Icon = solution.icon;
          return (
            <FadeIn key={solution.title} delay={index * 0.1}>
              <GlassCard className={solution.span}>
                <div className="p-8 h-full flex flex-col">
                  {/* Icon with gradient */}
                  <div
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${solution.gradient} mb-6 w-fit`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-slate-950 mb-2">
                    {solution.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-700 font-medium mb-6">{solution.description}</p>

                  {/* Features */}
                  <ul className="space-y-2 mt-auto">
                    {solution.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-slate-800 font-medium"
                      >
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${solution.gradient}`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </GlassCard>
            </FadeIn>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
