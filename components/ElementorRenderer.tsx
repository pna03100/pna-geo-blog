// ============================================
// Elementor HTML Renderer (Design Track)
// ============================================

// @ts-nocheck
import parse from 'html-react-parser';

interface Props {
  html: string;
}

export default function ElementorRenderer({ html }: Props) {
  // 🔥 절대 죽지 않는 방어 코드
  // @ts-ignore
  if (!html || html.trim() === '') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">페이지를 불러올 수 없습니다</h1>
        <p className="text-gray-600">HTML 콘텐츠가 비어있습니다.</p>
      </div>
    );
  }

  // @ts-ignore
  return (
    <div className="elementor-wrapper" suppressHydrationWarning>
      {/* @ts-ignore */}
      {parse(html || '<p>콘텐츠가 없습니다.</p>')}
    </div>
  );
}

