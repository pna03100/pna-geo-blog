/**
 * [API] Contact Form Handler - Hardened Security
 * [Security] Rate Limit + Honeypot + Turnstile + Validation
 * [OWASP] A03 (Injection), A04 (Insecure Design), A05 (Security Misconfiguration)
 */

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

// [Security] HTML 이스케이프 — 이메일 HTML 인젝션 방지
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ============================================
// [Security] Rate Limiting (In-Memory Store)
// Best-effort: 서버리스 환경에서는 warm instance 내에서만 유효
// ============================================
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();
let lastCleanup = Date.now();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();

  // 인라인 정리: 5분마다 만료된 항목 제거 (setInterval 대체)
  if (now - lastCleanup > 300000) {
    lastCleanup = now;
    for (const [key, data] of rateLimitStore.entries()) {
      if (now > data.resetAt) rateLimitStore.delete(key);
    }
  }

  const limit = rateLimitStore.get(ip);

  if (!limit || now > limit.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + 60000 }); // 1 minute
    return true;
  }

  if (limit.count >= 3) {
    return false;
  }

  limit.count++;
  return true;
}

// ============================================
// [Security] Zod Validation Schema
// ============================================
const contactSchema = z.object({
  company: z.string()
    .min(2, '회사명/성함을 입력해주세요 (최소 2자)')
    .max(100, '회사명은 100자를 초과할 수 없습니다')
    .regex(/^[가-힣a-zA-Z0-9\s\-_.()]+$/, '특수문자는 사용할 수 없습니다'),
  
  contact: z.string()
    .min(10, '연락처를 정확히 입력해주세요')
    .max(20, '연락처 형식이 올바르지 않습니다')
    .regex(/^[0-9\-+() ]+$/, '올바른 연락처 형식이 아닙니다'),
  
  email: z.string()
    .email('올바른 이메일 주소를 입력해주세요')
    .max(100, '이메일은 100자를 초과할 수 없습니다')
    .toLowerCase(),
  
  serviceType: z.enum([
    'google-ads',
    'seo',
    'wordpress',
    'performance',
    'sns',
    'etc'
  ]),
  
  budget: z.enum([
    'under-300',
    '300-500',
    '500-1000',
    'over-1000',
    'undecided'
  ]),
  
  message: z.string()
    .min(10, '문의 내용을 10자 이상 입력해주세요')
    .max(2000, '문의 내용은 2000자를 초과할 수 없습니다'),
  
  privacy: z.boolean()
    .refine((val) => val === true, '개인정보 처리방침에 동의해주세요'),
  
  // Honeypot
  website: z.string().max(0).optional(),
  
  // Turnstile Token (Optional - if configured)
  turnstileToken: z.string().optional(),
});

// ============================================
// [Security] Cloudflare Turnstile Verification
// ============================================
async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  
  if (!secretKey) {
    // Turnstile not configured - skip verification
    return true;
  }

  try {
    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          secret: secretKey,
          response: token,
          remoteip: ip,
        }),
      }
    );

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('[Turnstile] Verification failed:', error);
    return false;
  }
}

// ============================================
// [API] POST Handler
// ============================================
export async function POST(request: Request) {
  try {
    // [Security] Extract IP for rate limiting
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown';

    // [Security] Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { 
          success: false, 
          message: '너무 많은 요청입니다. 잠시 후 다시 시도해주세요.' 
        },
        { status: 429 }
      );
    }

    // [Security] Parse and validate request body
    const body = await request.json();
    const validationResult = contactSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          message: '입력 정보를 확인해주세요.',
          errors: validationResult.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // [Security] Honeypot check
    if (data.website && data.website.length > 0) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`[Honeypot] Bot detected from IP: ${ip}`);
      }
      // Return success to fool bots, but don't send email
      return NextResponse.json(
        { success: true, message: '문의가 접수되었습니다.' },
        { status: 200 }
      );
    }

    // [Security] Turnstile verification (if configured)
    if (process.env.TURNSTILE_SECRET_KEY && data.turnstileToken) {
      const isTurnstileValid = await verifyTurnstile(data.turnstileToken, ip);
      if (!isTurnstileValid) {
        return NextResponse.json(
          { success: false, message: '보안 검증에 실패했습니다. 다시 시도해주세요.' },
          { status: 403 }
        );
      }
    }

    // [Email] Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // [Email] Content
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'pna0310@naver.com',
      subject: `[PNA 문의] ${escapeHtml(data.company)} - ${data.serviceType}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563EB; border-bottom: 2px solid #2563EB; padding-bottom: 10px;">
            새로운 프로젝트 문의
          </h2>

          <div style="margin: 20px 0;">
            <h3 style="color: #334155; margin-bottom: 10px;">기본 정보</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px; background: #F1F5F9; font-weight: bold; width: 120px;">회사명/성함</td>
                <td style="padding: 8px; border-bottom: 1px solid #E2E8F0;">${escapeHtml(data.company)}</td>
              </tr>
              <tr>
                <td style="padding: 8px; background: #F1F5F9; font-weight: bold;">연락처</td>
                <td style="padding: 8px; border-bottom: 1px solid #E2E8F0;">${escapeHtml(data.contact)}</td>
              </tr>
              <tr>
                <td style="padding: 8px; background: #F1F5F9; font-weight: bold;">이메일</td>
                <td style="padding: 8px; border-bottom: 1px solid #E2E8F0;">${escapeHtml(data.email)}</td>
              </tr>
              <tr>
                <td style="padding: 8px; background: #F1F5F9; font-weight: bold;">서비스 유형</td>
                <td style="padding: 8px; border-bottom: 1px solid #E2E8F0;">${escapeHtml(data.serviceType)}</td>
              </tr>
              <tr>
                <td style="padding: 8px; background: #F1F5F9; font-weight: bold;">예산 범위</td>
                <td style="padding: 8px; border-bottom: 1px solid #E2E8F0;">${escapeHtml(data.budget)}</td>
              </tr>
            </table>
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #334155; margin-bottom: 10px;">문의 내용</h3>
            <div style="background: #F8FAFC; padding: 15px; border-left: 4px solid #2563EB; white-space: pre-wrap;">
${escapeHtml(data.message)}
            </div>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #E2E8F0; color: #64748B; font-size: 12px;">
            <p>이 메일은 PNA Company 웹사이트 문의 폼에서 자동 발송되었습니다.</p>
            <p>접수 시간: ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}</p>
            <p>IP: ${escapeHtml(ip)}</p>
          </div>
        </div>
      `,
    };

    // [Email] Send
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: '문의가 성공적으로 전송되었습니다.' },
      { status: 200 }
    );
  } catch (error) {
    // [Security] Only log errors in development
    if (process.env.NODE_ENV === 'development') {
      console.error('📧 Email send error:', error);
    }
    
    return NextResponse.json(
      { success: false, message: '메일 전송에 실패했습니다. 다시 시도해주세요.' },
      { status: 500 }
    );
  }
}
