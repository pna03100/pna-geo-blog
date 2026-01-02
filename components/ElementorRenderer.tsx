/**
 * Elementor HTML Renderer
 * - Elementor로 제작된 페이지의 HTML을 그대로 렌더링
 * - 디자인 깨짐 방지를 위해 이미지는 원본 <img> 태그 유지
 */

import parse from 'html-react-parser';

interface ElementorRendererProps {
  html: string;
}

export default function ElementorRenderer({ html }: ElementorRendererProps) {
  if (!html || html.trim() === '') {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-gray-500">콘텐츠가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="elementor-content">
      {parse(html)}
      
      {/* Elementor 스타일 격리용 CSS */}
      <style jsx global>{`
        /* Elementor 클래스가 다른 영역을 침범하지 않도록 범위 제한 */
        .elementor-content {
          width: 100%;
        }
        
        /* 이미지 레이지 로딩 추가 */
        .elementor-content img {
          loading: lazy;
        }
        
        /* Elementor 기본 스타일 보존 */
        .elementor-section {
          position: relative;
        }
        
        .elementor-container {
          max-width: 100%;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
}

