import type { Metadata } from "next";
import { WordPressClient } from "./WordPressClient";
import { GridBackground } from "@/components/ui/grid-background";

export const metadata: Metadata = {
  title: "워드프레스 & SEO 최적화 | PNA Company",
  description: "검색엔진과 AI가 이해하는 워드프레스 웹사이트로 자연 검색 트래픽을 200% 증가시키세요. SEO, GEO 전문 구축 서비스.",
  keywords: "워드프레스, SEO, 검색 최적화, GEO, 웹사이트 제작, 검색 노출",
  openGraph: {
    title: "워드프레스 & SEO 최적화 | PNA Company",
    description: "검색엔진과 AI가 이해하는 워드프레스 웹사이트로 자연 검색 트래픽을 200% 증가시키세요.",
    type: "website",
  },
};

export default function WordPressPage() {
  return (
    <>
      <GridBackground />
      <WordPressClient />
    </>
  );
}
