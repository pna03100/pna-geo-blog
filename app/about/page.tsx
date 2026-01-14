import { Metadata } from 'next';
import { AboutClient } from './AboutClient';
import { SubPageBackground } from '@/components/ui/sub-page-background';

export const metadata: Metadata = {
  title: '회사소개 | 피앤에이컴퍼니',
  description: '데이터 기반 마케팅 전략과 AI 기술로 클라이언트의 성장을 이끄는 디지털 마케팅 전문 기업',
  openGraph: {
    title: '회사소개 | 피앤에이컴퍼니',
    description: '15년 경력의 전문성과 검증된 성과로 함께 성장합니다',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <>
      <SubPageBackground />
      <AboutClient />
    </>
  );
}
