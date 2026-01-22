/**
 * [Section] Services - Card Grid Layout
 * [Design] Card-based design with background images and hover effects
 */

"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Cpu, Globe, Layout, RefreshCw } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const services = [
  {
    id: "google-ads",
    icon: Cpu,
    title: "구글 광고",
    subtitle: "GOOGLE ADS",
    description: "AI 스마트 입찰과 정밀 타겟팅으로 효율을 극대화하여 광고비 낭비를 최소화하는 전략을 수립합니다.",
    features: ["스마트 입찰 최적화", "정밀 타겟팅", "실시간 모니터링"],
    link: "/google-ads",
    image: "/images/hero/google-ads-hero-bg.jpg"
  },
  {
    id: "seo-geo",
    icon: Globe,
    title: "SEO & GEO",
    subtitle: "SEO & GEO",
    description: "검색 엔진과 Gemini AI 결과에 동시 상위 노출되는 시맨틱 점유 전략으로 브랜드 가치를 높입니다.",
    features: ["시맨틱 SEO", "AI 검색 최적화", "브랜드 노출 확대"],
    link: "/seo-geo",
    image: "/images/hero/seo-hero-bg.jpg"
  },
  {
    id: "wordpress",
    icon: Layout,
    title: "워드프레스",
    subtitle: "WORDPRESS",
    description: "기술적 SEO 최적화와 사용자 경험을 동시에 고려한 초고속 퍼포먼스 웹사이트를 구축합니다.",
    features: ["기술적 SEO", "UX 최적화", "고속 퍼포먼스"],
    link: "/wordpress",
    image: "/images/hero/wordpress-hero-bg.jpg"
  },
  {
    id: "performance",
    icon: RefreshCw,
    title: "퍼포먼스 마케팅",
    subtitle: "PERFORMANCE MARKETING",
    description: "추측을 배제하고 전 과정 데이터 추적을 통해 마케팅 ROI 최적화의 길을 제안합니다.",
    features: ["데이터 추적", "ROI 최적화", "성과 분석"],
    link: "/performance",
    image: "/images/hero/performance-hero-bg.jpg"
  },
];

export function ServicesAlternate() {
  return (
    <section id="solutions" className="py-20 md:py-32 bg-white relative" data-section="SOLUTIONS">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        <SectionHeader 
          badge="서비스"
          title="비즈니스 성장을 가속화하는 4가지 정밀 솔루션"
          description="데이터 기반 전략으로 귀사의 성장을 증명합니다"
        />

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service) => {
            const IconComponent = service.icon;
            
            return (
              <Link 
                key={service.id}
                href={service.link}
                className="group relative bg-slate-900 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-800 hover:border-slate-700"
              >
                {/* Background Image */}
                <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-900/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative p-8 md:p-10">
                  
                  {/* Top: Icon & Arrow */}
                  <div className="flex items-start justify-between mb-6">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-lg bg-slate-800 group-hover:bg-blue-600 flex items-center justify-center transition-colors duration-300">
                      <IconComponent className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors duration-300" strokeWidth={2} />
                    </div>
                    
                    {/* Arrow - No Background */}
                    <ArrowUpRight className="w-5 h-5 text-slate-600 group-hover:text-blue-600 transition-colors duration-300" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                    {service.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
                    {service.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-base text-slate-400 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Features with Vertical Dividers */}
                  <div className="flex items-center gap-3 mb-6 text-sm text-slate-500">
                    {service.features.map((feature, idx) => (
                      <React.Fragment key={idx}>
                        <span>{feature}</span>
                        {idx < service.features.length - 1 && (
                          <div className="w-px h-3 bg-slate-700" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Progress Bar (Inside Card) */}
                  <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 w-0 group-hover:w-full transition-all duration-700 ease-out" />
                  </div>

                </div>

              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
