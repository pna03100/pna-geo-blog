import { ImageResponse } from 'next/og';
import { getAllPosts, getContentByURI } from '@/lib/api';

export const runtime = 'edge';
export const alt = '피앤에이컴퍼니 인사이트';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// 한글 폰트 로드 (Noto Sans KR Bold)
async function loadFont(): Promise<ArrayBuffer | null> {
  try {
    const res = await fetch(
      'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@700&display=swap'
    );
    const css = await res.text();
    const fontUrl = css.match(/src: url\((.+?)\) format\('woff2'\)/)?.[1];
    if (!fontUrl) return null;
    const fontRes = await fetch(fontUrl);
    return fontRes.arrayBuffer();
  } catch {
    return null;
  }
}

export default async function OGImage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // 포스트 데이터 가져오기
  let title = '피앤에이컴퍼니 인사이트';
  let category = '';
  let dateStr = '';

  try {
    const allPosts = await getAllPosts();
    const matched = allPosts.find((p) => p.slug === slug);

    if (matched) {
      title = matched.title || title;
      category = matched.categories?.nodes?.[0]?.name || '';
      dateStr = matched.date
        ? new Date(matched.date).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        : '';
    }
  } catch {
    // 에러 시 기본값 사용
  }

  // 제목 길이 제한 (OG 이미지에 맞게)
  if (title.length > 60) {
    title = title.slice(0, 57) + '...';
  }

  const fontData = await loadFont();

  const fonts: any[] = fontData
    ? [{ name: 'NotoSansKR', data: fontData, style: 'normal' as const, weight: 700 as const }]
    : [];

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 70px',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
          fontFamily: fontData ? 'NotoSansKR, sans-serif' : 'sans-serif',
        }}
      >
        {/* 상단: 카테고리 + 날짜 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {category && (
            <div
              style={{
                padding: '6px 16px',
                borderRadius: '6px',
                background: 'rgba(37, 99, 235, 0.2)',
                border: '1px solid rgba(59, 130, 246, 0.4)',
                color: '#93c5fd',
                fontSize: '18px',
                fontWeight: 700,
              }}
            >
              {category}
            </div>
          )}
          {dateStr && (
            <div style={{ color: '#94a3b8', fontSize: '18px' }}>
              {dateStr}
            </div>
          )}
        </div>

        {/* 중앙: 제목 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0',
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontSize: title.length > 30 ? '44px' : '52px',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.3,
              letterSpacing: '-0.02em',
            }}
          >
            {title}
          </div>
        </div>

        {/* 하단: 로고 + 사이트명 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontSize: '20px',
                fontWeight: 700,
              }}
            >
              P
            </div>
            <div style={{ color: '#cbd5e1', fontSize: '20px', fontWeight: 700 }}>
              피앤에이컴퍼니
            </div>
          </div>
          <div style={{ color: '#64748b', fontSize: '16px' }}>
            pnamarketing.co.kr
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts,
    }
  );
}
