/**
 * [Client] WordPress Website Service Page
 * [Design] Professional B2B Tone - 2026
 * [Style] Fact-Based, No Guarantees
 */

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Code, Palette, Zap, Shield, ArrowRight, Sparkles, Settings, TrendingUp, CheckCircle2 } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { TextReveal } from "@/components/ui/text-reveal";
import { WordPressFAQ } from "@/components/service/WordPressFAQ";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 섹션 2: 왜 워드프레스인가
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const whyWordPress = [
  {
    title: "비용 효율성",
    comparison: [
      "커스텀 개발: 5,000만원 이상",
      "WordPress: 2,000만원 (60% 절감)"
    ],
    conclusion: "동일한 기능, 1/3 비용."
  },
  {
    title: "검증된 성능",
    facts: [
      "Lighthouse 90점 이상 달성 사례 다수",
      "전 세계 웹사이트의 43% 가 WordPress 사용"
    ],
    conclusion: "속도, 보안, SEO 검증됨."
  },
  {
    title: "관리 편의성",
    benefits: [
      "외주 없이 내부에서 직접 콘텐츠 수정",
      "페이지 추가: 30분 이내"
    ],
    conclusion: "유지보수 비용 절감."
  }
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 섹션 3: 플랫폼 비교
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const platformComparison = {
  criteria: [
    { label: "초기 구축 비용", key: "cost" },
    { label: "속도 (Lighthouse)", key: "speed" },
    { label: "확장성", key: "scalability" },
    { label: "데이터 소유권", key: "ownership" }
  ],
  platforms: [
    {
      name: "WordPress (PNA)",
      highlight: true,
      values: {
        cost: "2,000만원~",
        speed: "90점 이상",
        scalability: "무한 확장",
        ownership: "100% 소유"
      }
    },
    {
      name: "Wix",
      highlight: false,
      values: {
        cost: "월 2.9만원~",
        speed: "65~75점",
        scalability: "플랜 제한",
        ownership: "플랫폼 종속"
      }
    },
    {
      name: "커스텀 개발",
      highlight: false,
      values: {
        cost: "5,000만원~",
        speed: "95점 이상",
        scalability: "무한 확장",
        ownership: "100% 소유"
      }
    }
  ]
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 섹션 4: 핵심 서비스
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const services = [
  {
    icon: Palette,
    title: "맞춤형 테마 & 디자인",
    description: "브랜드 아이덴티티에 맞춘 커스텀 워드프레스 테마 제작. Gutenberg 블록 에디터 확장과 ACF 활용."
  },
  {
    icon: Zap,
    title: "성능 최적화 & 속도 개선",
    description: "이미지 압축, Redis 캐싱, CDN 연동으로 Lighthouse 90점 이상 달성. Core Web Vitals 최적화로 검색 상위 노출 지원."
  },
  {
    icon: Shield,
    title: "보안 강화 & 유지보수",
    description: "OWASP Top 10 취약점 점검, Wordfence 보안 플러그인 설정, SSL 적용, 2FA 구현. 정기 백업과 긴급 복구 서비스 제공."
  },
  {
    icon: Settings,
    title: "Headless CMS & API 연동",
    description: "워드프레스를 Headless CMS로 활용하여 Next.js, React 연동. REST API와 WPGraphQL로 멀티 플랫폼 배포."
  }
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 섹션 5: 검증된 성과
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const successCases = [
  {
    category: "이커머스",
    client: "프리미엄 주얼리 쇼핑몰",
    challenge: "기존 사이트 로딩 속도 4.2초, 모바일 이탈률 78%",
    solution: "WooCommerce 최적화 + CDN + WebP 이미지 전환",
    results: [
      { label: "Lighthouse 점수", before: "42점", after: "94점" },
      { label: "평균 로딩 속도", before: "4.2초", after: "1.1초" },
      { label: "전환율", before: "1.2%", after: "3.8%" }
    ]
  },
  {
    category: "기업 사이트",
    client: "IT 컨설팅 회사 (임직원 150명)",
    challenge: "외주 의존도 높음, 콘텐츠 수정에 매번 비용 발생",
    solution: "직관적 관리자 화면 + ACF 커스텀 필드 + 교육 프로그램",
    results: [
      { label: "월 유지보수 비용", before: "150만원", after: "0원" },
      { label: "콘텐츠 업데이트", before: "외주 의뢰", after: "내부 직접 처리" },
      { label: "페이지 추가 시간", before: "3일", after: "30분" }
    ]
  },
  {
    category: "미디어/블로그",
    client: "마케팅 인사이트 블로그",
    challenge: "월 10만 방문자 시 서버 다운, SEO 최적화 부족",
    solution: "Redis 캐싱 + Yoast SEO Premium + Schema 마크업",
    results: [
      { label: "월 방문자", before: "10만", after: "52만" },
      { label: "구글 상위 노출 키워드", before: "23개", after: "187개" },
      { label: "서버 다운", before: "월 3~4회", after: "0회" }
    ]
  }
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 섹션 6: 제작 프로세스
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const processSteps = [
  {
    number: "01",
    title: "기획 & 요구사항 분석",
    description: "비즈니스 목표 파악, 타겟 사용자 분석, 정보 구조(IA) 설계",
    duration: "1주"
  },
  {
    number: "02",
    title: "디자인 & 개발",
    description: "와이어프레임, 시안 제작, 커스텀 테마 개발, 반응형 구현",
    duration: "3~4주"
  },
  {
    number: "03",
    title: "최적화 & 테스트",
    description: "속도 최적화, 보안 강화, 크로스 브라우저 테스트, QA",
    duration: "1주"
  },
  {
    number: "04",
    title: "런칭 & 교육",
    description: "배포, 관리자 화상 교육, 운영 매뉴얼 제공, 사후 지원",
    duration: "1주"
  }
];

export function WordPressClient() {
  return (
    <main className="min-h-screen pt-[73px] relative">
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* HERO SECTION */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
        {/* 1. Background Image */}
        <div className="absolute inset-0 z-0 bg-slate-900">
          <Image
            src="/images/hero/wordpress-hero-bg.jpg.jpg"
            alt="WordPress Background"
            fill
            className="object-cover"
            quality={40}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA5AAAAA//Z"
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
            <Code className="w-4 h-4 text-white" />
            <span className="text-sm font-bold text-white">WordPress Development</span>
          </motion.div>

          {/* Kinetic Typography Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ lineHeight: '1.35' }}>
            워드프레스 웹사이트 제작
          </h1>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg md:text-xl text-slate-200 font-medium max-w-3xl mx-auto"
          >
            Lighthouse 90점 이상, 기업급 보안, 무제한 확장성
          </motion.p>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* 왜 워드프레스인가 */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="border-t border-slate-200 bg-white py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4" style={{ lineHeight: '1.35' }}>
            왜 워드프레스인가
          </h2>
          <p className="text-xl text-slate-600">
            비용과 성능의 최적 균형
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {whyWordPress.map((item, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div className="p-8 rounded-2xl bg-white border-2 border-slate-200">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">{item.title}</h3>

                <div className="space-y-3 mb-6">
                  {item.comparison && item.comparison.map((line, idx) => (
                    <p key={idx} className="text-base text-slate-700">{line}</p>
                  ))}
                  {item.facts && item.facts.map((line, idx) => (
                    <p key={idx} className="text-base text-slate-700">{line}</p>
                  ))}
                  {item.benefits && item.benefits.map((line, idx) => (
                    <p key={idx} className="text-base text-slate-700">{line}</p>
                  ))}
                </div>

                <p className="text-lg font-bold text-blue-600">{item.conclusion}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* PLATFORM COMPARISON TABLE */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="border-t border-slate-200 bg-slate-50 py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4" style={{ lineHeight: '1.35' }}>
              플랫폼 비교
            </h2>
            <p className="text-xl text-slate-600">
              WordPress vs Wix vs 커스텀 개발
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-300">
                  <th className="text-left p-4 font-bold text-slate-900 bg-slate-50">항목</th>
                  {platformComparison.platforms.map((platform, index) => (
                    <th 
                      key={index}
                      className={`text-center p-4 font-bold ${
                        platform.highlight 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-slate-50 text-slate-900'
                      }`}
                    >
                      {platform.name}
                      {platform.highlight && (
                        <div className="text-xs font-normal mt-1 text-blue-100">권장</div>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {platformComparison.criteria.map((criterion, rowIndex) => (
                  <tr key={rowIndex} className="border-b border-slate-200">
                    <td className="p-4 font-medium text-slate-700 bg-slate-50">
                      {criterion.label}
                    </td>
                    {platformComparison.platforms.map((platform, colIndex) => (
                      <td 
                        key={colIndex}
                        className={`text-center p-4 ${
                          platform.highlight 
                            ? 'bg-blue-50 font-bold text-blue-900' 
                            : 'bg-white text-slate-700'
                        }`}
                      >
                        {platform.values[criterion.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* CORE SERVICES */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="border-t border-slate-200 bg-white py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4" style={{ lineHeight: '1.35' }}>
              핵심 서비스
            </h2>
            <p className="text-xl text-slate-600">
              4가지 전문 영역
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <FadeIn key={index} delay={index * 0.1}>
                  <div className="flex items-start gap-6 p-8 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                    {/* Icon */}
                    <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-slate-900 mb-3" style={{ lineHeight: '1.35' }}>
                        {service.title}
                      </h3>
                      <p className="text-base text-slate-600 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* SUCCESS CASES */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="border-t border-slate-200 bg-slate-50 py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4" style={{ lineHeight: '1.35' }}>
              검증된 성과
            </h2>
            <p className="text-xl text-slate-600">
              실제 프로젝트 결과
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {successCases.map((project, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300">
                  {/* Category Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-bold mb-4">
                    <TrendingUp className="w-4 h-4" />
                    {project.category}
                  </div>

                  {/* Client */}
                  <h3 className="text-xl font-bold text-slate-900 mb-4" style={{ lineHeight: '1.35' }}>
                    {project.client}
                  </h3>

                  {/* Challenge */}
                  <div className="mb-4 p-4 rounded-lg bg-slate-50">
                    <div className="text-xs font-bold text-slate-500 uppercase mb-2">과제</div>
                    <p className="text-sm text-slate-700">{project.challenge}</p>
                  </div>

                  {/* Solution */}
                  <div className="mb-4">
                    <div className="text-xs font-bold text-slate-500 uppercase mb-2">솔루션</div>
                    <p className="text-sm text-slate-700">{project.solution}</p>
                  </div>

                  {/* Results */}
                  <div className="pt-4 border-t border-slate-200">
                    <div className="text-xs font-bold text-slate-500 uppercase mb-3">성과</div>
                    <div className="space-y-2">
                      {project.results.map((result, idx) => (
                        <div key={idx} className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">{result.label}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-400">{result.before}</span>
                            <ArrowRight className="w-4 h-4 text-blue-600" />
                            <span className="font-bold text-blue-600">{result.after}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* PROCESS */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="border-t border-slate-200 bg-white py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4" style={{ lineHeight: '1.35' }}>
              제작 프로세스
            </h2>
            <p className="text-xl text-slate-600">
              투명한 4단계 진행 과정
            </p>
          </div>

          {/* Horizontal Timeline */}
          <div className="relative max-w-6xl mx-auto">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-16 left-0 right-0 h-1 bg-slate-300" style={{ margin: '0 10%' }} />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 relative">
              {processSteps.map((step, index) => (
                <FadeIn key={index} delay={index * 0.1}>
                  <div className="text-center">
                    {/* Number Badge */}
                    <div className="relative inline-flex items-center justify-center w-32 h-32 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-4xl md:text-3xl mb-6 shadow-xl mx-auto">
                      <span className="relative z-10">{step.number}</span>
                      <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold text-slate-900 mb-3" style={{ lineHeight: '1.35' }}>
                      {step.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-sm text-slate-600 leading-relaxed mb-3">
                      {step.description}
                    </p>
                    
                    {/* Duration */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold">
                      {step.duration}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* FAQ SECTION */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <WordPressFAQ />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* CTA SECTION */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative bg-blue-600 py-16 md:py-20 overflow-hidden">
        <div className="container relative mx-auto px-4 md:px-6 max-w-4xl text-center text-white">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5" style={{ lineHeight: '1.3' }}>
            비즈니스 성장을 위한 워드프레스 솔루션
          </h2>

          {/* Description */}
          <p className="text-base md:text-lg text-blue-50 mb-8 leading-relaxed">
            Lighthouse 90점 이상, 기업급 보안, 무제한 확장성
          </p>

          {/* CTA Button */}
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-blue-600 font-bold rounded-full hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl text-base"
          >
            <span>문의하기</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
