/**
 * [Page] Google Ads Service
 * Premium Blue Theme matching Main Page
 */

import { Metadata } from 'next';
import { GoogleAdsClient } from './GoogleAdsClient';
import { GridBackground } from '@/components/ui/grid-background';

export const metadata: Metadata = {
  title: '구글 애즈 광고 대행',
  description: 'Google 공식 파트너가 직접 관리하는 프리미엄 구글 애즈 광고 대행 서비스. 평균 ROAS 500% 달성.',
  openGraph: {
    title: '구글 애즈 광고 대행 | 피앤에이컴퍼니',
    description: 'Google 공식 파트너의 데이터 기반 구글 애즈 광고 대행',
    type: 'website',
  },
};

export default function GoogleAdsPage() {
  return (
    <>
      <GridBackground />
      <GoogleAdsClient />
    </>
  );
}
