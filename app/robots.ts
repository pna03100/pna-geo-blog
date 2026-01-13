/**
 * [SEO] Robots.txt Configuration
 * [Purpose] Allow search engine crawling
 */

import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: 'https://pnamarketing.co.kr/sitemap.xml',
  };
}
