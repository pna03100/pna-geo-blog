/**
 * [Component] WordPress FAQ Section
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
    question: "워드프레스와 다른 CMS의 차이점은 무엇인가요?",
    answer: "워드프레스는 전 세계 웹사이트의 43%가 사용하는 검증된 CMS로, 무료 오픈소스이며 확장성이 뛰어납니다. 풍부한 플러그인 생태계와 테마 옵션으로 커스터마이징이 자유롭고, SEO 최적화에 매우 유리합니다. 또한 개발자 커뮤니티가 방대하여 지속적인 업데이트와 보안 패치가 제공됩니다."
  },
  {
    question: "제작 후 직접 콘텐츠를 수정할 수 있나요?",
    answer: "네, 가능합니다. 워드프레스는 직관적인 에디터(Gutenberg)를 제공하여 기술 지식 없이도 글 작성, 이미지 업로드, 페이지 수정이 가능합니다. 납품 시 관리자 교육을 제공하며, 매뉴얼 문서도 함께 전달드립니다. 평생 무료 기술 지원도 제공되어 언제든 문의 가능합니다."
  },
  {
    question: "반응형 디자인은 기본으로 포함되나요?",
    answer: "네, 모든 웹사이트는 모바일, 태블릿, 데스크톱에서 완벽하게 작동하는 반응형 디자인으로 제작됩니다. Google의 Mobile-First Indexing 정책에 맞춰 모바일 환경을 우선 최적화하며, 다양한 디바이스에서 테스트를 거쳐 납품합니다."
  },
  {
    question: "보안은 어떻게 관리되나요?",
    answer: "워드프레스 코어, 테마, 플러그인의 정기 업데이트, 보안 플러그인(Wordfence 등) 설치, SSL 인증서 적용, 정기 백업 시스템 구축을 진행합니다. 로그인 시도 제한, 관리자 계정 보호, 파일 권한 설정 등 OWASP 보안 기준에 따라 설정합니다."
  },
  {
    question: "제작 후 유지보수 비용은 얼마인가요?",
    answer: "기본 유지보수(보안 업데이트, 백업, 기술 지원)는 평생 무료로 제공됩니다. 다만, 대규모 디자인 변경이나 신규 기능 추가는 별도 견적이 필요할 수 있습니다. 호스팅 비용은 월 1~3만원 수준이며, 트래픽에 따라 조정 가능합니다."
  }
];

export function WordPressFAQ() {
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
            워드프레스 제작에 대한 궁금증을 해결해드립니다
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
