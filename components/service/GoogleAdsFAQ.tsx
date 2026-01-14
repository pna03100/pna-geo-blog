/**
 * [Component] Google Ads FAQ Section
 * [Design] Accordion with Premium Blue Theme
 */

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "광고비는 최소 얼마부터 시작해야 하나요?",
    answer: "최소 월 200만원부터 시작 가능하며, 중소기업은 월 500~1,500만원을 권장합니다. 광고비가 너무 적으면 충분한 데이터를 확보하기 어렵고, Google AI 학습에 시간이 오래 걸립니다. 업종과 경쟁 강도에 따라 권장 예산이 다르므로, 무료 진단을 통해 최적 예산을 안내해드립니다."
  },
  {
    question: "ROAS는 어느 정도 나올까요?",
    answer: "업종과 제품에 따라 다르지만, 이커머스는 평균 ROAS 1:4~1:8, B2B SaaS는 리드당 비용(CPL) 기준으로 측정합니다. 실제 사례로 뷰티 이커머스는 ROAS 1:8.3, 피부과는 예약당 6,250원을 달성했습니다. 초기 1~2개월은 학습 기간이며, 3개월 이후부터 안정적인 성과가 나타납니다."
  },
  {
    question: "Google Ads와 네이버 광고, 어떤 게 더 좋나요?",
    answer: "Google Ads는 글로벌 도달과 AI 최적화가 강점이며, 검색 의도 기반 정확한 타겟팅이 가능합니다. 네이버는 한국 시장에 특화되어 있으나 CPC가 높고 AI 기능이 제한적입니다. 일반적으로 이커머스와 B2B는 Google Ads가, 로컬 비즈니스는 두 플랫폼을 병행하는 것이 효과적입니다."
  },
  {
    question: "광고 효과는 얼마나 빨리 나타나나요?",
    answer: "광고 집행 즉시 노출되지만, 본격적인 성과는 1개월 후부터 나타납니다. 초기 1~2주는 Google AI가 데이터를 학습하는 기간으로, 클릭과 전환 패턴을 분석합니다. 3개월 차부터 ROAS가 안정화되며, 6개월 이후 최적 효율에 도달합니다. SEO는 3~6개월 소요되는 반면, Google Ads는 즉시 효과를 낼 수 있습니다."
  },
  {
    question: "광고 계정과 데이터는 누가 소유하나요?",
    answer: "광고 계정은 100% 고객님 소유이며, 저희는 관리 권한만 부여받습니다. 모든 광고비는 고객님의 Google Ads 계정으로 직접 결제되며, 계약 종료 시에도 계정과 모든 데이터(키워드, 전환 추적, 과거 성과)가 그대로 유지됩니다. 투명한 리포팅을 위해 고객님께 계정 접근 권한을 100% 제공합니다."
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
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            자주 묻는 질문
          </h2>
          
          <p className="text-lg text-slate-600">
            구글 애즈 광고 대행에 대한 궁금증을 해결해드립니다
          </p>
        </div>

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Question */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-blue-50/50 transition-colors group"
              >
                <span className="text-lg font-bold text-slate-900 pr-4 group-hover:text-blue-600 transition-colors">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown 
                    className={cn(
                      "w-5 h-5 flex-shrink-0 transition-colors",
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
                    <div className="px-6 pb-5 pt-2">
                      <p className="text-slate-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
