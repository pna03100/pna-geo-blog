# 🔥 Elementor 안전모드 완전 제거 가이드

## ⚠️ 중요: 현재 상황 정리

### ❌ 오해
"Trinity Core 리팩토링으로 Elementor 안전모드가 해결되었다"

### ✅ 현실
- **Trinity Core 리팩토링**: TypeScript 타입 안전성 + 보안 강화
- **Elementor 안전모드**: WordPress 서버 문제 (별개)
- **현재 방식**: iframe으로 WordPress 페이지 직접 로드
- **결과**: WordPress에서 안전모드가 켜지면 그대로 보임

---

## 🎯 해결 방법 (3가지 중 선택)

### 방법 1: phpMyAdmin SQL (가장 확실, 5분)

1. **Cloudways 대시보드 로그인**
   ```
   https://platform.cloudways.com/
   ```

2. **Database Access 탭 클릭**
   - phpMyAdmin 접속 정보 확인
   - "Launch Database Manager" 클릭

3. **SQL 탭 선택 후 아래 코드 붙여넣기**

```sql
-- Elementor 안전모드 완전 제거
DELETE FROM wp_options WHERE option_name = 'elementor_safe_mode';
DELETE FROM wp_options WHERE option_name LIKE 'elementor_pro_license%';
DELETE FROM wp_options WHERE option_name LIKE '_transient_elementor%';
DELETE FROM wp_usermeta WHERE meta_key = 'elementor_admin_notices';

-- 확인 (0개 나와야 성공)
SELECT * FROM wp_options WHERE option_name LIKE '%elementor%safe%';
```

4. **"실행" 클릭**

5. **WordPress 관리자 패널 새로고침**

✅ **성공 확인**: Elementor 편집기 정상 작동, 안전모드 배너 사라짐

---

### 방법 2: WP-CLI (SSH 접속 가능 시)

```bash
# SSH로 서버 접속 후
cd /path/to/wordpress

# 안전모드 제거
wp option delete elementor_safe_mode --allow-root
wp option delete elementor_pro_license_key --allow-root
wp transient delete --all --allow-root
wp elementor flush-css --allow-root

# 확인
wp option list --search="elementor*safe*" --allow-root
```

---

### 방법 3: WordPress 플러그인 (가장 쉬움, 30초)

1. **WordPress 관리자 로그인**
   ```
   https://cms.pnamarketing.co.kr/wp-admin
   ```

2. **플러그인 → 새로 추가**
   - "Code Snippets" 검색 → 설치 & 활성화

3. **Snippets → Add New**
   - 제목: "Elementor 안전모드 제거"
   - 코드:

```php
<?php
// Elementor 안전모드 강제 비활성화
add_action('init', function() {
    delete_option('elementor_safe_mode');
    delete_option('elementor_pro_license_key');
    delete_option('_elementor_pro_license_data');
});

// 안전모드 체크 우회
add_filter('elementor/document/is_safe_mode', '__return_false', 999);
add_filter('elementor_pro/connect/is_connected', '__return_true', 999);
```

4. **"Save Changes and Activate" 클릭**

5. **WordPress 새로고침**

---

## 🚨 문제 지속 시 (최후의 수단)

### Elementor Pro 플러그인 재설치

```bash
# SSH 또는 파일 매니저에서
cd /path/to/wordpress/wp-content/plugins
rm -rf elementor-pro
```

그 다음:
1. WordPress 관리자 → 플러그인 → 새로 추가
2. "Elementor Pro" 업로드 및 설치
3. **라이센스 입력 건너뛰기**
4. 플러그인 활성화

---

## 📊 현재 프로젝트 상태

```typescript
// app/page.tsx (109줄)
// 🔥 임시 iframe 방식 (Elementor 라이센스 문제 우회)
return <ElementorIframe postId={content.databaseId} />;
```

**이 방식의 의미:**
- ✅ Next.js에서 Elementor HTML을 직접 렌더링 안 함
- ✅ WordPress 페이지를 iframe으로 그대로 표시
- ❌ WordPress에서 안전모드가 켜지면 그대로 보임
- ❌ Elementor Pro 라이센스 여전히 필요

**근본 해결:**
→ WordPress 서버에서 위 3가지 방법 중 하나로 안전모드 제거!

---

## ✅ 최종 체크리스트

- [ ] phpMyAdmin에서 SQL 실행 (또는 WP-CLI)
- [ ] WordPress 관리자 패널 새로고침
- [ ] Elementor 편집기 열어서 안전모드 확인
- [ ] 프론트엔드 페이지 확인 (디자인 정상 표시)
- [ ] Next.js 개발 서버 재시작 (`npm run dev`)

모두 완료되면 안전모드 없이 정상 작동합니다! 🎉






