'use client';

import parse from 'html-react-parser';

interface ElementorRendererProps {
  html: string;
}

/**
 * Elementor로 제작된 페이지의 HTML을 그대로 렌더링
 * 디자인 보존을 우선으로 합니다.
 */
export default function ElementorRenderer({ html }: ElementorRendererProps) {
  console.log('🎨 ElementorRenderer 렌더링');
  console.log('HTML 길이:', html.length);

  if (!html) {
    return (
      <div className="p-8 text-center text-gray-500">
        컨텐츠가 없습니다.
      </div>
    );
  }

  // HTML을 그대로 파싱하여 React 컴포넌트로 변환
  const content = parse(html);

  return (
    <div className="elementor-page-wrapper">
      {content}
    </div>
  );
}

