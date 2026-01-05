// ============================================
// [Security] Environment Variables Validation
// OWASP A05 (Security Misconfiguration) Defense
// Trinity Core: Fail Fast, Never Trust Env Vars
// ============================================

import { z } from 'zod';

// 환경변수 스키마 정의
const envSchema = z.object({
  // WordPress GraphQL API URL (필수)
  WORDPRESS_API_URL: z
    .string()
    .url('WORDPRESS_API_URL must be a valid URL')
    .min(1, 'WORDPRESS_API_URL is required'),

  // WordPress 프론트엔드 URL (선택, 기본값 제공)
  NEXT_PUBLIC_WORDPRESS_URL: z
    .string()
    .url('NEXT_PUBLIC_WORDPRESS_URL must be a valid URL')
    .default('https://cms.pnamarketing.co.kr'),

  // Node Environment
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
});

// 환경변수 검증 함수
function validateEnv() {
  try {
    const parsed = envSchema.parse({
      WORDPRESS_API_URL: process.env.WORDPRESS_API_URL,
      NEXT_PUBLIC_WORDPRESS_URL: process.env.NEXT_PUBLIC_WORDPRESS_URL,
      NODE_ENV: process.env.NODE_ENV,
    });

    return parsed;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ [Security] Environment Variables Validation Failed:');
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      
      error.errors.forEach((err) => {
        console.error(`  • ${err.path.join('.')}: ${err.message}`);
      });
      
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.error('');
      console.error('🔧 Fix: Create a .env.local file with:');
      console.error('');
      console.error('  WORDPRESS_API_URL=https://cms.pnamarketing.co.kr/graphql');
      console.error('  NEXT_PUBLIC_WORDPRESS_URL=https://cms.pnamarketing.co.kr');
      console.error('');
      
      // [Security] Fail Fast - 환경변수 없으면 앱 시작 안 함
      throw new Error('Invalid environment variables. Check console for details.');
    }
    
    throw error;
  }
}

// 검증된 환경변수 Export (타입 안전)
export const env = validateEnv();

// TypeScript 타입 추론
export type Env = z.infer<typeof envSchema>;

