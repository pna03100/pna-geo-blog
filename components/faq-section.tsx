// ============================================
// [GEO] FAQ Section Component with Schema
// Trinity: FAQ Schema + Accordion UI + WordPress Data
// ============================================

'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

// [Security] Props Interface with Optional Items
interface FaqSectionComponentProps {
  title?: string;
  items?: { question: string; answer: string }[];
}

// [Implementation] Fallback Data
const DEFAULT_FAQS = [
  {
    question: 'Next.js와 WordPress를 어떻게 연동하나요?',
    answer: 'WPGraphQL 플러그인을 통해 WordPress 데이터를 GraphQL API로 제공하고, Next.js에서 이를 받아 렌더링합니다.',
  },
  {
    question: '서비스 가격은 어떻게 되나요?',
    answer: '프로젝트 규모와 요구사항에 따라 맞춤형 견적을 제공합니다. 무료 상담을 통해 정확한 비용을 안내해 드립니다.',
  },
  {
    question: '계약 기간은 어떻게 되나요?',
    answer: '최소 3개월부터 시작하며, 프로젝트 특성에 따라 유연하게 조정 가능합니다.',
  },
];

export function FaqSection({ title, items }: FaqSectionComponentProps) {
  // [Implementation] Use items from parent or fallback to default
  const faqs = items && items.length > 0 ? items : DEFAULT_FAQS;

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-16 md:py-24 bg-slate-50">
      <div className="container px-4 md:px-6 mx-auto max-w-3xl">
        {/* [GEO] Section Title */}
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              {title}
            </h2>
          </div>
        )}
        
        {/* [GEO] FAQ Accordion with Schema */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card 
              key={index}
              className="border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full text-left"
                aria-expanded={openIndex === index}
              >
                <CardContent className="p-6 flex items-start justify-between gap-4">
                  {/* [GEO] Question - AI-Readable */}
                  <h3 className="text-lg font-semibold text-slate-900 flex-1">
                    {faq.question}
                  </h3>
                  
                  {/* [Implementation] Toggle Icon */}
                  <svg
                    className={`w-6 h-6 text-slate-400 transition-transform duration-300 flex-shrink-0 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </CardContent>
              </button>
              
              {/* [GEO] Answer with Statistics/Expert Citations */}
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-slate-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
      
      {/* [GEO] JSON-LD Schema for FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </section>
  );
}

