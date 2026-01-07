# 🔥 디버깅 모드: 하드코딩된 URL 테스트

## 📋 변경 내용

### `lib/api.ts`의 `fetchAPI` 함수

**변경 전:**
```typescript
const url = env.WORDPRESS_API_URL;
```

**변경 후 (임시):**
```typescript
// 🔥 [DEBUG] 하드코딩 테스트
const url = 'https://cms.pnamarketing.co.kr/graphql';
```

---

## 🎯 테스트 목적

환경변수 문제 vs 네트워크/서버 문제를 구분하기 위함

### Case 1: 하드코딩으로 작동 ✅
**결론:** 환경변수 설정 문제
**해결:** Vercel 환경변수 재확인 및 재배포

### Case 2: 하드코딩으로도 실패 ❌
**결론:** 서버 차단 또는 네트워크 문제
**가능한 원인:**
1. Vercel IP가 Cloudways에서 차단됨
2. CORS 설정 문제
3. WordPress 플러그인 비활성화
4. Cloudways 방화벽 설정

---

## 🚀 배포 및 테스트 방법

### 1. Vercel에 배포
```bash
# Git에 커밋 (임시)
git add lib/api.ts
git commit -m "debug: hardcoded API URL test"
git push

# 또는 직접 배포
vercel --prod
```

### 2. 로그 확인
```bash
vercel logs --follow
```

### 3. 예상 로그

#### ✅ 성공 시:
```
🔥 [DEBUG MODE] 하드코딩된 URL 사용
🚀 [API Request]
📍 URL: https://cms.pnamarketing.co.kr/graphql
✅ Response Status: 200 OK
✅ Data Received: ['contentNode']
```

#### ❌ 실패 시:
```
🔥 [DEBUG MODE] 하드코딩된 URL 사용
🚀 [API Request]
📍 URL: https://cms.pnamarketing.co.kr/graphql
❌ HTTP Error: 403 (또는 500, 502)
```

또는

```
💥 [Fetch Exception]
Error Type: TypeError
Error Message: fetch failed
```

---

## 📊 테스트 결과 분석

### A. 200 OK + Data 정상 수신
→ **환경변수 문제 확정**
→ Vercel 환경변수 설정 재확인 필요

### B. 403 Forbidden
→ **Cloudways IP 차단 문제**
→ Cloudways 대시보드에서 Vercel IP 허용 필요

### C. 502 Bad Gateway
→ **WordPress 서버 문제**
→ WPGraphQL 플러그인 확인
→ WordPress 에러 로그 확인

### D. CORS Error
→ **CORS 설정 문제**
→ WordPress에서 CORS 플러그인 재설정

### E. fetch failed (Network Error)
→ **DNS 또는 SSL 문제**
→ `https://cms.pnamarketing.co.kr/graphql`이 브라우저에서 접속 가능한지 확인

---

## 🔍 추가 디버깅 정보

### Vercel 함수 로그 위치
1. Vercel 대시보드
2. 프로젝트 선택
3. **Deployments** → 최신 배포 클릭
4. **Functions** 탭
5. 각 함수별 로그 확인

### WordPress API 직접 테스트
```bash
# 로컬에서 테스트 (정상 작동 확인)
curl -X POST https://cms.pnamarketing.co.kr/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ posts { nodes { title } } }"}'
```

### Vercel IP 확인
```bash
# Vercel 함수에서 실행되는 IP 확인
# /api/debug/route.ts 생성 후 배포
```

---

## ⚠️ 중요: 테스트 후 원복

테스트가 끝나면 **반드시** 원래대로 되돌려야 합니다!

```typescript
// 원복할 코드
const url = env.WORDPRESS_API_URL;
```

하드코딩은 보안 위험이므로 프로덕션에 절대 남기면 안 됩니다.

---

## 📞 결과 보고 양식

테스트 후 다음 정보를 확인해주세요:

```
[테스트 결과]
- HTTP Status: _____
- 에러 메시지: _____
- 응답 시간: _____
- Data 수신 여부: _____

[Vercel 로그]
(로그 복사)

[브라우저 콘솔]
(콘솔 메시지 복사)
```

---

## 🎯 다음 단계

### Case 1: 하드코딩 성공 → 환경변수 문제
1. Vercel 환경변수 확인
   ```
   NEXT_PUBLIC_WORDPRESS_API_URL=https://cms.pnamarketing.co.kr/graphql
   ```
2. 환경변수 Scope 확인 (Production/Preview/Development)
3. 재배포 (Redeploy without cache)

### Case 2: 하드코딩 실패 → 서버 문제
1. Cloudways 방화벽 설정 확인
2. WordPress 플러그인 상태 확인
3. Vercel IP를 Cloudways 허용 목록에 추가
4. CORS 설정 재확인

---

이제 배포하고 결과를 확인해주세요! 🚀



