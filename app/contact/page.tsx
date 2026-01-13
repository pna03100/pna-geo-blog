/**
 * [Page] Contact - 프로젝트 문의
 * [Design] Clean Tech Style with Contact Form
 */

import { Metadata } from 'next';
import { BlueprintBackground } from '@/components/ui/blueprint-background';
import { ContactSection } from '@/components/sections/contact-section';

// ============================================
// [GEO] Metadata
// ============================================
export const metadata: Metadata = {
  title: '프로젝트 문의 | 피앤에이컴퍼니',
  description: '성장을 위한 파트너, PNA 컴퍼니입니다. 문의 남겨주시면 담당자가 24시간 이내에 연락드립니다.',
  openGraph: {
    title: '프로젝트 문의 | 피앤에이컴퍼니',
    description: '성장을 위한 파트너, PNA 컴퍼니입니다. 문의 남겨주시면 담당자가 24시간 이내에 연락드립니다.',
    type: 'website',
  },
};

// ============================================
// [Component] Contact Page
// ============================================
export default function ContactPage() {
  return (
    <>
      {/* Background */}
      <BlueprintBackground />

      {/* Main Content */}
      <main className="relative min-h-screen pt-[73px]">
        <ContactSection />
      </main>
    </>
  );
}
