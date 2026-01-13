/**
 * [Section] FAQ - Frequently Asked Questions
 * [Design] Accordion with Premium Corporate Blue Theme
 */

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionTitle } from "./SectionTitle";

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
  {
    question: "타 대행사에서 진행 중인 광고도 이관 가능한가요?",
    answer: "네, 가능합니다. 기존 광고 계정을 분석하여 개선점을 찾아드리며, 안전하게 계정 이관을 진행합니다. 현재 광고 성과, 계정 구조, 키워드 전략 등을 무료로 진단해드리니 부담 없이 상담 신청해주세요."
  },
  {
    question: "계약 기간 중 해지가 가능한가요?",
    answer: "최소 계약 기간(3개월) 이후에는 1개월 전 사전 통보를 통해 해지가 가능합니다. 다만, 초기 셋업 비용과 진행된 작업에 대한 비용은 정산이 필요할 수 있습니다. 계약서에 명시된 조건에 따라 투명하게 처리됩니다."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-10 md:py-24">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Section Header */}
        <SectionTitle
          badge="FAQ"
          title="자주 묻는 질문"
          description="고객님들이 가장 궁금해하시는 질문들을 모았습니다"
        />

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto space-y-3 md:space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl md:rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              {/* Question Button */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between gap-3 md:gap-4 p-4 md:p-6 text-left transition-colors duration-300 hover:bg-slate-50"
              >
                <h3 className="text-sm md:text-lg font-bold text-slate-900 flex-1">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex-shrink-0"
                >
                  <ChevronDown 
                    className={cn(
                      "w-5 h-5 md:w-6 md:h-6 transition-colors duration-300",
                      openIndex === index ? "text-blue-600" : "text-slate-400"
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
                    <div className="px-4 pb-4 md:px-6 md:pb-6 pt-0">
                      <div className="pt-3 md:pt-4 border-t border-slate-100">
                        <p className="text-xs md:text-base text-slate-600 leading-relaxed">
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
