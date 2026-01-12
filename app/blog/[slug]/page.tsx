/**
 * [GEO] 블로그 상세 페이지 - Featured Snippet 최적화
 * [Security] Server Component + Zod Validation + XSS Defense
 * [Design] Premium 2-Column Layout with Sidebar
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
import { ReadingProgress } from '@/components/blog/ReadingProgress';
import { FloatingActions } from '@/components/blog/FloatingActions';
import { PopularPosts } from '@/components/blog/PopularPosts';
import { CTACard } from '@/components/blog/CTACard';
import { RelatedPosts } from '@/components/blog/RelatedPosts';
import { Calendar, User, Clock, FileText } from 'lucide-react';

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
  const post = await getContentByURI(`/${slug}/`);

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
  const post = await getContentByURI(`/${slug}/`);

  // [Security] 404 Handling
  if (!post) {
    notFound();
  }

  // Fetch all posts for related/popular sections
  const allPosts = await getAllPosts();

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

  // Calculate reading time (rough estimate: 200 words per minute in Korean)
  const wordCount = content.replace(/<[^>]*>/g, '').length;
  const readingTime = Math.ceil(wordCount / 400); // Approximate for Korean

  return (
    <>
      {/* Reading Progress Bar */}
      <ReadingProgress />

      {/* Floating Actions */}
      <FloatingActions />

      <div className="min-h-screen bg-slate-50 pt-[73px]">
        <article className="container mx-auto px-4 pt-8 pb-16 max-w-7xl">
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

          {/* 2-Column Layout: Main Content + Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content (Left Column) */}
            <div className="lg:col-span-8">
              {/* Article Header */}
              <header className="mb-8 bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                {/* Categories */}
                {categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {categories.map((category) => (
                      <Badge 
                        key={category.slug} 
                        className="bg-blue-50 text-blue-600 hover:bg-blue-100 border-0"
                      >
                        {category.name}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-slate-900 mb-6">
                  {title}
                </h1>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600">
                  {/* Author */}
                  {author && (
                    <div className="flex items-center gap-2">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={author.avatar?.url} alt={author.name} />
                        <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                          {author.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-slate-900">{author.name}</p>
                        <p className="text-xs text-slate-500">마케팅 전문가</p>
                      </div>
                    </div>
                  )}

                  <Separator orientation="vertical" className="h-10" />

                  {/* Date */}
                  {date && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span>{date}</span>
                    </div>
                  )}

                  {/* Reading Time */}
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>{readingTime}분 읽기</span>
                  </div>
                </div>
              </header>

              {/* Featured Image */}
              <figure className="mb-8 rounded-2xl overflow-hidden shadow-sm">
                <div className="relative aspect-video bg-gradient-to-br from-slate-100 to-slate-200">
                  {featuredImageUrl ? (
                    <Image
                      src={featuredImageUrl}
                      alt={post.featuredImage?.node?.altText || title}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 1024px) 100vw, 66vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FileText className="w-24 h-24 text-slate-400" strokeWidth={1.5} />
                    </div>
                  )}
                </div>
                {post.featuredImage?.node?.altText && (
                  <figcaption className="text-sm text-slate-500 text-center mt-3 px-4">
                    {post.featuredImage.node.altText}
                  </figcaption>
                )}
              </figure>

              {/* Article Content */}
              <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-200">
                <section 
                  className="prose prose-slate prose-lg max-w-none
                    prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900
                    prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-slate-200
                    prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                    prose-h4:text-xl prose-h4:mt-6 prose-h4:mb-3
                    prose-p:leading-relaxed prose-p:text-slate-700 prose-p:mb-6
                    prose-a:text-blue-600 prose-a:no-underline prose-a:font-medium hover:prose-a:underline hover:prose-a:text-blue-700
                    prose-strong:text-slate-900 prose-strong:font-bold
                    prose-ul:my-6 prose-ol:my-6
                    prose-li:text-slate-700 prose-li:my-2
                    prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8
                    prose-blockquote:border-l-4 prose-blockquote:border-blue-600 prose-blockquote:bg-blue-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:my-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
                    prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:font-mono prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
                    prose-pre:bg-slate-900 prose-pre:text-slate-50 prose-pre:rounded-xl prose-pre:my-6 prose-pre:shadow-lg
                    prose-table:my-8
                    prose-th:bg-slate-100 prose-th:text-slate-900 prose-th:font-bold
                    prose-td:text-slate-700"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </div>

              {/* Related Posts */}
              <RelatedPosts posts={allPosts} currentPostId={post.databaseId} />
            </div>

            {/* Sidebar (Right Column) */}
            <aside className="lg:col-span-4">
              <div className="sticky top-[97px] space-y-6">
                {/* CTA Card */}
                <CTACard />

                {/* Popular Posts */}
                <PopularPosts posts={allPosts} currentPostId={post.databaseId} />
              </div>
            </aside>
          </div>

          {/* [GEO] JSON-LD Schema (if available from RankMath) */}
          {post.seo?.schema?.raw && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: post.seo.schema.raw }}
            />
          )}
        </article>
      </div>
    </>
  );
}
