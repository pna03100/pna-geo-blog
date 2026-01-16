/**
 * [SEO] Robots.txt Configuration
 * [Purpose] Control search engine crawling and indexing
 * [Note] This does NOT provide security - use rate limiting/authentication for API protection
 */

import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',      // Prevent indexing (not security)
        '/admin/',    // Prevent indexing (not security)
      ],
    },
    sitemap: 'https://pnamarketing.co.kr/sitemap.xml',
  };
}
