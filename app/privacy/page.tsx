/**
 * [Page] Privacy Policy (개인정보처리방침)
 * [Design] Clean Text-Based Document Style
 * [GEO] SEO-Optimized with proper metadata
 */

import type { Metadata } from "next";
import { Shield, Clock } from "lucide-react";

// ============================================
// [GEO] Metadata
// ============================================
export const metadata: Metadata = {
  title: "개인정보 처리방침 | 피앤에이컴퍼니",
  description:
    "주식회사 피앤에이컴퍼니의 개인정보 처리방침입니다. 고객님의 개인정보를 안전하게 보호하고 관리합니다.",
  robots: {
    index: true,
    follow: true,
  },
};

// ============================================
// [Main] Privacy Policy Page
// ============================================
export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen py-24 md:py-32 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Glass Container */}
          <article className="bg-white/70 backdrop-blur-xl border border-white/50 shadow-xl rounded-3xl p-8 md:p-12">
            {/* Header */}
            <header className="text-center mb-12 pb-8 border-b border-slate-200">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 mb-6 shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-950 mb-4">
                개인정보 처리방침
              </h1>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                주식회사 피앤에이컴퍼니는 고객님의 개인정보를 소중히 다룹니다.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-sm text-blue-700 font-semibold">
                <Clock className="w-4 h-4" />
                시행일자: 2026년 1월 14일
              </div>
            </header>

            {/* Preamble */}
            <div className="mb-8">
              <p className="text-slate-700 leading-relaxed">
                주식회사 피앤에이컴퍼니(이하 "회사")는 「개인정보 보호법」
                제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을
                신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이
                개인정보 처리방침을 수립·공개합니다.
              </p>
            </div>

            <hr className="border-slate-200 my-8" />

            {/* Article 1 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                제1조 (개인정보의 처리 목적)
              </h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고
                있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며 이용
                목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의
                동의를 받는 등 필요한 조치를 이행할 예정입니다.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-700">
                <li>
                  <strong>서비스 의뢰 문의:</strong> 원활한 상담 진행, 견적
                  제공 및 서비스 제공을 위한 목적으로 개인정보를 수집합니다.
                </li>
              </ul>
            </section>

            {/* Article 2 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                제2조 (개인정보의 처리 및 보유 기간)
              </h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터
                개인정보를 수집 시에 동의 받은 개인정보 보유·이용기간 내에서
                개인정보를 처리·보유합니다. 개인정보 처리 및 보유 기간은 다음과
                같습니다.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-700">
                <li>
                  <strong>서비스 의뢰 문의:</strong> 개인정보는 수집 및 이용목적
                  달성 시(상담 종료 또는 서비스 완료 등) 지체없이 파기합니다.
                  (단, 관계 법령 위반에 따른 수사·조사 등이 진행 중인 경우에는
                  해당 수사·조사 종료 시까지 보유할 수 있습니다.)
                </li>
              </ul>
            </section>

            {/* Article 3 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                제3조 (처리하는 개인정보의 항목 및 수집 방법)
              </h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                회사는 원활한 상담 및 서비스 제공을 위해 아래와 같이 고객의
                개인정보를 수집하고 있습니다.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-700 mb-3">
                <li>
                  <strong>서비스 의뢰 문의 (수집항목):</strong> 업체명, 담당자
                  성함, 연락처, 이메일, 문의내용
                </li>
                <li>
                  <strong>자동 수집 항목:</strong> IP주소, 쿠키, MAC주소, 서비스
                  이용기록, 방문기록, 불량 이용기록 등
                </li>
              </ul>
            </section>

            {/* Article 4 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                제4조 (개인정보의 제3자 제공에 관한 사항)
              </h2>
              <p className="text-slate-700 leading-relaxed">
                회사는 원칙적으로 이용자의 개인정보를 제1조 (개인정보의 처리
                목적)에서 명시한 범위 내에서 처리하며, 이용자의 사전 동의
                없이는 본래의 범위를 초과하여 처리하거나 제3자에게 제공하지
                않습니다.
              </p>
            </section>

            {/* Article 5 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                제5조 (개인정보의 파기)
              </h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가
                불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.
                개인정보 파기의 절차 및 방법은 다음과 같습니다.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-700">
                <li>
                  <strong>파기절차:</strong> 회사는 파기 사유가 발생한
                  개인정보를 선정하고, 회사의 개인정보 보호책임자의 승인을 받아
                  개인정보를 파기합니다.
                </li>
                <li>
                  <strong>파기방법:</strong> 회사에서 처리하는 개인정보파일은
                  전자적 파일 형태로 기록되기 때문에 재생할 수 없는 기술적
                  방법을 사용하여 파기합니다.
                </li>
              </ul>
            </section>

            {/* Article 6 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                제6조 (개인정보의 안전성 확보 조치)
              </h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고
                있습니다.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-700">
                <li>
                  <strong>관리적 조치:</strong> 내부관리계획 수립·시행, 정기적
                  직원 교육 등
                </li>
                <li>
                  <strong>기술적 조치:</strong> 개인정보처리시스템 등의 접근권한
                  관리, 접근통제시스템 설치, 고유식별정보 등의 암호화,
                  보안프로그램 설치
                </li>
                <li>
                  <strong>물리적 조치:</strong> 전산실, 자료보관실 등의 접근통제
                </li>
              </ul>
            </section>

            {/* Article 7 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                제7조 (개인정보 자동 수집 장치의 설치•운영 및 거부에 관한 사항)
              </h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                회사는 이용자에게 개별적인 맞춤서비스를 제공하기 위해
                이용정보를 저장하고 수시로 불러오는 '쿠키(cookie)'를 사용합니다.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-700">
                <li>
                  <strong>쿠키의 사용 목적:</strong> 이용자가 방문한 각 서비스와
                  웹 사이트들에 대한 방문 및 이용형태, 인기 검색어, 보안접속
                  여부 등을 파악하여 이용자에게 최적화된 정보 제공을 위해
                  사용됩니다.
                </li>
                <li>
                  <strong>쿠키의 설치•운영 및 거부:</strong> 웹브라우저 상단의
                  도구 → 인터넷 옵션 → 개인정보 메뉴의 옵션 설정을 통해 쿠키
                  저장을 거부할 수 있습니다.
                </li>
                <li>
                  <strong>주의사항:</strong> 쿠키 저장을 거부할 경우 맞춤형
                  서비스 이용에 어려움이 발생할 수 있습니다.
                </li>
              </ul>
            </section>

            {/* Article 8 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                제8조 (개인정보 보호책임자)
              </h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보
                처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와
                같이 개인정보 보호책임자를 지정하고 있습니다.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-700">
                <li>
                  <strong>성명:</strong> 안태민 (대표)
                </li>
                <li>
                  <strong>연락처:</strong> 070-7733-7905
                </li>
                <li>
                  <strong>이메일:</strong> pna0310 [at] naver [dot] com
                </li>
              </ul>
            </section>

            {/* Article 9 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                제9조 (개인정보 열람청구)
              </h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                정보주체는 ｢개인정보 보호법｣ 제35조에 따른 개인정보의 열람
                청구를 아래 담당자에게 할 수 있습니다. 회사는 정보주체의
                개인정보 열람청구가 신속하게 처리되도록 노력하겠습니다.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-700">
                <li>
                  <strong>접수·처리 담당자:</strong> 안태민 대표 (연락처 상동)
                </li>
              </ul>
            </section>

            {/* Article 10 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                제10조 (권익침해 구제방법)
              </h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                정보주체는 개인정보침해로 인한 구제를 받기 위하여 아래 기관에
                분쟁해결이나 상담 등을 신청할 수 있습니다.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="text-slate-700">
                  <p className="font-semibold text-slate-900">
                    개인정보분쟁조정위원회
                  </p>
                  <p className="text-sm">
                    전화: <span className="font-medium">1833-6972</span>
                  </p>
                  <p className="text-sm">
                    <a
                      href="https://www.kopico.go.kr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      www.kopico.go.kr
                    </a>
                  </p>
                </div>
                <div className="text-slate-700">
                  <p className="font-semibold text-slate-900">
                    개인정보침해신고센터
                  </p>
                  <p className="text-sm">
                    전화: <span className="font-medium">118</span>
                  </p>
                  <p className="text-sm">
                    <a
                      href="https://privacy.kisa.or.kr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      privacy.kisa.or.kr
                    </a>
                  </p>
                </div>
                <div className="text-slate-700">
                  <p className="font-semibold text-slate-900">대검찰청</p>
                  <p className="text-sm">
                    전화: <span className="font-medium">1301</span>
                  </p>
                  <p className="text-sm">
                    <a
                      href="https://www.spo.go.kr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      www.spo.go.kr
                    </a>
                  </p>
                </div>
                <div className="text-slate-700">
                  <p className="font-semibold text-slate-900">경찰청</p>
                  <p className="text-sm">
                    전화: <span className="font-medium">182</span>
                  </p>
                  <p className="text-sm">
                    <a
                      href="https://ecrm.cyber.go.kr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      ecrm.cyber.go.kr
                    </a>
                  </p>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="mt-12 pt-8 border-t border-slate-200 text-center">
              <p className="text-sm text-slate-600">
                본 개인정보 처리방침은 2026년 1월 14일부터 적용됩니다.
              </p>
              <p className="text-sm text-slate-600 mt-2">
                © 2026 주식회사 피앤에이컴퍼니. All rights reserved.
              </p>
            </footer>
          </article>
        </div>
      </main>
  );
}
