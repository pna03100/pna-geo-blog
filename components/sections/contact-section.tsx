/**
 * [Section] Contact Form
 * [Design] Clean Tech Style - 2-Column Layout
 * [Security] Form Validation with Zod + react-hook-form
 */

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MapPin, Mail, Phone, Award, CheckCircle2, Loader2 } from "lucide-react";

// ============================================
// [Security] Zod Schema
// ============================================
const contactSchema = z.object({
  company: z.string().min(2, "회사명/성함을 입력해주세요 (최소 2자)"),
  contact: z.string().min(10, "연락처를 정확히 입력해주세요"),
  email: z.string().email("올바른 이메일 주소를 입력해주세요"),
  serviceType: z.string().min(1, "서비스 유형을 선택해주세요"),
  budget: z.string().min(1, "예산 범위를 선택해주세요"),
  message: z.string().min(10, "문의 내용을 10자 이상 입력해주세요"),
  privacy: z.boolean().refine((val) => val === true, {
    message: "개인정보 처리방침에 동의해주세요",
  }),
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
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsSuccess(true);
        reset();

        // Hide success message after 5 seconds
        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
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
    <section id="contact" className="relative py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column: Info */}
          <div className="space-y-8">
            {/* Title */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                프로젝트 문의하기
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                성장을 위한 파트너, PNA 컴퍼니입니다.
                <br />
                문의 남겨주시면 담당자가 24시간 이내에 연락드립니다.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-700 mb-1">
                    주소
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    경기 고양시 일산동구 백마로195<br />
                    SK엠시티 상가동 2층 2120호
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-700 mb-1">
                    이메일
                  </h3>
                  <a
                    href="mailto:pna0310@naver.com"
                    className="text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    pna0310@naver.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-700 mb-1">
                    전화
                  </h3>
                  <div className="space-y-1">
                    <a
                      href="tel:070-7733-7905"
                      className="block text-slate-600 hover:text-blue-600 transition-colors"
                    >
                      Tel: 070-7733-7905
                    </a>
                    <p className="text-sm text-slate-500">
                      Fax: 031-908-2225
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <Award className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm font-bold text-slate-900">
                  Google 공식 파트너
                </p>
                <p className="text-xs text-slate-500">Partner Badge Certified</p>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
            {/* Success Message */}
            {isSuccess && (
              <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-green-900">
                    문의가 성공적으로 전송되었습니다!
                  </p>
                  <p className="text-xs text-green-700 mt-1">
                    빠른 시일 내에 연락드리겠습니다.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Company/Name */}
              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  회사명 / 성함 <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("company")}
                  type="text"
                  id="company"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all text-slate-900"
                  placeholder="예: 피앤에이컴퍼니"
                />
                {errors.company && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.company.message}
                  </p>
                )}
              </div>

              {/* Contact */}
              <div>
                <label
                  htmlFor="contact"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  연락처 <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("contact")}
                  type="tel"
                  id="contact"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all text-slate-900"
                  placeholder="010-1234-5678"
                />
                {errors.contact && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.contact.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  이메일 <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("email")}
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all text-slate-900"
                  placeholder="example@company.com"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Service Type & Budget (2 Column) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Service Type */}
                <div>
                  <label
                    htmlFor="serviceType"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    서비스 유형 <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("serviceType")}
                    id="serviceType"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all text-slate-900"
                  >
                    {serviceOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.serviceType && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.serviceType.message}
                    </p>
                  )}
                </div>

                {/* Budget */}
                <div>
                  <label
                    htmlFor="budget"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    예산 범위 <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("budget")}
                    id="budget"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all text-slate-900"
                  >
                    {budgetOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.budget && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.budget.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  문의 내용 <span className="text-red-500">*</span>
                </label>
                <textarea
                  {...register("message")}
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all text-slate-900 resize-none"
                  placeholder="프로젝트에 대해 자세히 알려주세요..."
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Privacy Checkbox */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    {...register("privacy")}
                    type="checkbox"
                    className="mt-1 w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-600/20 cursor-pointer"
                  />
                  <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
                    <span className="text-red-500">*</span>{" "}
                    <a
                      href="/privacy"
                      target="_blank"
                      className="underline hover:text-blue-600"
                    >
                      개인정보 처리방침
                    </a>
                    에 동의합니다
                  </span>
                </label>
                {errors.privacy && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.privacy.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 focus:ring-4 focus:ring-blue-600/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>전송 중...</span>
                  </>
                ) : (
                  <span>문의하기</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
