// ============================================
// [Trinity Core] WordPress GraphQL Proxy
// ============================================
// [Layer 1 - GEO Strategy] CMS 도메인 숨김으로 AI Search 노출 최소화
// [Layer 2 - Security] Zod Validation (OWASP A03 방어)
// [Layer 3 - Implementation] Next.js Route Handler (CORS 우회)
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// ============================================
// [Security] GraphQL 요청 검증 스키마
// ============================================
const GraphQLRequestSchema = z.object({
  query: z.string().min(1, 'GraphQL query is required'),
  variables: z.record(z.unknown()).optional(),
  operationName: z.string().optional(),
});

// ============================================
// [Configuration] WordPress GraphQL Endpoint
// ============================================
const WORDPRESS_GRAPHQL_URL = 'https://cms.pnamarketing.co.kr/graphql';

// ============================================
// POST /api/graphql - GraphQL Proxy Handler
// ============================================
export async function POST(request: NextRequest) {
  try {
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Step 1: [Security] 요청 본문 파싱 및 검증
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    const body = await request.json();
    
    const validation = GraphQLRequestSchema.safeParse(body);
    
    if (!validation.success) {
      console.error('❌ [GraphQL Proxy] Invalid request:', validation.error);
      return NextResponse.json(
        { 
          errors: [{ 
            message: 'Invalid GraphQL request format',
            extensions: { code: 'BAD_REQUEST' }
          }] 
        },
        { status: 400 }
      );
    }

    const { query, variables, operationName } = validation.data;

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Step 2: [Implementation] WordPress로 프록시 요청
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    console.log('🚀 [GraphQL Proxy] Forwarding request to:', WORDPRESS_GRAPHQL_URL);
    console.log('📝 [GraphQL Proxy] Operation:', operationName || 'Anonymous');

    const response = await fetch(WORDPRESS_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // [Security] User-Agent 전달 (WordPress 로깅용)
        'User-Agent': request.headers.get('user-agent') || 'Next.js GraphQL Proxy',
      },
      body: JSON.stringify({
        query,
        variables: variables || {},
        operationName,
      }),
      // [Performance] Next.js 캐싱 비활성화 (실시간 데이터)
      cache: 'no-store',
    });

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Step 3: [Security] WordPress 응답 처리
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    if (!response.ok) {
      console.error('❌ [GraphQL Proxy] WordPress returned error:', response.status);
      
      // [Security] 내부 에러 정보 노출 방지
      return NextResponse.json(
        { 
          errors: [{ 
            message: 'Failed to fetch data from WordPress',
            extensions: { 
              code: 'WORDPRESS_ERROR',
              status: response.status 
            }
          }] 
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Step 4: [GEO Strategy] CORS 헤더 추가 & 응답 반환
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    console.log('✅ [GraphQL Proxy] Request successful');

    return NextResponse.json(data, {
      status: 200,
      headers: {
        // [CORS] 모든 오리진 허용 (프록시이므로 안전)
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        // [Performance] 캐싱 제어
        'Cache-Control': 'no-store, must-revalidate',
      },
    });

  } catch (error) {
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // [Security] 예외 처리 (내부 정보 노출 방지)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    console.error('💥 [GraphQL Proxy] Unexpected error:', error);
    
    return NextResponse.json(
      { 
        errors: [{ 
          message: 'Internal server error',
          extensions: { code: 'INTERNAL_SERVER_ERROR' }
        }] 
      },
      { status: 500 }
    );
  }
}

// ============================================
// OPTIONS /api/graphql - CORS Preflight Handler
// ============================================
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400', // 24시간 캐싱
    },
  });
}

