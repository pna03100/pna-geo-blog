// ============================================
// Revalidation API (Webhook from WordPress)
// ============================================

// @ts-nocheck
import { revalidateTag, revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { notifyGoogleIndexing } from '@/lib/google-indexing';

export async function POST(request: NextRequest) {
  try {
    // @ts-ignore
    const body = await request.json();
    // @ts-ignore
    const { secret, path } = body;

    // 보안 검증
    // @ts-ignore
    if (secret !== process.env.WORDPRESS_REVALIDATE_SECRET) {
      if (process.env.NODE_ENV === 'development') {
        console.error('❌ 유효하지 않은 revalidation secret');
      }
      // @ts-ignore
      return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
    }

    // 특정 경로 재검증
    // @ts-ignore
    if (path) {
      // @ts-ignore
      await revalidatePath(path);
      // 목록 페이지도 함께 재검증 (신규 글이 리스트에 반영되도록)
      await revalidatePath('/insights');
      await revalidatePath('/');
      if (process.env.NODE_ENV === 'development') {
        console.log(`✅ 경로 재검증 완료: ${path}, /insights, /`);
      }

      // [AG-STANDARD 10단계] Google Indexing API 즉시 호출
      const fullUrl = `https://pnamarketing.co.kr${path}`;
      const indexResult = await notifyGoogleIndexing(fullUrl);
      if (process.env.NODE_ENV === 'development') {
        console.log('🔍 [Indexing API]', indexResult.success ? '✅ 성공' : '⚠️ 건너뜀', fullUrl);
      }

      // @ts-ignore
      return NextResponse.json({ revalidated: true, path, paths: [path, '/insights', '/'], indexed: indexResult.success });
    }

    // 전체 WordPress 캐시 재검증
    // @ts-ignore
    await revalidateTag('wordpress');
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ WordPress 전체 캐시 재검증 완료');
    }

    // @ts-ignore
    return NextResponse.json({ revalidated: true, tag: 'wordpress' });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown revalidation error';
    if (process.env.NODE_ENV === 'development') {
      console.error('💥 Revalidation 에러:', errorMessage);
    }
    // @ts-ignore
    return NextResponse.json(
      { error: 'Revalidation failed', details: errorMessage },
      { status: 500 }
    );
  }
}

export async function GET() {
  // @ts-ignore
  return NextResponse.json(
    {
      message: 'Revalidation API는 POST 요청만 허용합니다.',
      usage: 'POST /api/revalidate with { secret, path? }',
    },
    { status: 405 }
  );
}

