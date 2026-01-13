// ============================================
// 환경 변수 진단 API (개발/디버깅 전용)
// ============================================

import { NextResponse } from 'next/server';

export async function GET() {
  const wpUrl = process.env.WORDPRESS_API_URL;
  const wpUrlPublic = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
  const wpFrontend = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const secret = process.env.WORDPRESS_REVALIDATE_SECRET;

  // 🔥 [DEBUG] 실제 사용될 URL 결정
  const actualUrl = wpUrl || wpUrlPublic;

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
      NEXT_PUBLIC_WORDPRESS_API_URL: {
        exists: !!wpUrlPublic,
        value: wpUrlPublic || '❌ 설정되지 않음',
        isValid: wpUrlPublic?.startsWith('https://cms.pnamarketing.co.kr'),
      },
      NEXT_PUBLIC_WORDPRESS_URL: {
        exists: !!wpFrontend,
        value: wpFrontend || '❌ 설정되지 않음',
      },
      NEXT_PUBLIC_SITE_URL: {
        exists: !!siteUrl,
        value: siteUrl || '❌ 설정되지 않음',
      },
      WORDPRESS_REVALIDATE_SECRET: {
        exists: !!secret,
        value: secret ? '✅ 설정됨 (보안상 숨김)' : '❌ 설정되지 않음',
      },
      ACTUAL_URL_USED: {
        value: actualUrl || '❌ 설정되지 않음',
        source: wpUrl ? 'WORDPRESS_API_URL' : wpUrlPublic ? 'NEXT_PUBLIC_WORDPRESS_API_URL' : 'NONE',
      },
    },

    warnings: [] as string[],
    errors: [] as string[],
  };

  // 검증 및 경고/에러 수집
  if (!actualUrl) {
    diagnostics.errors.push('WORDPRESS_API_URL 또는 NEXT_PUBLIC_WORDPRESS_API_URL 중 하나를 설정해야 합니다.');
  } else if (!actualUrl.startsWith('https://cms.pnamarketing.co.kr')) {
    diagnostics.warnings.push(
      `API URL이 잘못된 도메인을 가리키고 있습니다: ${actualUrl}`
    );
    diagnostics.warnings.push('올바른 값: https://cms.pnamarketing.co.kr/graphql');
  }

  if (!secret) {
    diagnostics.warnings.push('WORDPRESS_REVALIDATE_SECRET이 설정되지 않았습니다 (선택사항)');
  }

  // API 연결 테스트
  if (actualUrl) {
    try {
      if (process.env.NODE_ENV === 'development') {
        console.log('🧪 API 연결 테스트 시작:', actualUrl);
      }
      
      const testQuery = `
        query TestConnection {
          generalSettings {
            title
            url
          }
        }
      `;

      const requestBody = JSON.stringify({ query: testQuery });
      if (process.env.NODE_ENV === 'development') {
        console.log('📦 Request Body:', requestBody);
      }

      const response = await fetch(actualUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: requestBody,
        cache: 'no-store',
      });

      if (process.env.NODE_ENV === 'development') {
        console.log('✅ Response Status:', response.status);
      }

      const responseText = await response.text();
      if (process.env.NODE_ENV === 'development') {
        console.log('📄 Response Text:', responseText.substring(0, 500));
      }

      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch (e) {
        responseData = { parseError: 'Failed to parse JSON', rawText: responseText.substring(0, 200) };
      }

      diagnostics['api_test'] = {
        status: response.status,
        statusText: response.statusText,
        success: response.ok && !responseData.errors,
        requestBodyLength: requestBody.length,
        responseBodyLength: responseText.length,
        data: response.ok ? responseData : null,
        errors: responseData.errors || null,
        rawResponse: responseText.substring(0, 500),
      };

      if (!response.ok) {
        diagnostics.errors.push(`API 연결 실패: HTTP ${response.status}`);
      } else if (responseData.errors) {
        diagnostics.errors.push('GraphQL 쿼리 에러 발생');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;
      
      diagnostics['api_test'] = {
        success: false,
        error: errorMessage,
        stack: errorStack,
      };
      diagnostics.errors.push(`API 연결 예외: ${errorMessage}`);
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

