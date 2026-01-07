# 🔍 Elementor Safe Mode 디버깅 체크리스트

## 1. Fatal Error 발생 시

### 원인 확인
```bash
# SSH 접속 후 에러 로그 확인
tail -n 50 ~/logs/php_error.log
```

### 일반적인 원인
- `<?php` 태그 중복
- `?>` 닫기 태그 위치 문제
- 함수 중복 선언
- 메모리 부족

### 해결
1. FTP로 `functions.php` 다운로드
2. 마지막에 추가한 코드 제거
3. 다시 업로드
4. 캐시 삭제: `wp cache flush`

---

## 2. Safe Mode가 여전히 발생 시

### A. Headless 플러그인 확인
```bash
# WP-CLI로 활성 플러그인 확인
wp plugin list --status=active
```

**찾아야 할 플러그인:**
- FaustWP
- WPGraphQL Headless
- Atlas Content Modeler
- Any "Headless" or "Decoupled" 플러그인

### B. 플러그인 임시 비활성화 테스트
```bash
# Headless 플러그인 비활성화
wp plugin deactivate faustwp
wp plugin deactivate wp-graphql-headless

# Elementor 테스트
# 다시 활성화
wp plugin activate faustwp wp-graphql-headless
```

### C. 테마 함수 충돌 확인
```bash
# 현재 테마 확인
wp theme list

# 임시로 기본 테마로 변경
wp theme activate twentytwentyfour

# Elementor 테스트 후 복구
wp theme activate hello-elementor
```

---

## 3. CORS/CORB 에러 계속 발생 시

### 브라우저 콘솔 체크
```javascript
// Chrome DevTools > Console에서 확인할 에러
- "Blocked by CORS policy"
- "net::ERR_BLOCKED_BY_CLIENT"
- "SecurityError: Blocked a frame with origin"
```

### 서버 레벨 확인
```bash
# .htaccess 파일 확인 (Apache)
cat ~/public_html/.htaccess | grep -i "header"

# Nginx 설정 확인 (Cloudways)
# Cloudways Dashboard > Application Settings > Nginx Configuration
```

### 필요한 헤더
```apache
# .htaccess에 추가 (Apache)
<IfModule mod_headers.c>
    # Elementor Editor 요청인 경우
    SetEnvIf Request_URI "elementor-preview" ELEMENTOR_PREVIEW
    Header set X-Frame-Options "SAMEORIGIN" env=ELEMENTOR_PREVIEW
    Header set Content-Security-Policy "frame-ancestors 'self'" env=ELEMENTOR_PREVIEW
</IfModule>
```

---

## 4. Preview URL이 Next.js로 리다이렉트되는 경우

### URL 패턴 확인
```
❌ 잘못된 Preview URL:
https://pnamarketing.co.kr/your-post/?elementor-preview=123

✅ 올바른 Preview URL:
https://cms.pnamarketing.co.kr/your-post/?elementor-preview=123
```

### WordPress 홈 URL 확인
```bash
# WP-CLI로 확인
wp option get home
wp option get siteurl

# 둘 다 cms.pnamarketing.co.kr을 가리켜야 함
```

### FaustWP 설정 확인
```bash
# FaustWP 설정 확인
wp option get faustwp_settings

# Frontend URI가 설정되어 있는지 확인
# Editor에서는 무시되어야 함
```

---

## 5. Elementor CSS/JS가 로드되지 않는 경우

### 캐시 삭제
```bash
# Elementor 캐시 삭제
wp elementor flush-css

# WordPress 전체 캐시 삭제
wp cache flush

# Cloudways Redis 캐시 삭제 (Cloudways인 경우)
# Cloudways Dashboard > Application Management > Cache > Purge
```

### Asset URL 확인
```javascript
// 브라우저 DevTools > Network 탭에서 확인
// Elementor CSS/JS가 다음 도메인에서 로드되는지 확인:
✅ https://cms.pnamarketing.co.kr/wp-content/...
❌ https://pnamarketing.co.kr/wp-content/...
```

### 강제 재생성
```bash
# Elementor 데이터 재생성
wp elementor sync-library
wp elementor replace-urls --from=pnamarketing.co.kr --to=cms.pnamarketing.co.kr
```

---

## 6. 최종 핵심 체크리스트

### ✅ WordPress 설정
- [ ] Home URL: `cms.pnamarketing.co.kr`
- [ ] Site URL: `cms.pnamarketing.co.kr`
- [ ] Elementor Tools > Regenerate CSS 실행됨
- [ ] 캐시 플러그인 비활성화 (테스트 시)

### ✅ FaustWP/Headless 설정
- [ ] Frontend Site URL: `pnamarketing.co.kr` (올바름)
- [ ] "Redirect to Frontend" 옵션 비활성화 확인
- [ ] Secret Key 설정 확인

### ✅ Elementor 설정
- [ ] Tools > Replace URL 실행
- [ ] Safe Mode 해제됨
- [ ] Editor Loader가 보임

### ✅ 서버 설정
- [ ] PHP 메모리: 256MB 이상
- [ ] `allow_url_fopen`: On
- [ ] `max_execution_time`: 300 이상

---

## 7. 긴급 백업 복구

### 테마 functions.php 원본 복구
```bash
# SSH 접속
cd ~/public_html/wp-content/themes/hello-elementor

# Git이 있다면
git checkout functions.php

# 없다면 백업에서 복구
cp functions.php.backup functions.php
```

### WordPress 복구 모드
1. 관리자 이메일 확인
2. "Recovery Mode" 링크 클릭
3. 문제 있는 테마 비활성화
4. Twenty Twenty-Four 활성화
5. 문제 수정 후 원래 테마 재활성화

---

## 📞 여전히 안 될 때

### 수집해야 할 정보
1. **브라우저 콘솔 스크린샷** (F12 > Console)
2. **Network 탭 스크린샷** (F12 > Network, 필터: "preview")
3. **PHP 에러 로그** (`tail -n 50 ~/logs/php_error.log`)
4. **활성 플러그인 리스트** (`wp plugin list --status=active`)
5. **WordPress 버전** (`wp core version`)
6. **Elementor 버전** (`wp plugin get elementor --field=version`)

이 정보를 가지고 다시 문의하면 정확한 해결책을 제공할 수 있습니다.





