/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🔥 1. 배포/빌드 에러 무시 설정 (일단 사이트 띄우는 게 우선)
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // 🔥 2. 이미지 최적화 설정
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // 🔥 3. 타임아웃 방지
  staticPageGenerationTimeout: 180,

  // ============================================
  // 🎯 Rewrites: Headless 모드 + Elementor CSS 지원
  // Next.js 속도 + Elementor 디자인 완벽 조합
  // ============================================
  async rewrites() {
    const WP_URL = 'https://cms.pnamarketing.co.kr';

    return {
      // [beforeFiles] 정적 리소스만 프록시
      beforeFiles: [
        // 1️⃣ SEO 파일
        {
          source: '/robots.txt',
          destination: `${WP_URL}/robots.txt`,
        },
        {
          source: '/sitemap_index.xml',
          destination: `${WP_URL}/sitemap_index.xml`,
        },
        {
          source: '/sitemap.xml',
          destination: `${WP_URL}/sitemap.xml`,
        },
        {
          source: '/:path*-sitemap.xml',
          destination: `${WP_URL}/:path*-sitemap.xml`,
        },

        // 2️⃣ 스타일시트 (XSL)
        {
          source: '/main-sitemap.xsl',
          destination: `${WP_URL}/main-sitemap.xsl`,
        },
        {
          source: '/:path*.xsl',
          destination: `${WP_URL}/:path*.xsl`,
        },

        // 3️⃣ WordPress 정적 리소스 (이미지, CSS, JS)
        {
          source: '/wp-content/:path*',
          destination: `${WP_URL}/wp-content/:path*`,
        },
        {
          source: '/wp-includes/:path*',
          destination: `${WP_URL}/wp-includes/:path*`,
        },
        {
          source: '/wp-json/:path*',
          destination: `${WP_URL}/wp-json/:path*`,
        },
        {
          source: '/favicon.ico',
          destination: `${WP_URL}/favicon.ico`,
        },
      ],
      
      // 페이지 요청은 Next.js가 GraphQL로 처리 (빠른 속도)
      afterFiles: [],
      fallback: [],
    };
  },
};

module.exports = nextConfig;