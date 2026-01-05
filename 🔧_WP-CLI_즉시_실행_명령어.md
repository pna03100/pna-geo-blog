# 🔧 WP-CLI로 Elementor 라이선스 즉시 삭제 (권한 우회 방식)

> **이 방법은 DB 비밀번호 없이도 작동합니다!**
> MySQL 권한 에러를 완전히 우회하는 최강 방법입니다.

---

## 📋 준비 단계: SSH 접속

### Cloudways SSH 접속 정보 확인
1. Cloudways 대시보드 로그인
2. 해당 애플리케이션 선택
3. 상단 **"Access Details"** 클릭
4. 아래 정보 복사:
   ```
   SSH Host: server-xxx.cloudwaysapps.com
   SSH User: master
   SSH Port: 22 (기본값)
   SSH Password: (표시된 비밀번호)
   ```

### SSH 접속 명령어
```bash
# Windows PowerShell에서 실행:
ssh master@server-xxx.cloudwaysapps.com
# 비밀번호 입력 (복사-붙여넣기 가능)
```

---

## 🚀 1단계: WordPress 경로 찾기

SSH 접속 후 아래 명령어 실행:

```bash
# 방법 1: wp-config.php 위치 찾기
find /home -name wp-config.php 2>/dev/null | head -1

# 방법 2: 예상 경로로 바로 이동 (Cloudways 기본 구조)
cd /home/master/applications/*/public_html
pwd  # 현재 경로 확인
```

**✅ 출력 예시:**
```
/home/master/applications/wpfglcom/public_html
```

이 경로로 이동:
```bash
cd /home/master/applications/wpfglcom/public_html
```

---

## 🔥 2단계: WP-CLI로 라이선스 데이터 즉시 삭제

**한 줄씩 복사해서 실행하세요:**

```bash
# 1️⃣ Elementor Pro 라이선스 키 삭제
wp option delete elementor_pro_license_key --allow-root

# 2️⃣ Elementor Pro 라이선스 데이터 삭제
wp option delete _elementor_pro_license_data --allow-root

# 3️⃣ Elementor 원격 정보 삭제
wp option delete elementor_remote_info_library --allow-root
```

**✅ 성공 시 출력:**
```
Success: Deleted 'elementor_pro_license_key' option.
Success: Deleted '_elementor_pro_license_data' option.
Success: Deleted 'elementor_remote_info_library' option.
```

---

## 🧹 3단계: 캐시 완전 비우기 (중요!)

```bash
# 1️⃣ 모든 Transient 삭제
wp transient delete --all --allow-root

# 2️⃣ WordPress 캐시 플러시
wp cache flush --allow-root

# 3️⃣ Elementor 캐시 삭제 (추가)
wp elementor flush-css --allow-root
```

**✅ 성공 시 출력:**
```
Success: 42 transients deleted from the database.
Success: The cache was flushed.
Success: Flushed the CSS cache.
```

---

## ✅ 4단계: 삭제 확인

```bash
# 라이선스 키가 없는지 확인
wp option get elementor_pro_license_key --allow-root
```

**✅ 성공적으로 삭제된 경우:**
```
Error: Could not get 'elementor_pro_license_key' option. Does it exist?
```
👆 이 에러가 나오면 **완벽하게 삭제된 것**입니다!

---

## 🎯 5단계: 안전 모드 해제 확인

```bash
# 안전 모드 관련 옵션 삭제
wp option delete elementor_safe_mode --allow-root
wp option delete _elementor_editor_upgrade_notice --allow-root
```

---

## 📊 전체 옵션 확인 (선택 사항)

Elementor 관련 모든 옵션 확인:
```bash
wp option list --search="*elementor*" --allow-root
```

---

## 🔍 문제 해결

### ❌ "Error: This does not seem to be a WordPress installation."
**해결:** 올바른 WordPress 경로로 이동했는지 확인
```bash
ls -la wp-config.php  # 이 파일이 있어야 함
```

### ❌ "Error: WP-CLI needs WordPress 5.2 or later to work properly."
**해결:** WordPress 버전 확인
```bash
wp core version --allow-root
```

### ❌ "--allow-root 옵션이 작동하지 않음"
**해결:** Cloudways는 기본적으로 root 권한 필요 (정상)
```bash
# --allow-root 없이 시도해보기
wp option delete elementor_pro_license_key
```

---

## 🎉 최종 확인 체크리스트

- [ ] SSH로 서버 접속 완료
- [ ] WordPress 경로 확인 및 이동
- [ ] 3개의 라이선스 옵션 삭제 완료
- [ ] 캐시 플러시 완료
- [ ] 삭제 확인 (Error 메시지 출력됨)
- [ ] 워드프레스 관리자에서 Elementor > 도구 > 안전 모드 OFF 확인

---

## 🚨 이 방법이 안 되면?

### Plan B: Cloudways phpMyAdmin 사용
1. Cloudways 대시보드 → **"Access Details"**
2. **"Launch Database Manager"** 클릭
3. SQL 탭에서 실행:
```sql
DELETE FROM wp_options WHERE option_name LIKE '%elementor%license%';
DELETE FROM wp_options WHERE option_name = 'elementor_safe_mode';
```

### Plan C: wp-config.php에 직접 추가
SSH에서 편집:
```bash
nano /home/master/applications/*/public_html/wp-config.php
```

`/* That's all, stop editing! */` 위에 추가:
```php
define('ELEMENTOR_SAFE_MODE', false);
```

저장: `Ctrl + O` → `Enter` → `Ctrl + X`

---

## 📚 참고 자료

- [WP-CLI 공식 문서](https://wp-cli.org/)
- [Cloudways SSH 접속 가이드](https://support.cloudways.com/en/articles/5124500-how-to-access-your-application-using-ssh)

---

**이 명령어들은 서버에서 직접 실행해야 하며, Windows 로컬 터미널에서는 작동하지 않습니다.**


