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

  // [Performance] 실험적 최적화
  experimental: {
    // CSS를 HTML에 인라인 → 렌더링 차단 외부 CSS 제거
    inlineCss: true,
    // 패키지 트리쉐이킹 강화
    optimizePackageImports: ['lucide-react', 'zod'],
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
    minimumCacheTTL: 2592000, // 30일 — CDN 캐시 히트율 극대화
    deviceSizes: [640, 828, 1200, 1920], // variant 축소 → 캐시 히트율 증가
    imageSizes: [16, 32, 64, 128, 256],
    // [Hero Images] 로딩 최적화
    unoptimized: false,
    loader: 'default',
  },

  // 3. 타임아웃 방지
  staticPageGenerationTimeout: 180,

  // 4. 보안 헤더 (AG-STANDARD 2단계)
  // ============================================
  // [Security] HTTP 보안 헤더 설정
  // 구글 품질 신호 강화 + OWASP 보안 기준 충족
  // ============================================
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      // [Performance] 해시된 정적 에셋 — 1년 캐시 (immutable)
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // [Performance] 정적 이미지 — 1일 + SWR 7일
      {
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
        ],
      },
      {
        source: '/logo.png',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
        ],
      },
      // [Performance] OG 이미지 — 1시간 + SWR 1일
      {
        source: '/opengraph-image.png',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=3600, stale-while-revalidate=86400' },
        ],
      },
    ];
  },

  // 5. 리라이트 설정 (WP 리소스 프록시만)
  // ============================================
  // [CRITICAL CHANGE] SEO 파일 제거
  // [Frontend-Driven Architecture]
  // - robots.txt: app/robots.ts 사용 (프론트엔드)
  // - sitemap.xml: app/sitemap.ts 사용 (프론트엔드)
  // - WordPress 백엔드 주소 완전 숨김 (보안 강화)
  // ============================================
  async rewrites() {
    const WP_URL = 'https://cms.pnamarketing.co.kr';
    return {
      beforeFiles: [
        // WP 리소스만 프록시 (이미지, 스타일 등)
        { source: '/wp-content/:path*', destination: `${WP_URL}/wp-content/:path*` },
        { source: '/wp-includes/:path*', destination: `${WP_URL}/wp-includes/:path*` },
        { source: '/wp-json/:path*', destination: `${WP_URL}/wp-json/:path*` },
      ],
    };
  },

  // 5. 리다이렉트 설정 (단일 301, 체인 없음)
  async redirects() {
    return [
      // WordPress 카테고리 기반 URL -> /insights/ 통합
      {
        source: '/ai-marketing-geo/:slug+',
        destination: '/insights/:slug*',
        permanent: true, // 301 Permanent Redirect
      },
      // ⚠️ IMPORTANT: /google-ads 페이지는 서비스 페이지이므로 제외
      // WordPress 카테고리 글만 리다이렉트 (슬러그 필수)
      {
        source: '/google-ads/:slug+',
        destination: '/insights/:slug*',
        permanent: true, // 301 Permanent Redirect
      },
      {
        source: '/wp-seo/:slug+',
        destination: '/insights/:slug*',
        permanent: true, // 301 Permanent Redirect
      },
      {
        source: '/uncategorized/:slug+',
        destination: '/insights/:slug*',
        permanent: true, // 301 Permanent Redirect
      },
      // 기존 리다이렉트
      {
        source: '/blog/:slug*',
        destination: '/insights/:slug*',
        permanent: true, // 301 Permanent Redirect
      },
      {
        source: '/privacy-policy',
        destination: '/privacy',
        permanent: true, // 301 Permanent Redirect (단일 홉, canonical)
      },
      {
        source: '/privacy-policy/',
        destination: '/privacy',
        permanent: true, // 301 Permanent Redirect (trailing slash 대응)
      },
    ];
  },
};

module.exports = nextConfig;