import type { Metadata } from "next";
import { WordPressClient } from "./WordPressClient";
import { BlueprintBackground } from "@/components/ui/blueprint-background";

export const metadata: Metadata = {
  title: "워드프레스 제작 | PNA Company",
  description: "비즈니스 성장을 위한 프리미엄 워드프레스 웹사이트 제작. 빠른 속도, 보안, 관리 편의성을 모두 갖춘 맞춤형 솔루션.",
  keywords: "워드프레스, 웹사이트 제작, 홈페이지 제작, 반응형 웹, CMS",
  openGraph: {
    title: "워드프레스 제작 | PNA Company",
    description: "비즈니스 성장을 위한 프리미엄 워드프레스 웹사이트 제작",
    type: "website",
  },
};

export default function WordPressPage() {
  return (
    <>
      <BlueprintBackground />
      <WordPressClient />
    </>
  );
}
