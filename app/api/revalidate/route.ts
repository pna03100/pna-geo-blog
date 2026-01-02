import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

/**
 * 워드프레스 Webhook을 받아 캐시를 재검증하는 API
 * 
 * 사용법:
 * POST /api/revalidate
 * Body: { "secret": "your-secret", "path": "/blog/post-1/" }
 */
export async function POST(request: NextRequest) {
  console.log('\n🔄 Revalidate API 호출됨');

  try {
    const body = await request.json();
    console.log('요청 Body:', body);

    const { secret, path, tag } = body;

    // 보안 검증
    if (secret !== process.env.WORDPRESS_REVALIDATE_SECRET) {
      console.error('❌ 잘못된 시크릿 키');
      return NextResponse.json(
        { message: 'Invalid secret' },
        { status: 401 }
      );
    }

    // Path 재검증
    if (path) {
      console.log(`✅ Path 재검증: ${path}`);
      revalidatePath(path);
    }

    // Tag 재검증
    if (tag) {
      console.log(`✅ Tag 재검증: ${tag}`);
      revalidateTag(tag);
    }

    // 전체 재검증 (path와 tag가 없을 경우)
    if (!path && !tag) {
      console.log('✅ 전체 WordPress 태그 재검증');
      revalidateTag('wordpress');
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
    });
  } catch (error) {
    console.error('❌ Revalidate API 에러:', error);
    return NextResponse.json(
      { message: 'Error revalidating', error: String(error) },
      { status: 500 }
    );
  }
}

