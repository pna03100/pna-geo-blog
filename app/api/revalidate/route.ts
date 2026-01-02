/**
 * Revalidation API Route
 * - WordPress Webhook 수신
 * - 보안 토큰 검증
 * - 변경된 경로만 재검증
 */

import { revalidateTag, revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  console.log('🔄 [Revalidate] Webhook 수신됨');

  try {
    // 🔒 보안: Secret 토큰 검증
    const secret = request.nextUrl.searchParams.get('secret');
    const expectedSecret = process.env.WORDPRESS_REVALIDATE_SECRET;

    if (!expectedSecret) {
      console.error('❌ [Revalidate] WORDPRESS_REVALIDATE_SECRET이 설정되지 않음');
      return NextResponse.json(
        { message: 'Revalidation secret not configured' },
        { status: 500 }
      );
    }

    if (secret !== expectedSecret) {
      console.error('❌ [Revalidate] 잘못된 토큰');
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      );
    }

    // Webhook 데이터 파싱
    const body = await request.json();
    console.log('📦 [Revalidate] Payload:', JSON.stringify(body, null, 2));

    const { path, type } = body;

    // ========================================
    // 재검증 전략
    // ========================================

    // 1️⃣ 특정 경로가 지정된 경우
    if (path) {
      console.log(`🎯 [Revalidate] 경로 재검증: ${path}`);
      revalidatePath(path);
      
      return NextResponse.json({
        revalidated: true,
        path,
        now: Date.now(),
      });
    }

    // 2️⃣ 타입별 태그 재검증
    if (type === 'post' || type === 'page') {
      console.log(`🏷️ [Revalidate] 태그 재검증: wordpress`);
      revalidateTag('wordpress');
      
      return NextResponse.json({
        revalidated: true,
        tag: 'wordpress',
        now: Date.now(),
      });
    }

    // 3️⃣ 기본: 전체 캐시 갱신
    console.log('🌐 [Revalidate] 전체 태그 재검증');
    revalidateTag('wordpress');

    return NextResponse.json({
      revalidated: true,
      type: 'all',
      now: Date.now(),
    });
  } catch (error) {
    console.error('💥 [Revalidate] 에러:', error);
    
    return NextResponse.json(
      {
        message: 'Error revalidating',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// GET 요청 처리 (테스트용)
export async function GET(request: NextRequest) {
  return NextResponse.json(
    {
      message: 'Revalidation endpoint is working. Use POST method with secret token.',
      usage: `POST ${request.nextUrl.origin}/api/revalidate?secret=YOUR_SECRET`,
    },
    { status: 200 }
  );
}

