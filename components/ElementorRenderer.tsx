// ============================================
// Elementor HTML Renderer with Full CSS Support
// Next.js 속도 + Elementor 디자인 완벽 지원
// ============================================

// @ts-nocheck
'use client';

import { useEffect } from 'react';
import parse from 'html-react-parser';
import Head from 'next/head';

interface Props {
  html: string;
  postId?: string | number;
}

export default function ElementorRenderer({ html, postId }: Props) {
  // 방어 코드
  if (!html || html.trim() === '') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">페이지를 불러올 수 없습니다</h1>
        <p className="text-gray-600">HTML 콘텐츠가 비어있습니다.</p>
      </div>
    );
  }

  // Elementor CSS 동적 로드
  useEffect(() => {
    // 1. Elementor 글로벌 CSS 로드 (항상 필요)
    const elementorGlobalCSS = [
      // Elementor Core CSS
      'https://cms.pnamarketing.co.kr/wp-content/plugins/elementor/assets/css/frontend-lite.min.css',
      'https://cms.pnamarketing.co.kr/wp-content/plugins/elementor/assets/lib/eicons/css/elementor-icons.min.css',
      'https://cms.pnamarketing.co.kr/wp-content/plugins/elementor/assets/lib/animations/animations.min.css',
      // Elementor Pro CSS (Pro 사용 시)
      'https://cms.pnamarketing.co.kr/wp-content/plugins/elementor-pro/assets/css/frontend-lite.min.css',
    ];

    // CSS 링크 추가
    elementorGlobalCSS.forEach((cssUrl) => {
      if (!document.querySelector(`link[href="${cssUrl}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = cssUrl;
        link.type = 'text/css';
        document.head.appendChild(link);
      }
    });

    // 2. 페이지별 동적 CSS 로드 (Elementor가 각 페이지마다 생성)
    if (postId) {
      const pageCSS = `https://cms.pnamarketing.co.kr/wp-content/uploads/elementor/css/post-${postId}.css`;
      
      if (!document.querySelector(`link[href="${pageCSS}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = pageCSS;
        link.type = 'text/css';
        // 에러 무시 (CSS 파일이 없을 수도 있음)
        link.onerror = () => {
          console.log(`페이지 CSS 로드 실패 (정상): ${pageCSS}`);
        };
        document.head.appendChild(link);
      }
    }

    // 3. 글로벌 Elementor CSS도 로드
    const globalElementorCSS = 'https://cms.pnamarketing.co.kr/wp-content/uploads/elementor/css/global.css';
    if (!document.querySelector(`link[href="${globalElementorCSS}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = globalElementorCSS;
      link.type = 'text/css';
      link.onerror = () => {
        console.log('글로벌 CSS 로드 실패 (정상)');
      };
      document.head.appendChild(link);
    }

    // 4. WordPress 테마 CSS (기본 스타일)
    const themeCSS = 'https://cms.pnamarketing.co.kr/wp-content/themes/hello-elementor/style.min.css';
    if (!document.querySelector(`link[href="${themeCSS}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = themeCSS;
      link.type = 'text/css';
      link.onerror = () => {
        console.log('테마 CSS 로드 실패 (정상)');
      };
      document.head.appendChild(link);
    }
  }, [postId]);

  // HTML 파싱 및 렌더링
  return (
    <div 
      className="elementor-page" 
      suppressHydrationWarning
      style={{
        width: '100%',
        overflow: 'hidden',
      }}
    >
      {parse(html || '<p>콘텐츠가 없습니다.</p>')}
      
      {/* Elementor 기본 스타일 추가 (CSS 로드 실패 대비) */}
      <style jsx global>{`
        /* Elementor 기본 리셋 */
        .elementor-page {
          margin: 0;
          padding: 0;
        }
        
        .elementor-section {
          position: relative;
        }
        
        .elementor-container {
          margin: 0 auto;
          max-width: 100%;
        }
        
        /* 이미지 경로 수정 (상대 경로 → 절대 경로) */
        .elementor-page img[src^="/wp-content"] {
          content: url(https://cms.pnamarketing.co.kr/wp-content);
        }
        
        /* 반응형 기본 설정 */
        @media (max-width: 767px) {
          .elementor-section {
            padding: 20px 10px;
          }
        }
      `}</style>
    </div>
  );
}

