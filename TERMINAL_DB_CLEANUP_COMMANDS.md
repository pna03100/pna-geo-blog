# 🚀 터미널 DB 정리 명령어 완전판
## Elementor Pro 라이선스 강제 삭제 (터미널 전용)

---

## ⚡ **즉시 실행 (One-Liner Commands)**

### 🔥 **방법 A: WP-CLI 사용 (가장 안전)**

워드프레스 루트 디렉토리에서 실행:

```bash
cd /home/master/applications/[앱이름]/public_html && \
wp option delete elementor_pro_license_key --allow-root && \
wp option delete _elementor_pro_license_data --allow-root && \
wp option delete elementor_remote_info_library --allow-root && \
wp db query "SELECT option_name FROM wp_options WHERE option_name LIKE '%elementor%license%';" --allow-root
```

---

### 🔥 **방법 B: MySQL 직접 접속 (WP-CLI 없을 때)**

#### **1단계: DB 정보 확인**
```bash
cd /home/master/applications/[앱이름]/public_html && \
grep -E "DB_NAME|DB_USER|DB_PASSWORD|DB_HOST" wp-config.php
```

#### **2단계: 복사한 정보로 MySQL 접속 & 삭제**
```bash
mysql -h[호스트] -u[사용자] -p[비밀번호] [DB명] -e "\
DELETE FROM wp_options WHERE option_name = 'elementor_pro_license_key'; \
DELETE FROM wp_options WHERE option_name = '_elementor_pro_license_data'; \
DELETE FROM wp_options WHERE option_name = 'elementor_remote_info_library'; \
SELECT option_name FROM wp_options WHERE option_name LIKE '%elementor%license%';"
```

> **주의:** `-p[비밀번호]` 사이에 공백 없음!

---

### 🔥 **방법 C: 자동화 스크립트 (추천)**

#### **Windows에서 워드프레스 서버로 스크립트 전송:**

1. **이 프로젝트에 생성된 `cleanup-elementor-license.sh` 파일을 워드프레스 서버에 업로드:**
   ```bash
   # 로컬 (Windows PowerShell)에서 실행
   scp cleanup-elementor-license.sh [사용자명]@[서버IP]:/home/master/applications/[앱이름]/public_html/
   ```

2. **SSH 접속 후 스크립트 실행:**
   ```bash
   ssh [사용자명]@[서버IP] -p [포트번호]
   cd /home/master/applications/[앱이름]/public_html
   chmod +x cleanup-elementor-license.sh
   ./cleanup-elementor-license.sh
   ```

---

## 📋 **수동 단계별 실행 (초보자용)**

### **STEP 1: SSH 접속**
```bash
ssh [사용자명]@[서버IP] -p [포트번호]
```

### **STEP 2: 워드프레스 루트로 이동**
```bash
cd /home/master/applications/[앱이름]/public_html
ls -al wp-config.php
```

### **STEP 3: WP-CLI 확인**
```bash
wp --info
```

- ✅ **성공 시:** 방법 A 실행
- ❌ **실패 시:** 방법 B로 진행

### **STEP 4-A: WP-CLI로 삭제**
```bash
wp option delete elementor_pro_license_key --allow-root
wp option delete _elementor_pro_license_data --allow-root
wp option delete elementor_remote_info_library --allow-root
```

### **STEP 4-B: MySQL로 삭제**
```bash
# DB 정보 확인
cat wp-config.php | grep -E "DB_NAME|DB_USER|DB_PASSWORD|DB_HOST"

# MySQL 접속 (정보 입력 후)
mysql -h localhost -u [사용자명] -p

# MySQL 프롬프트에서 실행:
USE [DB명];
DELETE FROM wp_options WHERE option_name = 'elementor_pro_license_key';
DELETE FROM wp_options WHERE option_name = '_elementor_pro_license_data';
DELETE FROM wp_options WHERE option_name = 'elementor_remote_info_library';
SELECT option_name FROM wp_options WHERE option_name LIKE '%elementor%license%';
EXIT;
```

### **STEP 5: 확인**
```bash
wp db query "SELECT option_name FROM wp_options WHERE option_name LIKE '%elementor%';" --allow-root | grep -i license
```

결과가 비어있으면 ✅ **성공!**

---

## 🔒 **보안 주의사항**

1. **비밀번호 노출 방지:** `-p` 옵션만 쓰면 프롬프트로 입력 가능
   ```bash
   mysql -h localhost -u root -p
   # (비밀번호 입력 프롬프트 표시됨)
   ```

2. **명령어 히스토리 삭제:**
   ```bash
   history -c
   ```

3. **작업 후 SSH 로그아웃:**
   ```bash
   exit
   ```

---

## 🎯 **작업 완료 후 체크리스트**

- [ ] `wp_options` 테이블에서 라이선스 키 삭제 확인
- [ ] 워드프레스 관리자 페이지 접속 가능 확인
- [ ] Elementor 편집기 열림 확인 (Safe Mode 해제)
- [ ] (선택) 새 라이선스 키 재등록

---

## 💡 **트러블슈팅**

### ❌ "Access denied for user"
→ DB 비밀번호 재확인 또는 Cloudways 대시보드에서 phpMyAdmin 사용

### ❌ "Command 'wp' not found"
→ 방법 B (MySQL 직접 접속) 사용

### ❌ "Table 'wp_options' doesn't exist"
→ 테이블 접두사 확인 (`wp-config.php`의 `$table_prefix`)
```bash
grep "table_prefix" wp-config.php
# 예: $table_prefix = 'wp_abc_';
# 쿼리 수정: DELETE FROM wp_abc_options WHERE ...
```

---

## 📞 **긴급 연락**

문제 발생 시:
1. DB 백업 생성: `wp db export backup.sql --allow-root`
2. Cloudways 지원팀 연락
3. 또는 phpMyAdmin으로 GUI 작업

---

**생성일:** 2026-01-05  
**Trinity-Core System Management Protocol v1.0**







