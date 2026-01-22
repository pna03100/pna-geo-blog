/**
 * [Section] FAQ - Clean Accordion (Card Diet)
 * [Design] Remove card borders, use simple border-bottom style
 * [Animation] Smooth expand/collapse
 */

"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "구글 애즈 광고 대행 비용은 어떻게 되나요?",
    answer: "광고 대행 비용은 월 광고비의 15~20%로 책정되며, 최소 계약 기간은 3개월입니다. 광고비 규모와 업종에 따라 맞춤 견적을 제공해드리며, 초기 셋업 비용은 별도로 협의 가능합니다. 무료 상담을 통해 정확한 견적을 받아보세요."
  },
  {
    question: "ROAS 500%는 어떻게 달성하나요?",
    answer: "15년간 축적된 데이터 기반 최적화 노하우를 활용합니다. 검색 의도 분석, 정밀 타겟팅, 키워드 최적화, 랜딩페이지 개선, 입찰 전략 조정 등을 통해 광고 효율을 극대화합니다. 또한 실시간 모니터링과 주간 리포트를 통해 지속적으로 성과를 개선합니다."
  },
  {
    question: "워드프레스 제작 기간은 얼마나 걸리나요?",
    answer: "기본 웹사이트는 2~3주, 커스터마이징이 많은 경우 4~6주 소요됩니다. 기획, 디자인, 개발, SEO 최적화, 테스트 과정을 거치며, 고객님과의 피드백을 반영하여 진행됩니다. 급한 경우 우선 일정 조율이 가능합니다."
  },
  {
    question: "SEO 최적화 효과는 언제부터 나타나나요?",
    answer: "SEO는 장기적인 전략으로, 일반적으로 3~6개월 후부터 가시적인 효과가 나타납니다. 웹사이트 구조 개선, 콘텐츠 최적화, 백링크 구축 등을 통해 검색 엔진 순위를 점진적으로 향상시킵니다. 초기 1~2개월 내에 기술적 개선 사항은 반영됩니다."
  },
  {
    question: "계약 후 어떤 지원을 받을 수 있나요?",
    answer: "전담 매니저가 배정되어 실시간 소통이 가능하며, 주간/월간 성과 리포트를 제공합니다. 광고 계정 관리, 캠페인 최적화, 전략 컨설팅, 기술 지원 등 포괄적인 서비스를 받으실 수 있습니다. 또한 평생 무료 기술 지원과 업데이트가 제공됩니다."
  },
  {
    question: "소규모 예산으로도 광고 대행이 가능한가요?",
    answer: "네, 가능합니다. 최소 월 광고비 300만원부터 대행 서비스를 제공하며, 예산에 맞는 최적의 전략을 수립해드립니다. 소규모 예산이라도 효율적인 타겟팅과 정밀한 관리를 통해 높은 ROAS를 달성할 수 있습니다."
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
          
          {/* Left: Header */}
          <div className="lg:sticky lg:top-24">
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                FAQ
              </span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4" style={{ lineHeight: '1.2' }}>
              자주 묻는 질문
            </h2>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-8">
              고객님들이 가장 궁금해하시는 질문들을 모았습니다
            </p>
            
            {/* Decorative Badge */}
            <div className="hidden lg:block mt-8 p-6 rounded-2xl bg-blue-50 border border-blue-200">
              <p className="text-blue-600 font-semibold text-base">
                💬 24시간 이내 답변 드립니다
              </p>
            </div>
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
                      ? 'bg-blue-600 rotate-180' 
                      : 'bg-slate-100 group-hover:bg-slate-200'
                    }
                  `}>
                    <ChevronDown className={`
                      w-5 h-5
                      transition-colors duration-200
                      ${openIndex === index ? 'text-white' : 'text-slate-600'}
                    `} />
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
