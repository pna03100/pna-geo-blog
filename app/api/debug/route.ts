// ============================================
// 환경 변수 진단 API (개발/디버깅 전용)
// ============================================

import { NextResponse } from 'next/server';

export async function GET() {
  const wpUrl = process.env.WORDPRESS_API_URL;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const secret = process.env.WORDPRESS_REVALIDATE_SECRET;

  // 환경 변수 상태 확인
  const diagnostics = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    vercel: process.env.VERCEL ? 'Vercel 환경' : '로컬 환경',
    
    env_variables: {
      WORDPRESS_API_URL: {
        exists: !!wpUrl,
        value: wpUrl || '❌ 설정되지 않음',
        isValid: wpUrl?.startsWith('https://cms.pnamarketing.co.kr'),
      },
      NEXT_PUBLIC_SITE_URL: {
        exists: !!siteUrl,
        value: siteUrl || '❌ 설정되지 않음',
      },
      WORDPRESS_REVALIDATE_SECRET: {
        exists: !!secret,
        value: secret ? '✅ 설정됨 (보안상 숨김)' : '❌ 설정되지 않음',
      },
    },

    warnings: [] as string[],
    errors: [] as string[],
  };

  // 검증 및 경고/에러 수집
  if (!wpUrl) {
    diagnostics.errors.push('WORDPRESS_API_URL 환경 변수가 설정되지 않았습니다.');
  } else if (!wpUrl.startsWith('https://cms.pnamarketing.co.kr')) {
    diagnostics.warnings.push(
      `WORDPRESS_API_URL이 잘못된 도메인을 가리키고 있습니다: ${wpUrl}`
    );
    diagnostics.warnings.push('올바른 값: https://cms.pnamarketing.co.kr/graphql');
  }

  if (!secret) {
    diagnostics.warnings.push('WORDPRESS_REVALIDATE_SECRET이 설정되지 않았습니다 (선택사항)');
  }

  // API 연결 테스트
  if (wpUrl) {
    try {
      console.log('🧪 API 연결 테스트 시작:', wpUrl);
      
      const testQuery = `
        query TestConnection {
          generalSettings {
            title
            url
          }
        }
      `;

      const response = await fetch(wpUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: testQuery }),
      });

      const responseData = await response.json();

      diagnostics['api_test'] = {
        status: response.status,
        statusText: response.statusText,
        success: response.ok && !responseData.errors,
        data: response.ok ? responseData : null,
        errors: responseData.errors || null,
      };

      if (!response.ok) {
        diagnostics.errors.push(`API 연결 실패: HTTP ${response.status}`);
      } else if (responseData.errors) {
        diagnostics.errors.push('GraphQL 쿼리 에러 발생');
      }
    } catch (error: any) {
      diagnostics['api_test'] = {
        success: false,
        error: error.message,
        stack: error.stack,
      };
      diagnostics.errors.push(`API 연결 예외: ${error.message}`);
    }
  }

  // 상태 판정
  const status = diagnostics.errors.length > 0 ? 'ERROR' : 
                 diagnostics.warnings.length > 0 ? 'WARNING' : 'OK';

  return NextResponse.json(
    {
      status,
      ...diagnostics,
    },
    { 
      status: diagnostics.errors.length > 0 ? 500 : 200,
      headers: {
        'Cache-Control': 'no-store',
      },
    }
  );
}

