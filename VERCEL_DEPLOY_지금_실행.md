# 🚀 Vercel 즉시 배포 가이드

## 전제 조건
- GitHub 계정 필요
- Vercel 계정 (GitHub으로 로그인 가능)

---

## 방법 1: Vercel CLI로 즉시 배포 (가장 빠름)

### 1단계: Vercel CLI 설치 및 로그인

PowerShell을 열고 다음 명령어 실행:

```powershell
cd "C:\Users\looca\OneDrive\바탕 화면\워프글_커서"

# Vercel CLI 설치
npm install -g vercel

# Vercel 로그인 (브라우저가 열립니다)
vercel login

# 프로젝트 배포 (처음 실행 시 몇 가지 질문에 답변)
vercel
```

### 2단계: 질문에 답변

```
? Set up and deploy "워프글_커서"? [Y/n] y
? Which scope do you want to deploy to? (본인 계정 선택)
? Link to existing project? [y/N] n
? What's your project's name? pna-nextjs-landing
? In which directory is your code located? ./
? Want to override the settings? [y/N] n
```

### 3단계: 배포 완료!

```
✅ Deployed to production. Run `vercel --prod` to deploy to production.
🔗 Preview: https://pna-nextjs-landing-xxxxx.vercel.app
```

---

## 방법 2: Vercel 대시보드로 배포 (GUI 방식)

### 1단계: GitHub에 코드 푸시

```powershell
cd "C:\Users\looca\OneDrive\바탕 화면\워프글_커서"

# Git 초기화 (이미 되어 있다면 생략)
git init
git add .
git commit -m "feat: Trinity Architecture 랜딩 페이지 구축"

# GitHub에 푸시 (Repository 주소는 본인 것으로 변경)
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```

### 2단계: Vercel에서 Import

1. https://vercel.com 접속
2. "New Project" 클릭
3. GitHub 저장소 선택
4. "Import" 클릭
5. 자동으로 Next.js 감지 → "Deploy" 클릭

---

## ⚙️ 환경 변수 설정 (중요!)

Vercel 대시보드에서:

```
Settings > Environment Variables

추가할 변수:
- NEXT_PUBLIC_WP_URL: https://cms.pnamarketing.co.kr
- NEXT_PUBLIC_GRAPHQL_ENDPOINT: https://cms.pnamarketing.co.kr/graphql
```

---

## 🎉 배포 완료 후

배포가 완료되면 다음과 같은 URL을 받게 됩니다:

```
Production: https://pna-nextjs-landing.vercel.app
```

이 URL을 브라우저에서 열어 새로운 랜딩 페이지를 확인하세요!

---

## 🔄 자동 재배포

Git에 푸시할 때마다 Vercel이 자동으로 재배포합니다:

```powershell
git add .
git commit -m "update: 컴포넌트 수정"
git push
# 자동으로 Vercel에서 빌드 & 배포!
```

---

## ⚡ 지금 바로 실행할 명령어 (복사해서 PowerShell에 붙여넣기)

```powershell
cd "C:\Users\looca\OneDrive\바탕 화면\워프글_커서"
npm install -g vercel
vercel login
vercel
```

**끝!** 2분 안에 배포 완료됩니다. 🚀



