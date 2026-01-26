/**
 * [Dynamic Route] Catch-All for Posts & Pages
 * [Security] Type-Safe + CMS URL Hidden
 */

import { getContentByURI, getAllPosts, getAllPages } from '@/lib/api';
import { replaceCmsUrl } from '@/lib/utils';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import { sanitizeWordPressHTML } from '@/lib/sanitize';

export const dynamicParams = true;
export const revalidate = 3600;

// ============================================
// Generate Static Params (for SSG)
// ============================================
export async function generateStaticParams() {
  try {
    const [posts, pages] = await Promise.all([getAllPosts(), getAllPages()]);

    if (!posts || !pages) {
      if (process.env.NODE_ENV === 'development') {
        console.log('⚠️ generateStaticParams: No data, returning empty array');
      }
      return [];
    }

    // 🚨 서비스 페이지 제외
    const excludedRoutes = ['google-ads', 'seo-geo', 'wordpress', 'performance', 'about', 'contact', 'insights'];
    
    const allPaths = [...posts, ...pages]
      .filter((item) => item && item.uri)
      .map((item) => ({
        slug: item.uri.split('/').filter(Boolean),
      }))
      .filter((item) => {
        if (!item.slug || item.slug.length === 0) return false;
        // 서비스 페이지 경로 제외
        return !excludedRoutes.includes(item.slug[0]);
      });

    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ generateStaticParams: ${allPaths.length} paths generated`);
    }
    return allPaths;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('❌ generateStaticParams failed:', error);
    }
    return [];
  }
}

// ============================================
// Generate Metadata (SEO)
// ============================================
export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const uri = `/${params.slug.join('/')}`;

  try {
    const content = await getContentByURI(uri);

    if (!content || !content.seo) {
      return {
        title: '페이지를 찾을 수 없습니다',
      };
    }

    const seo = content.seo;

    return {
      title: replaceCmsUrl(seo.title || content.title) || '제목 없음',
      description: replaceCmsUrl(seo.metaDesc) || '',
      openGraph: {
        title: replaceCmsUrl(seo.opengraphTitle || seo.title) || '',
        description: replaceCmsUrl(seo.opengraphDescription || seo.metaDesc) || '',
        images: seo.opengraphImage?.sourceUrl
          ? [{ url: replaceCmsUrl(seo.opengraphImage.sourceUrl) }]
          : [],
      },
      alternates: {
        canonical: replaceCmsUrl(seo.canonical) || uri,
      },
    };
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('❌ generateMetadata failed:', error);
    }
    return { title: '에러 발생' };
  }
}

// ============================================
// Page Component
// ============================================
export default async function DynamicPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const uri = `/${params.slug.join('/')}`;

  // 🚨 CRITICAL: Exclude service pages from catch-all
  const excludedRoutes = ['google-ads', 'seo-geo', 'wordpress', 'performance', 'about', 'contact', 'insights'];
  if (params.slug && params.slug.length > 0 && excludedRoutes.includes(params.slug[0])) {
    notFound();
  }

  let content;

  try {
    content = await getContentByURI(uri);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('❌ Failed to load page:', error);
    }
    content = null;
  }

  if (!content) {
    notFound();
  }

  // Clean CMS URLs
  const title = replaceCmsUrl(content.title) || '제목 없음';
  const rawContent = replaceCmsUrl(content.content) || '<p>내용이 없습니다.</p>';
  const cleanContent = sanitizeWordPressHTML(rawContent);
  const featuredImageUrl = content.featuredImage?.node?.sourceUrl 
    ? replaceCmsUrl(content.featuredImage.node.sourceUrl) 
    : null;
  const date = content.date ? new Date(content.date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) : '';

  // Render Post or Page
  return (
    <article className="container mx-auto px-4 pt-16 pb-12 max-w-4xl">
      {/* Header */}
      <header className="mb-8 space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-950 tracking-tight">
          {title}
        </h1>
        {date && (
          <p className="text-slate-600 text-sm">{date}</p>
        )}
      </header>

      {/* Featured Image */}
      {featuredImageUrl && (
        <figure className="mb-8">
          <div className="relative aspect-video bg-slate-100 rounded-xl overflow-hidden">
            <Image
              src={featuredImageUrl}
              alt={content.featuredImage?.node?.altText || title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </figure>
      )}

      {/* Content */}
      <section 
        className="prose prose-slate prose-lg max-w-none
          prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-950
          prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
          prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
          prose-p:text-slate-700 prose-p:leading-relaxed prose-p:mb-4
          prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-slate-950 prose-strong:font-bold
          prose-ul:text-slate-700 prose-ol:text-slate-700
          prose-li:text-slate-700"
        dangerouslySetInnerHTML={{ __html: cleanContent }}
      />
    </article>
  );
}

