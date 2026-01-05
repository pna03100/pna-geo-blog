// ============================================
// [Implementation] Elementor Iframe Renderer
// Trinity Core: Type-Safe Client Component
// ============================================

'use client';

import { useEffect, useState } from 'react';

interface Props {
  postId: number;
  wpUrl?: string;
}

export default function ElementorIframe({ 
  postId, 
  wpUrl = 'https://cms.pnamarketing.co.kr'
}: Props) {
  const [height, setHeight] = useState<string>('100vh');
  const [loading, setLoading] = useState<boolean>(true);

  // [Implementation] WordPress 페이지 URL 생성
  let pageUrl = `${wpUrl}/?p=${postId}`;
  if (postId === 2847) {
    pageUrl = `${wpUrl}/home`;
  } else if (postId === 3389) {
    pageUrl = `${wpUrl}/`;
  }

  useEffect(() => {
    // [Implementation] iframe 로드 완료 시 로딩 상태 해제
    const iframe = document.getElementById('elementor-iframe') as HTMLIFrameElement | null;
    if (iframe) {
      iframe.onload = () => {
        setLoading(false);
        
        // iframe 높이 자동 조정 시도
        try {
          const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
          if (iframeDoc) {
            const iframeHeight = iframeDoc.body.scrollHeight;
            setHeight(`${iframeHeight}px`);
          }
        } catch (e) {
          console.log('iframe 높이 자동 조정 불가 (CORS)');
        }
      };
    }
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
      {loading && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          zIndex: 10
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '5px solid #f3f3f3',
            borderTop: '5px solid #0073aa',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p style={{ color: '#666', fontSize: '16px' }}>페이지를 불러오는 중...</p>
        </div>
      )}
      
      <iframe
        id="elementor-iframe"
        src={pageUrl}
        style={{
          width: '100%',
          height: height,
          border: 'none',
          display: loading ? 'none' : 'block',
          overflow: 'hidden'
        }}
        title="WordPress Page"
        loading="eager"
      />
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

