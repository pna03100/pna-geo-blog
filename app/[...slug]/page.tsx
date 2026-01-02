import { getContentByUri } from '@/lib/api';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import parse, { Element } from 'html-react-parser';
import { Metadata } from 'next';

// 1. 메타데이터 생성 (SEO)
export async function generateMetadata({ params }: { params: { slug: string[] } }): Promise<Metadata> {
  const uri = `/${params.slug.join('/')}/`;
  const data = await getContentByUri(uri);

  if (!data) {
    return {
      title: '페이지를 찾을 수 없음',
    };
  }

  // ★ 수정됨: metaDesc가 없으므로 기본 설명이나 빈 값으로 처리
  return {
    title: data.seo?.title || data.title,
    description: '', // 에러 방지를 위해 일단 비워둠
  };
}

// 2. 메인 페이지 컴포넌트
export default async function DynamicPage({ params }: { params: { slug: string[] } }) {
  const uri = `/${params.slug.join('/')}/`;
  const data = await getContentByUri(uri);

  if (!data) {
    console.log(`❌ 데이터를 찾을 수 없음 (404 처리): ${uri}`);
    notFound();
  }

  // A. 디자인 페이지 (Elementor 등)
  if (data.__typename === 'Page') {
    return (
      <main className="elementor-page">
        {parse(data.content || '')}
      </main>
    );
  }

  // B. 블로그 글 (GEO 최적화)
  const replaceMedia = (domNode: any) => {
    if (domNode instanceof Element && domNode.name === 'img') {
      const { src, alt, width, height } = domNode.attribs;
      if (src) {
        return (
          <Image
            src={src}
            alt={alt || 'Blog Image'}
            width={parseInt(width || '800')}
            height={parseInt(height || '600')}
            className="w-full h-auto rounded-lg my-4"
            sizes="(max-width: 768px) 100vw, 800px"
          />
        );
      }
    }
  };

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <header className="mb-8 text-center">
        {data.categories?.nodes[0]?.name && (
          <span className="text-blue-600 font-bold text-sm tracking-wide uppercase">
            {data.categories.nodes[0].name}
          </span>
        )}
        <h1 className="text-4xl font-extrabold text-gray-900 mt-2 mb-4 leading-tight">
          {data.title}
        </h1>
        <div className="flex items-center justify-center text-gray-500 text-sm space-x-4">
          <time dateTime={data.date}>
            {new Date(data.date).toLocaleDateString('ko-KR')}
          </time>
          {data.author?.node?.name && (
            <span>by {data.author.node.name}</span>
          )}
        </div>
      </header>

      {data.featuredImage?.node?.sourceUrl && (
        <div className="relative w-full h-[400px] mb-10 rounded-xl overflow-hidden shadow-lg">
          <Image
            src={data.featuredImage.node.sourceUrl}
            alt={data.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-img:rounded-xl">
        {parse(data.content || '', { replace: replaceMedia })}
      </div>
    </article>
  );
}