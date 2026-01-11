// ============================================
// [Trinity GEO Standard] Homepage - CTO Approved Version
// Layer 1: GEO + JSON-LD + Semantic HTML
// Layer 2: Type-Safe + Security + WordPress Integration
// Layer 3: Next.js 14 App Router + Server Component
// ============================================

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getContentByURI } from '@/lib/api';
import { replaceCmsUrl } from '@/lib/utils';
import { HeroSection } from "@/components/hero-section";
import { FeatureGrid } from "@/components/feature-grid";
import { ServicesTabs } from "@/components/services-tabs";
import { FaqSection } from "@/components/faq-section";
import * as cheerio from 'cheerio';
import type { FAQItem } from '@/lib/types';

// ============================================
// [GEO Layer 1] JSON-LD Schema Generator
// Google AI, ChatGPT, Perplexity Optimization
// ============================================
function generateJsonLd(data: {
  heroTitle: string;
  heroDesc: string;
  heroImage: string;
  faqs: FAQItem[];
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pnamarketing.co.kr';
  
  return {
    "@context": "https://schema.org",
    "@graph": [
      // [GEO] Organization Schema
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        "name": "피앤에이컴퍼니",
        "alternateName": "P&A Company",
        "url": baseUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/logo.png`,
          "width": 512,
          "height": 512
        },
        "image": data.heroImage || `${baseUrl}/og-image.png`,
        "description": data.heroDesc || "데이터 기반 성과 마케팅 전문 대행사 - Google Ads, SEO, GEO 최적화",
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "contact@pnamarketing.co.kr",
          "contactType": "Customer Service",
          "areaServed": "KR",
          "availableLanguage": ["Korean", "English"]
        },
        "sameAs": [
          "https://blog.naver.com/pnamarketing",
          "https://www.youtube.com/@pnamarketing"
        ]
      },
      // [GEO] WebSite Schema (Site Search)
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        "url": baseUrl,
        "name": "피앤에이컴퍼니",
        "publisher": {
          "@id": `${baseUrl}/#organization`
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${baseUrl}/search?q={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      },
      // [GEO] WebPage Schema
      {
        "@type": "WebPage",
        "@id": `${baseUrl}/#webpage`,
        "url": baseUrl,
        "name": data.heroTitle || "피앤에이컴퍼니 - 구글 광고 & 데이터 분석 파트너",
        "description": data.heroDesc || "GA4 분석, 테크니컬 SEO, 성과 중심 퍼포먼스 마케팅",
        "isPartOf": {
          "@id": `${baseUrl}/#website`
        },
        "about": {
          "@id": `${baseUrl}/#organization`
        },
        "inLanguage": "ko-KR"
      },
      // [GEO] FAQPage Schema (조건부)
      ...(data.faqs.length > 0 ? [{
        "@type": "FAQPage",
        "@id": `${baseUrl}/#faqpage`,
        "mainEntity": data.faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }] : [])
    ]
  };
}

// ============================================
// [SEO Layer] Dynamic Metadata (WordPress SEO Integration)
// ============================================
export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await getContentByURI('/');
    
    if (!data) {
      return {
        title: '피앤에이컴퍼니 - 구글 광고 대행사',
        description: '데이터 기반 성과 마케팅 전문',
      };
    }

    // WordPress SEO 데이터 우선 사용 (RankMath/Yoast)
    const seoTitle = data.seo?.title || data.title || '피앤에이컴퍼니 - 구글 광고 & 데이터 분석 파트너';
    const seoDesc = data.seo?.metaDesc || 'GA4 분석, 테크니컬 SEO, 성과 중심 퍼포먼스 마케팅. 데이터 기반 의사결정으로 ROI 200% 달성';
    const ogImage = data.seo?.opengraphImage?.sourceUrl || data.featuredImage?.node?.sourceUrl;

    return {
      title: seoTitle,
      description: seoDesc,
      openGraph: {
        title: data.seo?.opengraphTitle || seoTitle,
        description: data.seo?.opengraphDescription || seoDesc,
        images: ogImage ? [{ url: replaceCmsUrl(ogImage) }] : [{ url: '/og-image.png' }],
        type: 'website',
        locale: 'ko_KR',
        url: process.env.NEXT_PUBLIC_SITE_URL || 'https://pnamarketing.co.kr',
      },
      twitter: {
        card: 'summary_large_image',
        title: seoTitle,
        description: seoDesc,
        images: ogImage ? [replaceCmsUrl(ogImage)] : ['/og-image.png'],
      },
      alternates: {
        canonical: data.seo?.canonical || process.env.NEXT_PUBLIC_SITE_URL || 'https://pnamarketing.co.kr',
      },
      // [GEO] Robots Directives
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
    };
  } catch (error) {
    console.error('❌ [Metadata Generation Failed]:', error);
    return {
      title: '피앤에이컴퍼니',
      description: '데이터 기반 퍼포먼스 마케팅',
    };
  }
}

// ============================================
// [Trinity Layer 3] Server Component Implementation
// ============================================
export default async function HomePage() {
  // [Security] Type-Safe Data Fetching
  const data = await getContentByURI('/');
  
  // [Defensive] 404 처리
  if (!data?.content) {
    console.error("❌ [Page] No content found from WordPress");
    notFound();
  }

  // [Security] CMS URL 제거 (소스코드 보안)
  const cleanContent = replaceCmsUrl(data.content);
  
  // [Implementation] HTML 파싱
  const $ = cheerio.load(cleanContent);

  console.log("🔍 [Page] Parsing WordPress content...");

  // ============================================
  // [Layer 2] Type-Safe Data Extraction
  // ============================================
  
  // Hero Section Data
  const heroTitle = replaceCmsUrl($('#hero h2, #hero h1').first().text().trim()) 
    || data.title 
    || "구글 광고 대행사 피앤에이컴퍼니";
  const heroDesc = replaceCmsUrl($('#hero p').first().text().trim()) 
    || "데이터 기반 성과 마케팅 전문 - Google Ads, SEO, GEO 최적화로 ROI 200% 달성";
  const heroImage = replaceCmsUrl($('#hero img').attr('src')) 
    || data.featuredImage?.node?.sourceUrl 
    || "/placeholder.svg";

  // Feature Grid Data
  const features: { title: string; description: string }[] = [];
  $('#features article, #features .feature-item').each((_, el) => {
    const title = replaceCmsUrl($(el).find('h3').text().trim());
    const description = replaceCmsUrl($(el).find('p').text().trim());
    if (title && description) {
      features.push({ title, description });
    }
  });

  // Services Tabs Data
  const services: { id: string; title: string; content: string }[] = [];
  $('#services .service-item, #services article').each((_, el) => {
    const id = $(el).attr('data-tab') || $(el).attr('id') || `service-${services.length}`;
    const title = replaceCmsUrl($(el).find('h3').text().trim());
    const content = replaceCmsUrl($(el).find('p').text().trim());
    if (title && content) {
      services.push({ id, title, content });
    }
  });

  // FAQ Data (GEO Schema용)
  const faqs: FAQItem[] = [];
  $('#faq article, #faq .faq-item').each((_, el) => {
    const question = replaceCmsUrl($(el).find('h3, .question').text().trim());
    const answer = replaceCmsUrl($(el).find('p, .answer').text().trim());
    if (question && answer) {
      faqs.push({ question, answer });
    }
  });

  // [Debug] 추출된 데이터 로그
  console.log("✅ [Parsed] Hero:", heroTitle);
  console.log("✅ [Parsed] Features:", features.length);
  console.log("✅ [Parsed] Services:", services.length);
  console.log("✅ [Parsed] FAQs:", faqs.length);

  // JSON-LD 데이터 생성
  const jsonLd = generateJsonLd({
    heroTitle,
    heroDesc,
    heroImage: replaceCmsUrl(heroImage),
    faqs,
  });

  // ============================================
  // [Layer 1] Semantic HTML Structure (GEO)
  // ============================================
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      {/* [GEO] JSON-LD Structured Data Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* [GEO] Hero Section - Primary Content Block */}
      <section aria-label="메인 소개" className="relative">
        <HeroSection 
          title={heroTitle}
          description={heroDesc}
          imageSrc={replaceCmsUrl(heroImage)}
        />
        
        {/* [GEO] Snippet Trap - Direct Answer Summary for AI */}
        <div className="container py-12 max-w-4xl">
          <p className="text-xl text-muted-foreground leading-relaxed text-center">
            <strong className="text-primary font-bold">피앤에이컴퍼니</strong>는 데이터 기반 성과 마케팅 전문 대행사로, 
            Google Ads, 테크니컬 SEO, GEO 최적화를 통해{" "}
            <span className="font-bold text-primary">평균 ROI 200% 달성</span>을 
            지원합니다. <span className="font-semibold">10년 이상의 실전 경험</span>을 바탕으로 
            검증된 데이터 중심 마케팅 전략을 제공합니다.
          </p>
        </div>
      </section>

      {/* [Semantic] Feature Grid Section */}
      {features.length > 0 && (
        <section aria-label="주요 특징" className="py-20 bg-muted/30">
          <div className="container">
            <header className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                우리의 강점
              </h2>
              <p className="text-muted-foreground text-xl">데이터 기반 의사결정으로 성과를 만듭니다</p>
            </header>
            <FeatureGrid items={features} />
          </div>
        </section>
      )}

      {/* [Semantic] Services Tabs Section */}
      {services.length > 0 && (
        <section aria-label="제공 서비스" className="py-20">
          <div className="container">
            <header className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                서비스 안내
              </h2>
              <p className="text-muted-foreground text-xl">맞춤형 마케팅 솔루션을 제공합니다</p>
            </header>
            <ServicesTabs items={services} />
          </div>
        </section>
      )}

      {/* [GEO] FAQ Section - Schema.org FAQPage */}
      {faqs.length > 0 && (
        <section aria-label="자주 묻는 질문" className="py-20 bg-muted/30">
          <div className="container">
            <header className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                자주 묻는 질문
              </h2>
              <p className="text-muted-foreground text-xl">고객님들이 궁금해하시는 내용을 정리했습니다</p>
            </header>
            <FaqSection items={faqs} />
          </div>
        </section>
      )}

      {/* [GEO] Call to Action Section - Conversion Optimization */}
      <section 
        aria-label="문의하기" 
        className="py-24 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 text-white relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.05] pointer-events-none" />
        
        <div className="container relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            지금 바로 시작하세요
          </h2>
          <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-2xl mx-auto">
            무료 마케팅 진단으로 우리 회사의 성장 가능성을 확인하세요
          </p>
          <a 
            href="mailto:contact@pnamarketing.co.kr"
            className="inline-flex items-center gap-2 bg-white text-purple-600 px-10 py-5 rounded-xl font-bold text-lg hover:bg-slate-100 transition-all duration-300 shadow-2xl hover:scale-105 active:scale-95"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            무료 상담 신청하기
          </a>
          
          {/* Trust Signals */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm opacity-80">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>10년+ 실전 경험</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>평균 ROI 200%</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>데이터 기반 전략</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
