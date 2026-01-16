// ============================================
// [Security] Environment Variables Validation
// OWASP A05 (Security Misconfiguration) Defense
// Trinity Core: Fail Fast, Never Trust Env Vars
// ============================================

import { z } from 'zod';

// 환경변수 스키마 정의
const envSchema = z.object({
  // WordPress GraphQL API URL (선택 - lib/api.ts에서 자동 처리)
  // [Trinity] Server: 직접 WordPress 호출, Client: /api/graphql 프록시 사용
  WORDPRESS_API_URL: z
    .string()
    .url('WORDPRESS_API_URL must be a valid URL')
    .optional()
    .default('https://cms.pnamarketing.co.kr/graphql'),

  // WordPress 프론트엔드 URL (선택, 기본값 제공)
  NEXT_PUBLIC_WORDPRESS_URL: z
    .string()
    .url('NEXT_PUBLIC_WORDPRESS_URL must be a valid URL')
    .default('https://cms.pnamarketing.co.kr'),

  // 프론트엔드 도메인 (GEO: CMS 도메인 숨김용)
  NEXT_PUBLIC_FRONTEND_DOMAIN: z
    .string()
    .default('pnamarketing.co.kr'),

  // 공식 연락처 이메일 (Anti-scraping)
  NEXT_PUBLIC_CONTACT_EMAIL: z
    .string()
    .email('NEXT_PUBLIC_CONTACT_EMAIL must be a valid email')
    .default('pna0310@naver.com'),

  // Node Environment
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
});

// 환경변수 검증 함수
function validateEnv() {
  try {
    // [Trinity] lib/api.ts에서 Server/Client 자동 분기 처리
    // 환경변수는 선택사항이며 기본값으로 fallback
    const parsed = envSchema.parse({
      WORDPRESS_API_URL: process.env.WORDPRESS_API_URL || 
                         process.env.NEXT_PUBLIC_WORDPRESS_API_URL,
      NEXT_PUBLIC_WORDPRESS_URL: process.env.NEXT_PUBLIC_WORDPRESS_URL,
      NEXT_PUBLIC_FRONTEND_DOMAIN: process.env.NEXT_PUBLIC_FRONTEND_DOMAIN,
      NEXT_PUBLIC_CONTACT_EMAIL: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
      NODE_ENV: process.env.NODE_ENV,
    });

    console.log('✅ [Env Validated]');
    console.log('  - WordPress URL:', parsed.WORDPRESS_API_URL);
    console.log('  - Frontend Domain:', parsed.NEXT_PUBLIC_FRONTEND_DOMAIN);
    console.log('  - Contact Email:', parsed.NEXT_PUBLIC_CONTACT_EMAIL);
    return parsed;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('\n❌ [Security] Environment Variables Validation Failed:');
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      
      // [Security] 안전한 에러 출력
      error.errors.forEach((err) => {
        const path = err.path.join('.');
        console.error(`  • ${path}: ${err.message}`);
      });
      
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.error('\n💡 Note: Environment variables are optional.');
      console.error('   lib/api.ts automatically handles Server/Client routing.\n');
      
      // [Security] Fallback to defaults
      console.warn('⚠️  Using default values\n');
      return {
        WORDPRESS_API_URL: 'https://cms.pnamarketing.co.kr/graphql',
        NEXT_PUBLIC_WORDPRESS_URL: 'https://cms.pnamarketing.co.kr',
        NEXT_PUBLIC_FRONTEND_DOMAIN: 'pnamarketing.co.kr',
        NEXT_PUBLIC_CONTACT_EMAIL: 'pna0310@naver.com',
        NODE_ENV: (process.env.NODE_ENV as 'development' | 'production' | 'test') || 'development',
      };
    }
    
    console.error('❌ Unexpected error during environment validation:', error);
    throw error;
  }
}

// 검증된 환경변수 Export (타입 안전)
export const env = validateEnv();

// TypeScript 타입 추론
export type Env = z.infer<typeof envSchema>;

