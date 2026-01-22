/**
 * [Section] Contact Form
 * [Design] Clean Tech Style - 2-Column Layout
 * [Security] Form Validation with Zod + react-hook-form
 */

"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Script from "next/script";
import { Loader2, ArrowRight } from "lucide-react";

// ============================================
// [TypeScript] Turnstile Global Declaration
// ============================================
declare global {
  interface Window {
    turnstile?: {
      render: (element: string, options: {
        sitekey: string;
        callback: (token: string) => void;
      }) => void;
      reset: () => void;
    };
  }
}

// ============================================
// [Security] Zod Schema
// ============================================
const contactSchema = z.object({
  company: z.string().min(2, "회사명/성함을 입력해주세요 (최소 2자)").max(100),
  contact: z.string().min(10, "연락처를 정확히 입력해주세요").max(20),
  email: z.string().email("올바른 이메일 주소를 입력해주세요").max(100),
  serviceType: z.string().min(1, "서비스 유형을 선택해주세요"),
  budget: z.string().min(1, "예산 범위를 선택해주세요"),
  message: z.string().min(10, "문의 내용을 10자 이상 입력해주세요").max(2000),
  privacy: z.boolean().refine((val) => val === true, {
    message: "개인정보 처리방침에 동의해주세요",
  }),
  // Honeypot (봇 탐지용 - 사람은 채우지 않음)
  website: z.string().max(0).optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

// ============================================
// [Data] Service & Budget Options
// ============================================
const serviceOptions = [
  { value: "", label: "서비스 선택" },
  { value: "google-ads", label: "구글 애즈 광고 대행" },
  { value: "seo", label: "SEO & GEO 최적화" },
  { value: "wordpress", label: "워드프레스 제작" },
  { value: "performance", label: "퍼포먼스 마케팅" },
  { value: "sns", label: "SNS 마케팅" },
  { value: "etc", label: "기타 문의" },
];

const budgetOptions = [
  { value: "", label: "예산 선택" },
  { value: "under-300", label: "300만원 미만" },
  { value: "300-500", label: "300만원 ~ 500만원" },
  { value: "500-1000", label: "500만원 ~ 1,000만원" },
  { value: "over-1000", label: "1,000만원 이상" },
  { value: "undecided", label: "미정 (상담 후 결정)" },
];

// ============================================
// [Component] Contact Section
// ============================================
export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string>('');
  const [turnstileLoaded, setTurnstileLoaded] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  // [Security] Initialize Turnstile widget
  useEffect(() => {
    if (turnstileLoaded && window.turnstile && process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) {
      window.turnstile.render('#turnstile-widget', {
        sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
        callback: (token: string) => {
          setTurnstileToken(token);
        },
      });
    }
  }, [turnstileLoaded]);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          turnstileToken, // Add Turnstile token
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Redirect to Thank You page
        window.location.href = '/thank-you';
      } else {
        alert('메일 전송에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* SECTION: #CONTACT */}
      <section data-section="CONTACT" id="contact" className="relative py-20 md:py-32">
      
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[400px,1fr] gap-12 lg:gap-16 items-start">
          
          {/* Left: Header (Sticky) */}
          <div className="lg:sticky lg:top-24">
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                문의하기
              </span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6" style={{ lineHeight: '1.3' }}>
              프로젝트 문의하기
            </h2>
            
            <p className="text-base md:text-lg text-slate-600 tracking-normal mb-8" style={{ lineHeight: '1.7' }}>
              성장을 위한 파트너, PNA 컴퍼니입니다. 문의 남겨주시면 담당자가 <span className="font-semibold text-blue-600">24시간 이내</span>에 연락드립니다.
            </p>
            
            {/* Decorative Badge */}
            <div className="hidden lg:block p-6 rounded-2xl bg-blue-50 border border-blue-200">
              <p className="text-blue-600 font-semibold text-base">
                🚀 함께 성장할 준비가 되셨나요?
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div>
          <div className="relative bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-200">
            {/* Decorative Element */}
            <div className="absolute -top-px -right-px w-32 h-32 bg-gradient-to-br from-blue-100 to-transparent rounded-br-3xl rounded-tl-3xl opacity-20 pointer-events-none" />
            
            <form onSubmit={handleSubmit(onSubmit)} className="relative space-y-6">
              {/* Company/Name */}
              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-bold text-slate-900 mb-3"
                >
                  회사명 / 성함 <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("company")}
                  type="text"
                  id="company"
                  className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 outline-none transition-all text-slate-900 font-medium placeholder:text-slate-400 bg-slate-50 focus:bg-white"
                  placeholder="예: 피앤에이컴퍼니"
                />
                {errors.company && (
                  <p className="mt-2 text-xs text-red-600 font-semibold">
                    {errors.company.message}
                  </p>
                )}
              </div>

              {/* Contact */}
              <div>
                <label
                  htmlFor="contact"
                  className="block text-sm font-bold text-slate-900 mb-3"
                >
                  연락처 <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("contact")}
                  type="tel"
                  id="contact"
                  className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 outline-none transition-all text-slate-900 font-medium placeholder:text-slate-400 bg-slate-50 focus:bg-white"
                  placeholder="010-1234-5678"
                />
                {errors.contact && (
                  <p className="mt-2 text-xs text-red-600 font-semibold">
                    {errors.contact.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-bold text-slate-900 mb-3"
                >
                  이메일 <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("email")}
                  type="email"
                  id="email"
                  className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 outline-none transition-all text-slate-900 font-medium placeholder:text-slate-400 bg-slate-50 focus:bg-white"
                  placeholder="example@company.com"
                />
                {errors.email && (
                  <p className="mt-2 text-xs text-red-600 font-semibold">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Honeypot (Anti-bot) - Hidden from humans */}
              <input
                {...register("website")}
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                style={{
                  position: 'absolute',
                  left: '-9999px',
                  width: '1px',
                  height: '1px',
                  opacity: 0,
                  pointerEvents: 'none'
                }}
                aria-hidden="true"
              />

              {/* Service Type & Budget (2 Column) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Service Type */}
                <div>
                  <label
                    htmlFor="serviceType"
                    className="block text-sm font-bold text-slate-900 mb-3"
                  >
                    서비스 유형 <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("serviceType")}
                    id="serviceType"
                    className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 outline-none transition-all text-slate-900 font-medium bg-slate-50 focus:bg-white cursor-pointer"
                  >
                    {serviceOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.serviceType && (
                    <p className="mt-2 text-xs text-red-600 font-semibold">
                      {errors.serviceType.message}
                    </p>
                  )}
                </div>

                {/* Budget */}
                <div>
                  <label
                    htmlFor="budget"
                    className="block text-sm font-bold text-slate-900 mb-3"
                  >
                    예산 범위 <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("budget")}
                    id="budget"
                    className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 outline-none transition-all text-slate-900 font-medium bg-slate-50 focus:bg-white cursor-pointer"
                  >
                    {budgetOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.budget && (
                    <p className="mt-2 text-xs text-red-600 font-semibold">
                      {errors.budget.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-bold text-slate-900 mb-3"
                >
                  문의 내용 <span className="text-red-500">*</span>
                </label>
                <textarea
                  {...register("message")}
                  id="message"
                  rows={6}
                  className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 outline-none transition-all text-slate-900 font-medium placeholder:text-slate-400 bg-slate-50 focus:bg-white resize-none"
                  placeholder="프로젝트에 대해 자세히 알려주세요..."
                />
                {errors.message && (
                  <p className="mt-2 text-xs text-red-600 font-semibold">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Privacy Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer group p-4 rounded-xl hover:bg-slate-50 transition-colors">
                  <input
                    {...register("privacy")}
                    type="checkbox"
                    className="mt-1 w-5 h-5 rounded-md border-2 border-slate-300 text-blue-600 focus:ring-4 focus:ring-blue-600/20 cursor-pointer"
                  />
                  <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors font-medium">
                    <span className="text-red-500 font-bold">*</span>{" "}
                    <a
                      href="/privacy"
                      target="_blank"
                      className="underline hover:text-blue-600 font-semibold"
                    >
                      개인정보 처리방침
                    </a>
                    에 동의합니다
                  </span>
                </label>
                {errors.privacy && (
                  <p className="mt-2 ml-4 text-xs text-red-600 font-semibold">
                    {errors.privacy.message}
                  </p>
                )}
              </div>

              {/* Cloudflare Turnstile (Anti-bot) */}
              {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
                <>
                  <Script
                    src="https://challenges.cloudflare.com/turnstile/v0/api.js"
                    onLoad={() => setTurnstileLoaded(true)}
                  />
                  <div id="turnstile-widget" className="flex justify-center"></div>
                </>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:shadow-blue-600/20 hover:-translate-y-0.5 focus:ring-4 focus:ring-blue-600/30 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2 group will-change-transform"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>전송 중...</span>
                  </>
                ) : (
                  <>
                    <span>문의하기</span>
                    <ArrowRight className="w-5 h-5 arrow-premium" />
                  </>
                )}
              </button>
            </form>
          </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
