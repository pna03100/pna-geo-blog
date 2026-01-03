/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🔥 배포 성공 기원
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // 이미지 최적화
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

  staticPageGenerationTimeout: 180,

  // ============================================
  // 🎯 Rewrites: 루프 방지용 안전 설정
  // ============================================
  async rewrites() {
    // [중요] 무조건 CMS 주소여야 함. 메인 도메인 금지.
    const WP_URL = 'https://cms.pnamarketing.co.kr';

    return [
      // 1. [SEO] 사이트맵 & 로봇 (워드프레스에서 가져옴)
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
      // [스타일] 하얀 화면 방지용 XSL
      {
        source: '/main-sitemap.xsl',
        destination: `${WP_URL}/main-sitemap.xsl`,
      },
      {
        source: '/:path*.xsl',
        destination: `${WP_URL}/:path*.xsl`,
      },

      // 2. [리소스] 이미지, CSS, JS (워드프레스 폴더 통과)
      {
        source: '/wp-content/:path*',
        destination: `${WP_URL}/wp-content/:path*`,
      },
      {
        source: '/wp-includes/:path*',
        destination: `${WP_URL}/wp-includes/:path*`,
      },
      
      // 3. [데이터] API 요청 (통과)
      {
        source: '/wp-json/:path*',
        destination: `${WP_URL}/wp-json/:path*`,
      },
      
      // 4. [기타] 파비콘
      {
        source: '/favicon.ico',
        destination: `${WP_URL}/favicon.ico`,
      },

      // ❌ [삭제됨] source: '/' (메인 페이지 납치 코드 삭제) -> Next.js가 그려야 함
      // ❌ [삭제됨] source: '/:path*' (전체 납치 코드 삭제) -> 루프의 주범
    ];
  },
};

module.exports = nextConfig;