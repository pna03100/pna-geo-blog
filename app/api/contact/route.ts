/**
 * [API] Contact Form Handler
 * Sends email notifications using Nodemailer
 */

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { company, contact, email, serviceType, budget, message } = body;

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'pna0310@naver.com',
      subject: `[PNA 문의] ${company} - ${serviceType}`,
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
                <td style="padding: 8px; border-bottom: 1px solid #E2E8F0;">${company}</td>
              </tr>
              <tr>
                <td style="padding: 8px; background: #F1F5F9; font-weight: bold;">연락처</td>
                <td style="padding: 8px; border-bottom: 1px solid #E2E8F0;">${contact}</td>
              </tr>
              <tr>
                <td style="padding: 8px; background: #F1F5F9; font-weight: bold;">이메일</td>
                <td style="padding: 8px; border-bottom: 1px solid #E2E8F0;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 8px; background: #F1F5F9; font-weight: bold;">서비스 유형</td>
                <td style="padding: 8px; border-bottom: 1px solid #E2E8F0;">${serviceType}</td>
              </tr>
              <tr>
                <td style="padding: 8px; background: #F1F5F9; font-weight: bold;">예산 범위</td>
                <td style="padding: 8px; border-bottom: 1px solid #E2E8F0;">${budget}</td>
              </tr>
            </table>
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #334155; margin-bottom: 10px;">문의 내용</h3>
            <div style="background: #F8FAFC; padding: 15px; border-left: 4px solid #2563EB; white-space: pre-wrap;">
${message}
            </div>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #E2E8F0; color: #64748B; font-size: 12px;">
            <p>이 메일은 PNA Company 웹사이트 문의 폼에서 자동 발송되었습니다.</p>
            <p>접수 시간: ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}</p>
          </div>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: '문의가 성공적으로 전송되었습니다.' },
      { status: 200 }
    );
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Email send error:', error);
    }
    return NextResponse.json(
      { success: false, message: '메일 전송에 실패했습니다. 다시 시도해주세요.' },
      { status: 500 }
    );
  }
}
