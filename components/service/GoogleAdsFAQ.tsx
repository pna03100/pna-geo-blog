/**
 * [Component] Google Ads FAQ Section
 * [Design] Accordion with Premium Blue Theme
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
    question: "광고비는 얼마부터 시작할 수 있나요?",
    answer: "최소 월 300만원부터 시작 가능하며, 업종과 경쟁 강도에 따라 권장 예산이 다릅니다. 일반적으로 월 500만원 이상일 때 충분한 데이터를 확보하고 최적화가 가능합니다. 소규모 예산도 효율적인 키워드 선정과 타겟팅으로 성과를 낼 수 있습니다."
  },
  {
    question: "광고 성과는 얼마나 빨리 나타나나요?",
    answer: "초기 1~2주는 학습 기간으로, 본격적인 성과는 1개월 후부터 나타납니다. 구글 AI가 데이터를 학습하며 최적화되는 과정이 필요하기 때문입니다. 3개월 차부터 안정적인 ROAS 향상을 경험하실 수 있습니다."
  },
  {
    question: "Performance Max(P-Max)와 일반 검색 광고의 차이점은 무엇인가요?",
    answer: "Performance Max는 검색, 디스플레이, YouTube, Gmail, Discover, Maps를 통합한 AI 캠페인입니다. 검색 광고는 특정 키워드에 수동으로 입찰하지만, P-Max는 전환 목표만 설정하면 AI가 자동으로 최적의 채널, 시간, 오디언스 조합을 찾아 광고를 노출합니다. 일반적으로 P-Max로 전환 후 2~3개월 후 기존 캠페인 대비 전환율 15~30% 개선을 경험할 수 있습니다."
  },
  {
    question: "광고 계정은 누가 소유하나요?",
    answer: "광고 계정은 고객님 소유이며, 저희는 관리 권한만 부여받아 운영합니다. 모든 광고비는 고객님의 계정으로 직접 결제되며, 계약 종료 시에도 계정은 그대로 유지되어 데이터와 히스토리를 보존할 수 있습니다."
  },
  {
    question: "리포트는 어떻게 제공되나요?",
    answer: "주간 요약 리포트와 월간 상세 리포트를 제공합니다. 노출수, 클릭수, 전환수, ROAS, CPA 등 핵심 지표를 시각화하여 전달하며, 전담 매니저가 성과 분석과 개선 방향을 설명드립니다. 실시간 대시보드 공유도 가능합니다."
  }
];

export function GoogleAdsFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-20 md:py-24">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-blue-200 text-blue-600 text-sm font-semibold mb-6">
            <HelpCircle className="w-4 h-4" />
            <span>FAQ</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            자주 묻는 질문
          </h2>
          
          <p className="text-xl text-slate-600 leading-relaxed">
            구글 애즈 광고 대행 관련 궁금한 점을 확인하세요
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
