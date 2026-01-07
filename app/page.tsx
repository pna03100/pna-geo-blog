// app/page.tsx
import { getContentByURI } from '@/lib/api';
import { HeroSection } from "@/components/hero-section";
import { FeatureGrid } from "@/components/feature-grid";
import { ServicesTabs } from "@/components/services-tabs";
import { FaqSection } from "@/components/faq-section";
import * as cheerio from 'cheerio';

export default async function HomePage() {
  // 1. 워드프레스 데이터 가져오기
  const data = await getContentByURI('/');
  
  // [Debug] 데이터가 없으면 에러 표시
  if (!data?.content) {
    console.error("❌ [Page] No content found from WordPress");
    return <div className="p-10 text-center">데이터를 불러오지 못했습니다.</div>;
  }

  // 2. HTML 파싱 시작
  const $ = cheerio.load(data.content);

  // [Debug] 워드프레스에서 온 원본 HTML 확인 (터미널 로그 확인 필수!)
  console.log("🔍 [Page] Raw HTML Preview:", data.content.substring(0, 200));

  // 3. 데이터 추출 (Safe Extraction)
  // 데이터가 없으면 '기본값(Fallback)'을 넣어서 디자인이 깨지지 않게 방어합니다.

  // (A) Hero Section
  const heroTitle = $('#hero h2').text().trim() || "구글 광고 대행사 피앤에이컴퍼니";
  const heroDesc = $('#hero p').first().text().trim() || "데이터 & GEO 마케팅 전문 파트너";
  // 이미지 찾기: img 태그가 있으면 src 가져오고, 없으면 기본값
  const heroImage = $('#hero img').attr('src') || "/placeholder.svg"; 

  // (B) Feature Grid
  const features: { title: string; description: string }[] = [];
  $('#features article').each((_, el) => {
    features.push({
      title: $(el).find('h3').text().trim(),
      description: $(el).find('p').text().trim(),
    });
  });

  // (C) Tabs (Services)
  const services: { id: string; title: string; content: string }[] = [];
  $('#services .service-item').each((_, el) => {
    services.push({
      id: $(el).attr('data-tab') || 'unknown',
      title: $(el).find('h3').text().trim(),
      content: $(el).find('p').text().trim(),
    });
  });

  // (D) FAQ
  const faqs: { question: string; answer: string }[] = [];
  $('#faq article').each((_, el) => {
    faqs.push({
      question: $(el).find('h3').text().trim(),
      answer: $(el).find('p').text().trim(),
    });
  });

  // [Debug] 추출된 데이터 로그 확인
  console.log("✅ [Parsed] Hero Title:", heroTitle);
  console.log("✅ [Parsed] Features Count:", features.length);

  // 4. 디자인 컴포넌트 렌더링 (강제)
  // 파싱된 데이터(features 등)가 비어있어도 컴포넌트는 무조건 렌더링됩니다.
  return (
    <main className="flex min-h-screen flex-col">
      
      {/* Hero Section */}
      <HeroSection 
        title={heroTitle}
        description={heroDesc}
        imageSrc={heroImage}
      />

      {/* Feature Grid */}
      {/* 데이터가 없으면 기본값이라도 보여주기 위해 길이가 0이면 더미 데이터 사용 가능 */}
      <FeatureGrid items={features.length > 0 ? features : undefined} />

      {/* Services Tabs */}
      <ServicesTabs items={services.length > 0 ? services : undefined} />

      {/* FAQ Section */}
      <FaqSection items={faqs.length > 0 ? faqs : undefined} />

    </main>
  );
}