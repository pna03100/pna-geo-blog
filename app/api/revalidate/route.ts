// ============================================
// Revalidation API (Webhook from WordPress)
// ============================================

import { revalidateTag, revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { notifyGoogleIndexing } from '@/lib/google-indexing';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { secret?: string; path?: string };
    const { secret, path } = body;

    // 보안 검증
    if (secret !== process.env.WORDPRESS_REVALIDATE_SECRET) {
      if (process.env.NODE_ENV === 'development') {
        console.error('❌ 유효하지 않은 revalidation secret');
      }
      return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
    }

    // 특정 경로 재검증
    if (path) {
      // Data Cache 무효화 (fetchAPI의 tags: ['wordpress'] 캐시 제거)
      await revalidateTag('wordpress');
      await revalidatePath(path);
      // 목록 페이지도 함께 재검증 (신규 글이 리스트에 반영되도록)
      await revalidatePath('/insights');
      await revalidatePath('/');
      if (process.env.NODE_ENV === 'development') {
        console.log(`✅ 경로 재검증 완료: ${path}, /insights, /`);
      }

      // [AG-STANDARD 10단계] Google Indexing API (fire-and-forget: webhook 응답 블로킹 방지)
      const fullUrl = `https://pnamarketing.co.kr${path}`;
      notifyGoogleIndexing(fullUrl).then((result) => {
        if (process.env.NODE_ENV === 'development') {
          console.log('🔍 [Indexing API]', result.success ? '✅ 성공' : '⚠️ 건너뜀', fullUrl);
        }
      });

      return NextResponse.json({ revalidated: true, path, paths: [path, '/insights', '/'] });
    }

    // 전체 WordPress 캐시 재검증
    await revalidateTag('wordpress');
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ WordPress 전체 캐시 재검증 완료');
    }

    return NextResponse.json({ revalidated: true, tag: 'wordpress' });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown revalidation error';
    if (process.env.NODE_ENV === 'development') {
      console.error('💥 Revalidation 에러:', errorMessage);
    }
    return NextResponse.json(
      { error: 'Revalidation failed', details: errorMessage },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      message: 'Revalidation API는 POST 요청만 허용합니다.',
      usage: 'POST /api/revalidate with { secret, path? }',
    },
    { status: 405 }
  );
}
