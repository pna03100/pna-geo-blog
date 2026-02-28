/**
 * [GEO] 인사이트 상세 페이지 - Featured Snippet 최적화
 * [Security] Server Component + Zod Validation + XSS Defense
 * [Design] Premium 2-Column Layout with Sidebar (A Design)
 * [Performance] Parallel data fetching + ISR for fast loading
 */

import { Metadata } from 'next';
import '../../styles/prose.css';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getContentByURI, getAllPosts } from '@/lib/api';
import { WPContent } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { StructuredData } from '@/components/seo/StructuredData';
import { sanitizeWordPressHTML, stripHtmlTags, truncateText } from '@/lib/sanitize';
import { ReadingProgress } from '@/components/insights/ReadingProgress';
import { PopularPosts } from '@/components/insights/PopularPosts';
import { CTACard } from '@/components/insights/CTACard';
import { ArticleTLDR } from '@/components/insights/ArticleTLDR';
import { Calendar, Clock, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';

// ============================================
// [Security] Interface for Page Props
// ============================================
interface PageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    category?: string;
  }>;
}


// ============================================
// [Performance] ISR Configuration
// ============================================
export const revalidate = 3600; // 1시간마다 재생성 (ISR)
export const dynamicParams = true; // 새 slug도 동적으로 생성 허용

// ============================================
// [GEO] Static Site Generation (SSG)
// [Performance] 빌드 시점에 모든 블로그 페이지 미리 생성
// ============================================
export async function generateStaticParams() {
  try {
    const posts = await getAllPosts();

    // 모든 포스트의 slug를 반환하여 빌드 시점에 페이지 생성
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('❌ generateStaticParams failed:', error);
    return []; // 에러 시 빈 배열 반환
  }
}

// ============================================
// [GEO] Dynamic Metadata
// ============================================
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  // [Fix] Find post by slug from all posts
  const allPosts = await getAllPosts();
  const matchedPost = allPosts.find(p => p.slug === slug);

  if (!matchedPost) {
    return {
      title: '포스트를 찾을 수 없습니다',
    };
  }

  // [Performance] Fetch full content by URI
  const post = await getContentByURI(matchedPost.uri);

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
// [Implementation] Insights Post Page (A Design)
// ============================================
export default async function InsightsPostPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { category } = await searchParams;

  // [Performance] Fetch all posts first
  const allPosts = await getAllPosts();

  // [Fix] Find post by slug (works regardless of WordPress permalink structure)
  const post = allPosts.find(p => p.slug === slug);

  // [Security] 404 Handling
  if (!post) {
    notFound();
  }

  // [Performance] Fetch full content by URI for the matched post
  const fullPost = await getContentByURI(post.uri);

  if (!fullPost) {
    notFound();
  }

  // [Security] Safe Fallbacks
  const title = fullPost.title || '제목 없음';
  const rawContent = fullPost.content || '<p>내용이 없습니다.</p>';
  const content = sanitizeWordPressHTML(rawContent);
  const categories = fullPost.categories?.nodes || [];
  const author = fullPost.author?.node;
  const featuredImageUrl = fullPost.featuredImage?.node?.sourceUrl || null;
  const date = fullPost.date ? new Date(fullPost.date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) : '';
  const isoDate = fullPost.date || new Date().toISOString();

  // [GEO] TL;DR 요약 생성 (excerpt 기반)
  const tldrSummary = stripHtmlTags(fullPost.excerpt || '').trim();

  // Calculate reading time (rough estimate: 200 words per minute in Korean)
  const wordCount = content.replace(/<[^>]*>/g, '').length;
  const readingTime = Math.ceil(wordCount / 400); // Approximate for Korean

  // [Performance] Calculate prev/next posts from all posts
  const currentIndex = allPosts.findIndex(p => p.databaseId === fullPost.databaseId);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return (
    <>
      {/* Reading Progress Bar */}
      <ReadingProgress />

      <div className="min-h-screen relative pt-16">
        <article className="container mx-auto px-4 pt-8 pb-32 max-w-7xl">
          {/* [GEO] JSON-LD Schema for Article */}
          <StructuredData
            schema={{
              type: 'Article',
              headline: title,
              description: stripHtmlTags(fullPost.excerpt || ''),
              author: author?.name,
              datePublished: isoDate,
              dateModified: isoDate,
              image: featuredImageUrl || undefined,
            }}
          />

          {/* [GEO] BreadcrumbList Schema (AG-STANDARD 8단계) */}
          <StructuredData
            schema={{
              type: 'BreadcrumbList',
              items: [
                { name: '홈', url: 'https://pnamarketing.co.kr' },
                { name: '인사이트', url: 'https://pnamarketing.co.kr/insights' },
                { name: title, url: `https://pnamarketing.co.kr/insights/${slug}` },
              ],
            }}
          />

          {/* 2-Column Layout: Main Content + Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content (Left Column) */}
            <div className="lg:col-span-8">
              {/* Article Header with Background Image */}
              <header className="mb-8 relative rounded-2xl p-8 shadow-sm border border-slate-200 overflow-hidden min-h-[359px] flex items-center">
                {/* Background Image (은은하게) */}
                {featuredImageUrl && (
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={featuredImageUrl}
                      alt={`${title} - 피앤에이컴퍼니 인사이트`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
                      className="object-cover opacity-60"
                      priority
                    />
                    {/* Bright Overlay (밝은 오버레이) */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-white/80 to-white/85 backdrop-blur-sm" />
                  </div>
                )}

                {/* Content (위로 올리기) */}
                <div className="relative z-10">
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
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-6" style={{ lineHeight: '1.3' }}>
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
                        <time dateTime={isoDate}>{date}</time>
                      </div>
                    )}

                    {/* Reading Time */}
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span>{readingTime}분 읽기</span>
                    </div>
                  </div>
                </div>
              </header>

              {/* [GEO] TL;DR 요약 블록 (AG-STANDARD 7단계) */}
              <ArticleTLDR summary={tldrSummary} />

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

              {/* Previous/Next Post Navigation */}
              <nav className="mt-6 mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Previous Post */}
                {prevPost ? (
                  <Link
                    href={`/insights/${prevPost.slug}`}
                    prefetch={true}
                    className="group flex items-center gap-4 p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-200 hover:shadow-md"
                    style={{ transition: 'all 200ms cubic-bezier(0.2, 0.8, 0.2, 1)' }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                      <ChevronLeft className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-slate-500 font-semibold mb-1">이전 글</div>
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {prevPost.title}
                      </h3>
                    </div>
                  </Link>
                ) : (
                  <div className="flex items-center justify-center p-6 rounded-2xl bg-slate-50 border border-slate-100 min-h-[96px]">
                    <div className="text-sm text-slate-400 text-center">이전 글이 없습니다</div>
                  </div>
                )}

                {/* Next Post */}
                {nextPost ? (
                  <Link
                    href={`/insights/${nextPost.slug}`}
                    prefetch={true}
                    className="group flex items-center gap-4 p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-200 hover:shadow-md"
                    style={{ transition: 'all 200ms cubic-bezier(0.2, 0.8, 0.2, 1)' }}
                  >
                    <div className="flex-1 min-w-0 text-right">
                      <div className="text-xs text-slate-500 font-semibold mb-1">다음 글</div>
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {nextPost.title}
                      </h3>
                    </div>
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                      <ChevronRight className="w-6 h-6 text-blue-600" />
                    </div>
                  </Link>
                ) : (
                  <div className="flex items-center justify-center p-6 rounded-2xl bg-slate-50 border border-slate-100 min-h-[96px]">
                    <div className="text-sm text-slate-400 text-center">다음 글이 없습니다</div>
                  </div>
                )}
              </nav>

              {/* Back to List Button */}
              <div className="mt-6">
                <Link
                  href="/insights"
                  className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-2xl bg-white border-2 border-slate-300 text-slate-900 font-semibold hover:bg-slate-50 hover:border-blue-600 hover:text-blue-600 shadow-sm"
                  style={{ transition: 'all 200ms cubic-bezier(0.2, 0.8, 0.2, 1)' }}
                >
                  <ArrowLeft className="w-5 h-5" />
                  목록으로 돌아가기
                </Link>
              </div>
            </div>

            {/* Sidebar (Right Column) */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-6">
                {/* CTA Card */}
                <CTACard />

                {/* Popular Posts */}
                <PopularPosts posts={allPosts} currentPostId={fullPost.databaseId} />
              </div>
            </aside>
          </div>

          {/* [GEO] JSON-LD Schema (if available from RankMath) */}
          {fullPost.seo?.schema?.raw && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: fullPost.seo.schema.raw }}
            />
          )}
        </article>
      </div>
    </>
  );
}
