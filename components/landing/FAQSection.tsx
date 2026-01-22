/**
 * [Section] FAQ - Clean Accordion (Card Diet)
 * [Design] Remove card borders, use simple border-bottom style
 * [Animation] Smooth expand/collapse
 */

"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "피앤에이컴퍼니의 차별점은 무엇인가요?",
    answer: "15년 실전 경험과 구글 TOP 100 선정 이력이 증명하는 전문성입니다. 담당자가 수시로 바뀌지 않는 전문가 직접 관리 시스템을 지향합니다. 영업 사원이 아닌 15년 차 전문가가 귀사의 비즈니스 본질에 집중한 전략을 직접 리딩합니다."
  },
  {
    question: "SEO와 GEO 전략은 어떻게 진행되나요?",
    answer: "기존 검색 결과 상위 노출(SEO)과 AI 검색 결과(GEO)를 동시에 분석하여, 브랜드가 최상단에 노출될 수 있는 시맨틱 구조를 설계합니다. Gemini AI와 Google 검색 엔진 모두에서 상위 노출되는 통합 전략을 제공합니다."
  },
  {
    question: "대행 비용과 계약 방식이 궁금합니다.",
    answer: "투명한 수수료 체계를 지향하며, 비즈니스 규모와 목표에 최적화된 맞춤형 견적을 제안드립니다. 월 광고비의 15~20%로 책정되며, 초기 셋업 비용은 별도 협의 가능합니다. 무료 성과 진단을 통해 정확한 견적을 받아보세요."
  },
  {
    question: "효율 개선 시점은 언제부터인가요?",
    answer: "셋팅 직후부터 실시간 모니터링이 시작됩니다. 정교한 AI 학습 과정을 거쳐 점진적이고 지속적인 성과 향상을 도모합니다. 일반적으로 2~4주 내에 초기 최적화 효과가 나타나며, 3개월 후부터 안정적인 성과를 확인하실 수 있습니다."
  },
  {
    question: "성과 분석 리포트는 어떻게 제공되나요?",
    answer: "GA4 기반의 객관적 데이터를 바탕으로 분석 보고서를 제공하며, 대시보드를 통해 모든 지표를 투명하게 공유합니다. 주간 성과 요약과 월간 상세 리포트를 통해 캠페인 성과를 실시간으로 확인하실 수 있습니다."
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {/* SECTION: #FAQ */}
      <section data-section="FAQ" className="relative py-16 md:py-24">
      
      <div className="container relative mx-auto px-4 md:px-6 max-w-7xl">
        {/* 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[400px,1fr] gap-12 lg:gap-16 items-start">
          
          {/* Left: Header (Sticky) */}
          <div className="lg:sticky lg:top-24">
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                FAQ
              </span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6" style={{ lineHeight: '1.3' }}>
              자주 묻는 질문
            </h2>
            
            <p className="text-base md:text-lg text-slate-600 leading-relaxed">
              PNA 컴퍼니에 대해 궁금하신 점을 확인하세요
            </p>
          </div>
          
          {/* Right: FAQ List */}
          <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} 
                className={`
                  relative rounded-2xl bg-white overflow-hidden border
                  ${openIndex === index 
                    ? 'border-blue-400 shadow-lg' 
                    : 'border-slate-200 hover:border-slate-300'
                  }
                `}
                style={{ transition: 'all 200ms cubic-bezier(0.2, 0.8, 0.2, 1)' }}
              >
                {/* Question Button */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full py-6 md:py-7 px-6 md:px-8 flex items-center justify-between gap-4 text-left group"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <h3 className={`
                    text-base md:text-lg font-bold leading-[1.4] flex-1
                    transition-colors duration-200
                    ${openIndex === index ? 'text-blue-600' : 'text-slate-900 group-hover:text-slate-700'}
                  `}>
                    {faq.question}
                  </h3>
                  
                  <div className={`
                    flex-shrink-0 w-8 h-8 rounded-full 
                    flex items-center justify-center
                    transition-all duration-200
                    ${openIndex === index 
                      ? 'bg-blue-600' 
                      : 'bg-slate-100 group-hover:bg-slate-200'
                    }
                  `}>
                    {openIndex === index ? (
                      <Minus className="w-5 h-5 text-white" />
                    ) : (
                      <Plus className="w-5 h-5 text-slate-600" />
                    )}
                  </div>
                </button>

                {/* Answer */}
                {openIndex === index && (
                  <div id={`faq-answer-${index}`} className="overflow-hidden">
                    <div className="px-6 md:px-8 pb-6 md:pb-7 pt-2">
                      <div className="pl-0">
                        <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
          ))}
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
