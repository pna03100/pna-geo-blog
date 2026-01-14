/**
 * [Component] SEO & GEO FAQ Section
 * [Design] Accordion with Blue Theme (Brand Color)
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
    question: "SEO와 GEO의 차이점은 무엇인가요?",
    answer: "SEO(Search Engine Optimization)는 Google, Naver 등 전통적인 검색 엔진에서 상위 노출을 목표로 합니다. GEO(Generative Engine Optimization)는 ChatGPT, Perplexity, Gemini 같은 AI 검색 엔진에서 Featured Answer로 선택되도록 콘텐츠를 최적화하는 차세대 전략입니다. 두 전략을 함께 적용하면 모든 검색 채널에서 우위를 점할 수 있습니다."
  },
  {
    question: "SEO 효과는 얼마나 빨리 나타나나요?",
    answer: "SEO는 중장기 전략으로, 초기 3~6개월은 기반 구축 기간입니다. 기술 SEO와 On-Page 최적화는 1~2개월 내 효과가 나타나지만, 본격적인 자연 검색 트래픽 증가는 6개월 이후부터 가속화됩니다. 단, 경쟁이 낮은 롱테일 키워드는 1~2개월 내에도 상위 노출이 가능합니다."
  },
  {
    question: "AI 검색 엔진(ChatGPT, Perplexity)에서 어떻게 상위 노출되나요?",
    answer: "AI 검색은 RAG(Retrieval-Augmented Generation) 방식으로 작동합니다. ① 명확한 답변 구조(H1 직후 요약, FAQ), ② 권위 있는 출처와 데이터, ③ 구조화된 데이터(JSON-LD, Table), ④ 최신성(Freshness)이 핵심입니다. 사용자의 질문에 대한 직접적이고 구체적인 답변을 제공해야 AI가 우리 콘텐츠를 인용합니다."
  },
  {
    question: "SaaS 제품의 SEO는 일반 웹사이트와 무엇이 다른가요?",
    answer: "SaaS SEO는 Product-Led Growth 전략과 연동되어야 하며, Bottom-of-Funnel 키워드에 집중하고, Feature별 랜딩 페이지를 구축하며, Free Trial → Activation 전환율까지 추적해야 합니다. 단순 트래픽이 아닌 MQL → SQL 전환을 목표로 하며, CAC 대비 LTV를 최적화하는 것이 핵심입니다."
  },
  {
    question: "SEO 작업 후 순위 보장이 되나요?",
    answer: "검색 엔진 알고리즘은 수백 가지 변수로 작동하며, 특정 순위를 법적으로 보장할 수는 없습니다. 하지만 체계적인 기술 SEO, 콘텐츠 최적화, 링크 빌딩을 통해 평균 200% 이상의 자연 검색 트래픽 증가를 경험하실 수 있습니다. 월간 리포트로 순위 변동과 트래픽 추이를 투명하게 공유드립니다."
  }
];

export function SEOFAQ() {
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
            SEO & GEO 최적화에 대한 궁금증을 해결해드립니다
          </p>
        </div>

        {/* FAQ Items */}
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
