// ============================================
// Robots.txt Generator
// ============================================

import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // @ts-ignore
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yoursite.com';

  // @ts-ignore
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    // @ts-ignore
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

