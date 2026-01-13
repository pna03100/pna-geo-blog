/**
 * [Component] Performance Marketing FAQ Section
 * [Design] Accordion with Premium Green Theme
 */

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "퍼포먼스 마케팅이 일반 브랜드 마케팅과 다른 점은 무엇인가요?",
    answer: "퍼포먼스 마케팅은 클릭, 전환, 매출 등 측정 가능한 성과에 초점을 맞춥니다. 모든 광고비 지출이 데이터로 추적되며, ROAS, CPA 등의 지표로 실시간 효율을 평가합니다. 브랜드 마케팅이 인지도 향상을 목표로 한다면, 퍼포먼스 마케팅은 즉각적인 비즈니스 성과를 목표로 합니다."
  },
  {
    question: "어떤 업종에 적합한가요?",
    answer: "이커머스, 교육, 금융, 의료, B2B 서비스 등 대부분의 업종에 적합합니다. 특히 온라인 구매나 문의 전환이 명확한 비즈니스에 효과적입니다. 제조업이나 오프라인 중심 사업도 온라인 문의 유도나 브랜드 검색 증가를 통해 성과를 낼 수 있습니다."
  },
  {
    question: "ROAS 500%는 모든 업종에서 달성 가능한가요?",
    answer: "업종, 경쟁 강도, 제품 마진에 따라 차이가 있습니다. 고마진 상품이나 재구매율이 높은 업종은 더 높은 ROAS를 달성하기 쉽습니다. 500%는 저희 평균 수치이며, 일부 고객사는 1000% 이상도 달성하셨습니다. 초기 3개월은 데이터 수집 및 최적화 기간으로, 이후 본격적인 성과가 나타납니다."
  },
  {
    question: "광고 채널은 어떻게 선택하나요?",
    answer: "비즈니스 목표, 타겟 고객, 예산을 분석하여 최적의 채널을 제안합니다. Google Ads는 검색 의도가 명확한 고객에게, Meta(Facebook/Instagram)는 시각적 소구가 중요한 제품에, 네이버는 국내 중장년층 타겟에 효과적입니다. 보통 2~3개 채널을 조합하여 시너지를 냅니다."
  },
  {
    question: "랜딩페이지도 함께 제작해주시나요?",
    answer: "네, 전환율 최적화(CRO)를 위한 랜딩페이지 제작이 가능합니다. 광고 메시지와 일관된 디자인, 명확한 CTA, 빠른 로딩 속도로 설계하며, A/B 테스트를 통해 지속적으로 개선합니다. 기존 웹사이트가 있다면 분석 후 개선 방안도 제안드립니다."
  },
  {
    question: "타겟팅은 어떻게 설정하나요?",
    answer: "인구통계(연령, 성별, 지역), 관심사, 행동 패턴, 검색 키워드, 유사 타겟(Lookalike) 등을 조합하여 정밀하게 설정합니다. 기존 고객 데이터가 있다면 이를 활용해 맞춤형 타겟팅을 구축하며, 리타겟팅으로 이탈 고객을 재유입시킵니다."
  },
  {
    question: "성과가 나지 않으면 어떻게 하나요?",
    answer: "초기 1개월은 학습 기간으로, 이 기간 동안 데이터를 수집하며 최적화합니다. 2~3개월 내 목표 성과가 나지 않으면 캠페인 구조, 타겟팅, 크리에이티브, 랜딩페이지 등을 전면 재검토합니다. 투명한 데이터 공유와 개선 방향 제시로 함께 해결책을 찾습니다."
  },
  {
    question: "경쟁사 분석도 해주시나요?",
    answer: "네, 기본으로 제공됩니다. 경쟁사의 광고 키워드, 광고 문구, 랜딩페이지, 노출 전략 등을 분석하여 차별화된 전략을 수립합니다. SEMrush, SpyFu 등의 도구를 활용하여 경쟁사 대비 우위를 점할 수 있는 포인트를 찾아냅니다."
  }
];

export function PerformanceFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-20 md:py-24">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-green-200 text-green-600 text-sm font-semibold mb-6">
            <HelpCircle className="w-4 h-4" />
            <span>FAQ</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            자주 묻는 질문
          </h2>
          
          <p className="text-xl text-slate-600 leading-relaxed">
            퍼포먼스 마케팅 관련 궁금한 점을 확인하세요
          </p>
        </div>

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              {/* Question Button */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between gap-4 p-6 text-left transition-colors duration-300 hover:bg-slate-50"
              >
                <h3 className="text-lg font-bold text-slate-900 flex-1">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex-shrink-0"
                >
                  <ChevronDown 
                    className={cn(
                      "w-6 h-6 transition-colors duration-300",
                      openIndex === index ? "text-green-600" : "text-slate-400"
                    )} 
                  />
                </motion.div>
              </button>

              {/* Answer */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-0">
                      <div className="pt-4 border-t border-slate-100">
                        <p className="text-slate-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
