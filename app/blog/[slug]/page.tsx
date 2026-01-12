/**
 * [GEO] 블로그 상세 페이지 - Featured Snippet 최적화
 * [Security] Server Component + Zod Validation + XSS Defense
 * [Design] Semantic HTML + Typography
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getContentByURI, getAllPosts } from '@/lib/api';
import { WPContent } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { StructuredData } from '@/components/seo/StructuredData';
import { sanitizeWordPressHTML, stripHtmlTags, truncateText } from '@/lib/sanitize';

// ============================================
// [Security] Interface for Page Props
// ============================================
interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// ============================================
// [GEO] Static Site Generation (SSG)
// ============================================
export async function generateStaticParams() {
  const posts = await getAllPosts();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// ============================================
// [GEO] Dynamic Metadata
// ============================================
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getContentByURI(`/${slug}`);

  if (!post) {
    return {
      title: '포스트를 찾을 수 없습니다',
    };
  }

  // [GEO] SEO Data from RankMath/Yoast
  const seoTitle = post.seo?.title || post.title || '제목 없음';
  const rawDescription = post.seo?.metaDesc || post.excerpt || '';
  const seoDescription = truncateText(stripHtmlTags(rawDescription), 160);
  const ogImage = post.seo?.opengraphImage?.sourceUrl || 
                  post.featuredImage?.node?.sourceUrl;

  return {
    title: seoTitle,
    description: seoDescription,
    openGraph: {
      title: post.seo?.opengraphTitle || seoTitle,
      description: post.seo?.opengraphDescription || seoDescription,
      type: 'article',
      publishedTime: post.date,
      images: ogImage ? [ogImage] : [],
    },
    // [GEO] Canonical URL
    alternates: {
      canonical: post.seo?.canonical || `./`,
    },
  };
}

// ============================================
// [Implementation] Blog Post Page
// ============================================
export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  
  // [Security] Type-Safe Data Fetching with Validation
  const post = await getContentByURI(`/${slug}`);

  // [Security] 404 Handling
  if (!post) {
    notFound();
  }

  // [Security] Safe Fallbacks
  const title = post.title || '제목 없음';
  const rawContent = post.content || '<p>내용이 없습니다.</p>';
  const content = sanitizeWordPressHTML(rawContent);
  const categories = post.categories?.nodes || [];
  const author = post.author?.node;
  const featuredImageUrl = post.featuredImage?.node?.sourceUrl || null;
  const date = post.date ? new Date(post.date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) : '';
  const isoDate = post.date || new Date().toISOString();

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      {/* [GEO] JSON-LD Schema for Article */}
      <StructuredData
        schema={{
          type: 'Article',
          headline: title,
          description: stripHtmlTags(post.excerpt || ''),
          author: author?.name,
          datePublished: isoDate,
          dateModified: isoDate,
          image: featuredImageUrl || undefined,
        }}
      />

      {/* [GEO] Article Header */}
      <header className="mb-8 space-y-6">
        {/* [GEO] Categories */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge key={category.slug} variant="secondary">
                {category.name}
              </Badge>
            ))}
          </div>
        )}

        {/* [GEO] Semantic Title (H1) */}
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
          {title}
        </h1>

        {/* [GEO] Author & Date */}
        <div className="flex items-center gap-4 text-muted-foreground">
          {author && (
            <div className="flex items-center gap-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src={author.avatar?.url} alt={author.name} />
                <AvatarFallback>{author.name[0]}</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-medium text-foreground">{author.name}</p>
                {date && <p className="text-xs">{date}</p>}
              </div>
            </div>
          )}
        </div>

        <Separator />
      </header>

      {/* [GEO] Featured Image with CLS Defense */}
      {featuredImageUrl && (
        <figure className="mb-8">
          <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
            <Image
              src={featuredImageUrl}
              alt={post.featuredImage?.node?.altText || title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
          {post.featuredImage?.node?.altText && (
            <figcaption className="text-sm text-muted-foreground text-center mt-2">
              {post.featuredImage.node.altText}
            </figcaption>
          )}
        </figure>
      )}

      {/* [GEO] Article Content with Typography */}
      <section 
        className="prose prose-slate prose-lg max-w-none
          prose-headings:font-bold prose-headings:tracking-tight
          prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
          prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
          prose-p:leading-relaxed prose-p:mb-4
          prose-a:text-primary prose-a:no-underline hover:prose-a:underline
          prose-img:rounded-lg prose-img:shadow-md
          prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded
          prose-pre:bg-slate-900 prose-pre:text-slate-50"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {/* [GEO] JSON-LD Schema (if available from RankMath) */}
      {post.seo?.schema?.raw && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: post.seo.schema.raw }}
        />
      )}
    </article>
  );
}
