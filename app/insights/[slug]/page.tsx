// ============================================
// [Trinity] Insights Post Detail Page
// [GEO] Full SEO Integration with WordPress
// [Security] CMS URL Hidden + Type-Safe
// ============================================

import { getContentByURI, getAllPosts } from '@/lib/api';
import { replaceCmsUrl } from '@/lib/utils';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import SimplePostRenderer from '@/components/SimplePostRenderer';

// [Performance] ISR 설정
export const revalidate = 3600; // 1시간마다 재검증

// ============================================
// [Build] Generate Static Params
// 빌드 시 모든 Post 경로를 미리 생성
// ============================================
export async function generateStaticParams() {
  try {
    const posts = await getAllPosts();

    if (!posts || posts.length === 0) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('⚠️ [Insights] No posts found for static generation');
      }
      return [];
    }

    // URI에서 slug만 추출 (예: /insights/my-post → my-post)
    const params = posts
      .filter((post) => post.uri && post.uri.startsWith('/insights/'))
      .map((post) => ({
        slug: post.uri.replace('/insights/', '').replace(/^\/|\/$/g, ''),
      }))
      .filter((param) => param.slug); // 빈 slug 제거

    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ [Insights] Generated ${params.length} static params`);
    }
    return params;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('❌ [Insights] generateStaticParams failed:', error);
    }
    return [];
  }
}

// ============================================
// [GEO] Generate Metadata (SEO)
// WordPress SEO 플러그인(RankMath/Yoast) 데이터 활용
// ============================================
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const uri = `/insights/${params.slug}`;

  try {
    const post = await getContentByURI(uri);

    if (!post || post.__typename !== 'Post') {
      return {
        title: '게시글을 찾을 수 없습니다',
        description: '요청하신 게시글이 존재하지 않습니다.',
      };
    }

    const seo = post.seo;

    // [Security] CMS URL 제거
    const cleanTitle = replaceCmsUrl(seo?.title || post.title || '제목 없음');
    const cleanDescription = replaceCmsUrl(seo?.metaDesc || post.excerpt || '');
    const cleanCanonical = replaceCmsUrl(seo?.canonical || `https://pnamarketing.co.kr${uri}`);
    const cleanOgImage = replaceCmsUrl(
      seo?.opengraphImage?.sourceUrl || 
      post.featuredImage?.node?.sourceUrl || 
      'https://pnamarketing.co.kr/og-default.jpg'
    );

    return {
      // [GEO] Title (자동으로 Template 적용: "제목 | 피앤에이컴퍼니")
      title: cleanTitle,

      // [GEO] Description
      description: cleanDescription,

      // [GEO] Canonical URL (중복 콘텐츠 방지)
      alternates: {
        canonical: cleanCanonical,
      },

      // [GEO] Open Graph (소셜 미디어)
      openGraph: {
        title: replaceCmsUrl(seo?.opengraphTitle || cleanTitle),
        description: replaceCmsUrl(seo?.opengraphDescription || cleanDescription),
        type: 'article',
        url: cleanCanonical,
        images: [
          {
            url: cleanOgImage,
            width: 1200,
            height: 630,
            alt: cleanTitle,
          },
        ],
        publishedTime: post.date,
        authors: post.author?.node?.name ? [post.author.node.name] : undefined,
      },

      // [GEO] Twitter Card
      twitter: {
        card: 'summary_large_image',
        title: cleanTitle,
        description: cleanDescription,
        images: [cleanOgImage],
      },

      // [GEO] Robots Meta
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
    };
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('❌ [Insights] generateMetadata failed:', error);
    }
    return {
      title: '에러 발생',
      description: '메타데이터를 불러올 수 없습니다.',
    };
  }
}

// ============================================
// [Trinity] Page Component (Async Server Component)
// ============================================
export default async function InsightPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const uri = `/insights/${params.slug}`;

  if (process.env.NODE_ENV === 'development') {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📝 [Insights] Loading Post:', uri);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  }

  let post;

  try {
    post = await getContentByURI(uri);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('❌ [Insights] Failed to load post:', error);
    }
    post = null;
  }

  // [Security] Post가 없거나 타입이 맞지 않으면 404
  if (!post || post.__typename !== 'Post') {
    if (process.env.NODE_ENV === 'development') {
      console.warn('⚠️ [Insights] Post not found or wrong type:', uri);
    }
    notFound();
  }

  // [Security] CMS URL 제거 (소스코드 보안)
  const cleanPost = {
    ...post,
    title: replaceCmsUrl(post.title),
    content: replaceCmsUrl(post.content),
    excerpt: replaceCmsUrl(post.excerpt),
    featuredImage: post.featuredImage
      ? {
          ...post.featuredImage,
          node: {
            ...post.featuredImage.node,
            sourceUrl: replaceCmsUrl(post.featuredImage.node.sourceUrl),
            altText: replaceCmsUrl(post.featuredImage.node.altText),
          },
        }
      : null,
  };

  if (process.env.NODE_ENV === 'development') {
    console.log('✅ [Insights] Post loaded successfully');
    console.log(`   - Title: ${cleanPost.title?.substring(0, 50)}...`);
    console.log(`   - Has Featured Image: ${!!cleanPost.featuredImage}`);
    console.log(`   - Categories: ${cleanPost.categories?.nodes.map((c) => c.name).join(', ')}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  }

  // [GEO] JSON-LD Schema 주입 (WordPress SEO 플러그인에서 제공)
  let schemaData = null;
  if (post.seo?.schema?.raw) {
    try {
      schemaData = JSON.parse(post.seo.schema.raw);
      // [Security] Schema 내 CMS URL도 제거
      const schemaString = replaceCmsUrl(JSON.stringify(schemaData));
      schemaData = JSON.parse(schemaString);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('⚠️ [Insights] Failed to parse schema:', error);
      }
    }
  }

  return (
    <>
      {/* [GEO] JSON-LD Schema */}
      {schemaData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      )}

      {/* [Implementation] Render Post */}
      <SimplePostRenderer post={cleanPost} />
    </>
  );
}

