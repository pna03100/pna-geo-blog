# 📧 메일 전송 설정 가이드

문의 폼에서 메일이 자동으로 `pna0310@naver.com`으로 전송됩니다.

## 1️⃣ Gmail 앱 비밀번호 생성

### Step 1: Google 계정 2단계 인증 활성화
1. [Google 계정 관리](https://myaccount.google.com/) 접속
2. **보안** → **2단계 인증** 활성화

### Step 2: 앱 비밀번호 생성
1. [앱 비밀번호 페이지](https://myaccount.google.com/apppasswords) 접속
2. **앱 선택** → "메일" 선택
3. **기기 선택** → "기타(맞춤 이름)" 선택
4. 이름 입력: `PNA Website`
5. **생성** 클릭
6. 생성된 16자리 비밀번호 복사 (예: `abcd efgh ijkl mnop`)

## 2️⃣ 환경 변수 설정

프로젝트 루트에 `.env.local` 파일 생성:

```env
# Gmail 설정 (메일 발송용)
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=abcdefghijklmnop
```

⚠️ **주의사항:**
- `GMAIL_APP_PASSWORD`는 공백 없이 입력 (예: `abcdefghijklmnop`)
- `.env.local` 파일은 절대 Git에 커밋하지 마세요!

## 3️⃣ 테스트

1. 개발 서버 재시작:
```bash
npm run dev
```

2. `/contact` 페이지에서 테스트 문의 전송

3. `pna0310@naver.com`에 메일 도착 확인

## 4️⃣ Vercel 배포 시

Vercel 대시보드에서 환경 변수 추가:
1. **Settings** → **Environment Variables**
2. `GMAIL_USER` 추가
3. `GMAIL_APP_PASSWORD` 추가
4. 재배포

## 📌 메일이 안 오는 경우

### 문제 1: Gmail 보안 차단
- Gmail 보안 설정에서 "보안 수준이 낮은 앱 액세스" 확인
- 앱 비밀번호가 정확한지 확인

### 문제 2: 스팸 폴더
- Naver 메일의 스팸 폴더 확인

### 문제 3: 환경 변수 미적용
```bash
# 개발 서버 재시작
npm run dev
```

## 🎯 완료!

이제 문의 폼에서 메일이 자동으로 전송됩니다!
