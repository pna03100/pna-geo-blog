/** @type {import('next').NextConfig} */
const nextConfig = {
  // ============================================
  // [CRITICAL] Build Configuration
  // ============================================
  // ⚠️ WARNING: ignoreBuildErrors는 개발 편의를 위한 설정입니다.
  // 프로덕션 배포 전에는 반드시 false로 변경하여 모든 타입 오류를 수정하세요.
  // 런타임 에러를 방지하기 위해 배포 전 체크리스트:
  // 1. typescript.ignoreBuildErrors = false
  // 2. eslint.ignoreDuringBuilds = false
  // 3. npm run build 성공 확인
  // ============================================
  typescript: {
    ignoreBuildErrors: true, // TODO: 프로덕션 배포 전 false로 변경
  },
  eslint: {
    ignoreDuringBuilds: true, // TODO: 프로덕션 배포 전 false로 변경
  },

  // 2. 이미지 도메인 허용 (워드프레스 이미지 로드)
  images: {
    remotePatterns: [
      // [Production Fix] WordPress CMS 도메인 명시적 허용
      {
        protocol: 'https',
        hostname: 'cms.pnamarketing.co.kr',
        pathname: '/**', // 모든 경로 허용
      },
      // [Security] SVG/Placeholder 지원
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
      // [Fallback] 기타 CDN (필요시 추가)
      {
        protocol: 'https',
        hostname: '*.cloudfront.net',
        pathname: '/**',
      },
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // [Performance] 이미지 최적화 설정
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // 3. 타임아웃 방지
  staticPageGenerationTimeout: 180,

  // 4. 리라이트 설정 (SEO 파일 및 WP 리소스 프록시)
  async rewrites() {
    const WP_URL = 'https://cms.pnamarketing.co.kr';
    return {
      beforeFiles: [
        // SEO 파일
        { source: '/robots.txt', destination: `${WP_URL}/robots.txt` },
        { source: '/sitemap_index.xml', destination: `${WP_URL}/sitemap_index.xml` },
        { source: '/sitemap.xml', destination: `${WP_URL}/sitemap.xml` },
        { source: '/:path*-sitemap.xml', destination: `${WP_URL}/:path*-sitemap.xml` },
        // WP 리소스
        { source: '/wp-content/:path*', destination: `${WP_URL}/wp-content/:path*` },
        { source: '/wp-includes/:path*', destination: `${WP_URL}/wp-includes/:path*` },
        { source: '/wp-json/:path*', destination: `${WP_URL}/wp-json/:path*` },
      ],
    };
  },

  // 5. 리다이렉트 설정 (/blog/ → /insights/)
  async redirects() {
    return [
      {
        source: '/blog/:slug*',
        destination: '/insights/:slug*',
        permanent: true, // 301 Permanent Redirect (SEO-friendly)
      },
    ];
  },
};

module.exports = nextConfig;