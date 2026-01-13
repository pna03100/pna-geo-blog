/**
 * [GEO] 블로그 상세 페이지 - Featured Snippet 최적화
 * [Security] Server Component + Zod Validation + XSS Defense
 * [Design] Premium 2-Column Layout with Sidebar
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getContentByURI, getAllPosts } from '@/lib/api';
import { WPContent } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { BlueprintBackground } from '@/components/ui/blueprint-background';
import { StructuredData } from '@/components/seo/StructuredData';
import { sanitizeWordPressHTML, stripHtmlTags, truncateText } from '@/lib/sanitize';
import { ReadingProgress } from '@/components/blog/ReadingProgress';
import { FloatingActions } from '@/components/blog/FloatingActions';
import { PopularPosts } from '@/components/blog/PopularPosts';
import { CTACard } from '@/components/blog/CTACard';
import { RelatedPosts } from '@/components/blog/RelatedPosts';
import { Calendar, User, Clock, FileText, ChevronLeft, ChevronRight } from 'lucide-react';

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

  // Find previous and next posts
  const currentIndex = allPosts.findIndex(p => p.databaseId === post.databaseId);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return (
    <>
      {/* Reading Progress Bar */}
      <ReadingProgress />

      {/* Floating Actions */}
      <FloatingActions />

      {/* Background */}
      <BlueprintBackground />

      <div className="min-h-screen relative pt-[73px]">
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
              {/* Article Header with Background Image */}
              <header className="mb-8 relative rounded-2xl p-8 shadow-sm border border-slate-200 overflow-hidden min-h-[359px] flex items-center">
                {/* Background Image (은은하게) */}
                {featuredImageUrl && (
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={featuredImageUrl}
                      alt=""
                      fill
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
                        <span>{date}</span>
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

              {/* Featured Image - 제거 (헤더 배경으로 사용) */}

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
              <nav className="my-12 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Previous Post */}
                {prevPost ? (
                  <Link
                    href={`/blog/${prevPost.slug}`}
                    className="group flex items-center gap-4 p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
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
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="text-sm text-slate-400 text-center">이전 글이 없습니다</div>
                  </div>
                )}

                {/* Next Post */}
                {nextPost ? (
                  <Link
                    href={`/blog/${nextPost.slug}`}
                    className="group flex items-center gap-4 p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
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
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="text-sm text-slate-400 text-center">다음 글이 없습니다</div>
                  </div>
                )}
              </nav>

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
