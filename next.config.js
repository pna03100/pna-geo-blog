/** @type {import('next').NextConfig} */
const nextConfig = {
  // ============================================
  // [Security] Build Configuration
  // Trinity Core: Strict Type Checking Enabled
  // ============================================
  
  // ✅ TypeScript Strict Mode (에러 무시 제거)
  // Note: tsconfig.json의 strict: true와 함께 작동
  
  // ✅ ESLint 활성화 (빌드 시 코드 품질 검증)
  // Note: 필요 시 특정 룰만 비활성화

  // 🔥 이미지 최적화 설정
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

  // ============================================
  // 🔐 Security Headers: Elementor iframe 통신 허용
  // [Security] OWASP A05 (Security Misconfiguration) 준수
  // [Architecture] Deny by Default → Allow Specific Origin Only
  // ============================================
  async headers() {
    const CMS_DOMAIN = 'https://cms.pnamarketing.co.kr';

    return [
      {
        // 모든 페이지에 적용
        source: '/:path*',
        headers: [
          // 🎯 1. CSP: Iframe Embedding 허용 (Modern 브라우저)
          {
            key: 'Content-Security-Policy',
            value: `frame-ancestors 'self' ${CMS_DOMAIN};`,
          },
          // 🎯 2. CORS: CMS에서의 리소스 접근 허용
          {
            key: 'Access-Control-Allow-Origin',
            value: CMS_DOMAIN,
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-Requested-With, Content-Type, Authorization',
          },
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;