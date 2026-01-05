# 🔴 Elementor CORS 및 도메인 설정 문제 해결

## 🎯 핵심 문제 진단

### 콘솔 에러 분석:

```
Access-Control-Allow-Origin' header has a value 'https://pnamarketing.co.kr' 
that is not equal to the supplied origin 'https://cms.pnamarketing.co.kr'
```

**문제:** WordPress 설정에서 도메인이 `pnamarketing.co.kr`로 되어 있는데, 실제 접속은 `cms.pnamarketing.co.kr`로 하고 있어서 충돌!

---

## 🚀 즉시 해결: WordPress 도메인 설정 수정

### 1단계: WordPress 일반 설정 확인

1. **WordPress 관리자 페이지 접속:**
   ```
   https://cms.pnamarketing.co.kr/wp-admin
   ```

2. **설정 → 일반**

3. **다음 두 항목 확인:**
   ```
   WordPress 주소(URL): https://cms.pnamarketing.co.kr
   사이트 주소(URL):    https://pnamarketing.co.kr
   ```

**현재 상황:**
- 두 주소가 다르게 설정되어 있어서 CORS 에러 발생!

**해결 방법:**

#### 옵션 A: 둘 다 cms.pnamarketing.co.kr로 통일 (권장)
```
WordPress 주소(URL): https://cms.pnamarketing.co.kr
사이트 주소(URL):    https://cms.pnamarketing.co.kr
```

#### 옵션 B: 프론트는 pnamarketing.co.kr, 편집은 cms로
```
WordPress 주소(URL): https://cms.pnamarketing.co.kr
사이트 주소(URL):    https://pnamarketing.co.kr
```
**주의:** 이 경우 추가 CORS 설정 필요!

---

## 💊 즉시 적용: wp-config.php 수정 (더 확실함)

### 방법: FTP 또는 호스팅 파일 관리자

1. **wp-config.php 파일 찾기** (WordPress 루트 폴더)

2. **파일 맨 위에 아래 코드 추가** (`<?php` 바로 아래):

```php
<?php
// 도메인 강제 설정 (CORS 문제 해결)
define('WP_HOME', 'https://cms.pnamarketing.co.kr');
define('WP_SITEURL', 'https://cms.pnamarketing.co.kr');
```

3. **저장**

4. **WordPress 관리자 페이지 다시 로그인**

5. **Elementor 편집기 다시 열기**

---

## 🛡️ CORS 헤더 추가 (함께 적용)

### Code Snippets 또는 functions.php에 추가:

```php
<?php
// CORS 헤더 설정 - Elementor 편집기용
add_action('init', function() {
    // 현재 도메인 확인
    $allowed_origins = array(
        'https://cms.pnamarketing.co.kr',
        'https://pnamarketing.co.kr',
        'https://editor-static-bucket.elementor.com'
    );
    
    $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
    
    if (in_array($origin, $allowed_origins)) {
        header("Access-Control-Allow-Origin: $origin");
        header("Access-Control-Allow-Credentials: true");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization");
    }
});

// Elementor 편집기에서만 추가 헤더
add_action('elementor/editor/before_enqueue_scripts', function() {
    header("Access-Control-Allow-Origin: https://cms.pnamarketing.co.kr");
    header("Access-Control-Allow-Credentials: true");
});
```

---

## 🔧 .htaccess 수정 (Apache 서버인 경우)

### WordPress 루트 폴더의 .htaccess 파일 수정:

```apache
# BEGIN WordPress 위에 추가

<IfModule mod_headers.c>
    # CORS 헤더 설정
    SetEnvIf Origin "^https://(cms\.)?pnamarketing\.co\.kr$" ORIGIN_DOMAIN=$0
    Header set Access-Control-Allow-Origin "%{ORIGIN_DOMAIN}e" env=ORIGIN_DOMAIN
    Header set Access-Control-Allow-Credentials "true" env=ORIGIN_DOMAIN
    Header set Access-Control-Allow-Methods "GET, POST, OPTIONS"
    Header set Access-Control-Allow-Headers "Content-Type, Authorization"
    
    # Elementor 전용
    <FilesMatch "\.(js|css|woff|woff2|ttf|svg|eot)$">
        Header set Access-Control-Allow-Origin "*"
    </FilesMatch>
</IfModule>

# BEGIN WordPress
```

---

## 🎯 Elementor 설정 재구성

### 1단계: Elementor 도구 → 일반 재생성

1. **WordPress 관리자 → Elementor → 도구**
2. **"일반" 탭**
3. **"CSS 파일 재생성" 클릭**
4. **"데이터 동기화" 클릭**

### 2단계: Elementor 설정 확인

1. **Elementor → 설정 → Advanced**
2. **"Editor Loader Method"** → `기본값` 또는 `새 창에서 열기` 선택
3. **저장**

### 3단계: 캐시 완전 삭제

```bash
# WordPress 캐시 플러그인이 있다면
- WP Super Cache → 모든 캐시 삭제
- W3 Total Cache → Performance → Purge All Caches
- LiteSpeed Cache → 캐시 삭제

# 브라우저 캐시
Ctrl + Shift + Delete → 전체 삭제
```

---

## 🔍 데이터베이스에서 도메인 일괄 변경

### phpMyAdmin 접속 → SQL 실행:

```sql
-- 1. 옵션 테이블에서 URL 확인
SELECT * FROM wp_options 
WHERE option_name IN ('siteurl', 'home');

-- 2. URL 일괄 변경 (cms.pnamarketing.co.kr로 통일)
UPDATE wp_options 
SET option_value = 'https://cms.pnamarketing.co.kr' 
WHERE option_name IN ('siteurl', 'home');

-- 3. 포스트/페이지 내용에서 URL 일괄 변경
UPDATE wp_posts 
SET post_content = REPLACE(post_content, 'https://pnamarketing.co.kr', 'https://cms.pnamarketing.co.kr');

UPDATE wp_posts 
SET guid = REPLACE(guid, 'https://pnamarketing.co.kr', 'https://cms.pnamarketing.co.kr');

-- 4. 메타 데이터에서 URL 변경
UPDATE wp_postmeta 
SET meta_value = REPLACE(meta_value, 'https://pnamarketing.co.kr', 'https://cms.pnamarketing.co.kr');

-- 5. Elementor 메타 데이터
UPDATE wp_postmeta 
SET meta_value = REPLACE(meta_value, 'https:\\/\\/pnamarketing.co.kr', 'https:\\/\\/cms.pnamarketing.co.kr')
WHERE meta_key LIKE '_elementor%';
```

**⚠️ 주의:** 데이터베이스 백업 필수!

---

## 🔄 Better Search Replace 플러그인 (더 안전)

### 플러그인으로 URL 일괄 변경:

1. **플러그인 설치**
   ```
   플러그인 → 새로 추가
   "Better Search Replace" 검색 → 설치 → 활성화
   ```

2. **URL 변경 실행**
   ```
   도구 → Better Search Replace
   
   Search for:    https://pnamarketing.co.kr
   Replace with:  https://cms.pnamarketing.co.kr
   
   Select tables: 전체 선택
   Run as dry run: 체크 (테스트)
   
   "Run Search/Replace" 클릭
   ```

3. **결과 확인 후 실제 적용**
   ```
   Run as dry run: 체크 해제
   "Run Search/Replace" 클릭
   ```

---

## ✅ 완전 해결 체크리스트

### 순서대로 실행:

- [ ] 1. **wp-config.php에 도메인 강제 설정 추가**
- [ ] 2. **Code Snippets에 CORS 헤더 코드 추가**
- [ ] 3. **Better Search Replace로 URL 일괄 변경**
- [ ] 4. **Elementor → 도구 → CSS 재생성**
- [ ] 5. **브라우저 캐시 완전 삭제** (Ctrl+Shift+Delete)
- [ ] 6. **WordPress 재로그인**
- [ ] 7. **Elementor 편집기 다시 열기**
- [ ] 8. **F12 → Console에서 에러 확인**

### 성공 시:
- ✅ CORS 에러 사라짐
- ✅ `elementorFrontend` 에러 사라짐
- ✅ Elementor 편집기 정상 작동

---

## 🆘 여전히 에러가 있다면

### 추가 정보 수집:

1. **WordPress 설정 → 일반 스크린샷**
2. **wp-config.php 파일 내용** (민감 정보 제외)
3. **F12 → Console의 모든 에러 복사**
4. **Elementor 버전** (플러그인 페이지)
5. **서버 환경** (Apache/Nginx)

---

## 📋 Next.js 프로젝트 설정도 수정 필요

### lib/api.ts에서 URL 확인:

현재:
```typescript
const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || '';
```

**환경변수 확인:**
```bash
# .env.local 파일
WORDPRESS_API_URL=https://cms.pnamarketing.co.kr/graphql
```

### components/ElementorIframe.tsx 수정:

```typescript
export default function ElementorIframe({ 
  postId, 
  wpUrl = 'https://cms.pnamarketing.co.kr'  // 도메인 통일
}: Props) {
```

---

이제 완전히 해결될 것입니다! 🎉



