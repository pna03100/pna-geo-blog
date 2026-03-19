/**
 * [SEO] RSS Feed Generator
 * [Purpose] Provide RSS feed for blog subscribers
 * [URL] https://pnamarketing.co.kr/feed.xml
 */

import { getAllPosts } from '@/lib/api';
import { NextResponse } from 'next/server';
import { stripHtmlTags, decodeHTMLEntities } from '@/lib/sanitize';

// [Performance] Revalidate every 30 minutes
export const revalidate = 1800;

export async function GET() {
  try {
    const posts = await getAllPosts();
    const baseUrl = 'https://pnamarketing.co.kr';

    // Helper function to safely wrap content in CDATA and escape any internal ]]> sequences
    const wrapCDATA = (content: string): string => {
      // Escape any existing ]]> in the content by splitting it
      const safeContent = content.replace(/]]>/g, ']]]]><![CDATA[>');
      return `<![CDATA[${safeContent}]]>`;
    };

    // Generate RSS 2.0 XML
    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${wrapCDATA('피앤에이컴퍼니 - 마케팅 인사이트')}</title>
    <link>${baseUrl}/insights</link>
    <description>${wrapCDATA('Google Ads, SEO, GEO 최적화에 대한 전문가의 인사이트와 최신 마케팅 트렌드')}</description>
    <language>ko</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${posts
      .map((post) => {
        // 공용 함수로 HTML 태그 제거 + 엔티티 디코딩
        const description = decodeHTMLEntities(stripHtmlTags(post.excerpt || post.title || '')).trim();

        const pubDate = post.date ? new Date(post.date).toUTCString() : new Date().toUTCString();
        const postUrl = `${baseUrl}/insights/${post.slug}`;

        return `
    <item>
      <title>${wrapCDATA(post.title || 'Untitled')}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description>${wrapCDATA(description)}</description>
      <pubDate>${pubDate}</pubDate>
      ${post.categories?.nodes?.map((cat) => `<category>${wrapCDATA(cat.name)}</category>`).join('\n      ') || ''}
      ${post.content ? `<content:encoded>${wrapCDATA(post.content)}</content:encoded>` : ''}
      ${post.author?.node?.name ? `<author>${wrapCDATA(post.author.node.name)}</author>` : ''}
    </item>`;
      })
      .join('\n')}
  </channel>
</rss>`;

    return new NextResponse(rss, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
      },
    });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('RSS Feed Generation Error:', error);
    }
    
    // Return empty feed on error
    const errorFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>피앤에이컴퍼니</title>
    <link>https://pnamarketing.co.kr</link>
    <description>Feed temporarily unavailable</description>
  </channel>
</rss>`;

    return new NextResponse(errorFeed, {
      status: 500,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
      },
    });
  }
}
