# 🔧 환경변수 설정 가이드 (긴급!)

## 🚨 현재 에러:

```
TypeError: Cannot read properties of undefined (reading 'forEach')
Source: lib\env.ts (44:20)
```

**원인**: `.env.local` 파일이 없거나 잘못 설정됨

---

## ✅ 즉시 해결 방법 (2분)

### **Step 1: .env.local 파일 생성**

프로젝트 루트 폴더에서 **새 파일 생성**:

```
파일명: .env.local
위치: C:\Users\looca\OneDrive\바탕 화면\워프글_커서\.env.local
```

### **Step 2: 아래 내용 복사 → 붙여넣기**

```env
# ============================================
# [Security] Environment Variables
# ============================================

WORDPRESS_API_URL=https://cms.pnamarketing.co.kr/graphql
NEXT_PUBLIC_WORDPRESS_URL=https://cms.pnamarketing.co.kr
```

### **Step 3: 파일 저장 (Ctrl+S)**

### **Step 4: 개발 서버 재시작**

```powershell
# 터미널에서 Ctrl+C로 서버 중지
# 그 다음:
npm run dev
```

---

## 📝 Visual Studio Code에서 파일 만들기

1. **좌측 파일 탐색기에서 프로젝트 루트 클릭**
2. **우클릭 → "새 파일" (New File)**
3. **파일명 입력: `.env.local`** (점으로 시작!)
4. **Enter 키**
5. **위 Step 2의 내용 붙여넣기**
6. **Ctrl+S로 저장**

---

## ⚠️ 중요 사항

### **파일명이 정확해야 합니다:**
- ✅ `.env.local` (점으로 시작)
- ❌ `env.local` (점 없음)
- ❌ `.env.local.txt` (확장자 추가됨)

### **위치가 정확해야 합니다:**
- ✅ 프로젝트 루트 (package.json과 같은 폴더)
- ❌ app 폴더 안
- ❌ lib 폴더 안

---

## 🧪 확인 방법

파일을 만든 후 터미널에서:

```powershell
# 파일 존재 확인
Test-Path .env.local
# → True가 나와야 함

# 파일 내용 확인
Get-Content .env.local
# → 위에 입력한 환경변수가 출력되어야 함
```

---

## 🔍 여전히 에러 발생 시

### **에러 1: "WORDPRESS_API_URL must be a valid URL"**

**원인**: URL 형식이 잘못됨

**해결**:
```env
# ❌ 잘못된 예시
WORDPRESS_API_URL=cms.pnamarketing.co.kr/graphql

# ✅ 올바른 예시
WORDPRESS_API_URL=https://cms.pnamarketing.co.kr/graphql
```

### **에러 2: "Module not found: Can't resolve 'zod'"**

**원인**: Zod 패키지 설치 안 됨

**해결**:
```powershell
npm install
```

### **에러 3: 여전히 같은 에러**

**원인**: 서버가 재시작되지 않음

**해결**:
```powershell
# 터미널에서 Ctrl+C (완전 종료)
# 5초 대기
npm run dev
```

---

## 💡 현재 코드 개선 사항

`lib/env.ts`가 수정되었습니다:

### **변경 전**:
```typescript
// ❌ error.errors가 undefined일 때 크래시
error.errors.forEach((err) => { ... });
```

### **변경 후**:
```typescript
// ✅ 안전한 에러 핸들링
if (error.errors && Array.isArray(error.errors)) {
  error.errors.forEach((err) => { ... });
}

// ✅ Development 모드: Fallback 값 사용
if (process.env.NODE_ENV === 'development') {
  return {
    WORDPRESS_API_URL: 'https://cms.pnamarketing.co.kr/graphql',
    NEXT_PUBLIC_WORDPRESS_URL: 'https://cms.pnamarketing.co.kr',
    NODE_ENV: 'development',
  };
}
```

**효과**: `.env.local` 파일이 없어도 개발 서버가 시작됨 (경고와 함께)

---

## 🚀 다음 단계

1. ✅ `.env.local` 파일 생성 (위 Step 1-3)
2. ✅ 서버 재시작 (`npm run dev`)
3. ✅ 브라우저 확인 (`localhost:3000`)

파일을 만드셨으면 서버를 재시작하세요! 🎉






