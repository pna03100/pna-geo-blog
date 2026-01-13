/**
 * [Dynamic Route] Catch-All for Posts & Pages
 * [Security] Type-Safe + CMS URL Hidden
 */

import { getContentByURI, getAllPosts, getAllPages } from '@/lib/api';
import { replaceCmsUrl } from '@/lib/utils';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import SimplePostRenderer from '@/components/SimplePostRenderer';

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

    const allPaths = [...posts, ...pages]
      .filter((item) => item && item.uri)
      .map((item) => ({
        slug: item.uri.split('/').filter(Boolean),
      }))
      .filter((item) => item.slug && item.slug.length > 0);

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
  const cleanContent = {
    ...content,
    content: replaceCmsUrl(content.content),
    title: replaceCmsUrl(content.title),
    excerpt: replaceCmsUrl(content.excerpt),
  };

  // Render Post or Page
  return <SimplePostRenderer post={cleanContent} />;
}

