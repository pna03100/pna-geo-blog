# ⚡ WP-CLI로 즉시 해결 (30초 완료)

> **MySQL 권한 에러 완전 우회!**
> DB 비밀번호 없이도 작동하는 최강 방법

---

## 🎯 선택하세요 (둘 중 하나)

### 방법 1️⃣: 자동 스크립트 (추천) ⭐

Windows PowerShell에서 실행:

```powershell
.\ssh-connect-and-fix.ps1
```

**화면에 나오는 대로 입력만 하면 끝!**

---

### 방법 2️⃣: 수동 명령어 (단계별)

#### 1. SSH 접속
```bash
ssh master@server-xxx.cloudwaysapps.com
# Cloudways 비밀번호 입력
```

#### 2. WordPress 경로 이동
```bash
cd /home/master/applications/*/public_html
```

#### 3. 라이선스 즉시 삭제 (한 줄씩 실행)
```bash
wp option delete elementor_pro_license_key --allow-root
wp option delete _elementor_pro_license_data --allow-root
wp option delete elementor_remote_info_library --allow-root
wp option delete elementor_safe_mode --allow-root
```

#### 4. 캐시 비우기
```bash
wp transient delete --all --allow-root
wp cache flush --allow-root
```

#### 5. 확인
```bash
wp option get elementor_pro_license_key --allow-root
```
**"Error: Could not get..." 메시지가 나오면 성공!**

---

## 📋 Cloudways SSH 정보 확인 방법

1. [Cloudways 대시보드](https://platform.cloudways.com/) 로그인
2. 해당 애플리케이션 선택
3. 상단 **"Access Details"** 탭 클릭
4. 아래 정보 복사:
   - **SSH Host:** server-xxx.cloudwaysapps.com
   - **SSH User:** master
   - **SSH Password:** (표시된 비밀번호)

---

## ✅ 성공 확인

- [ ] SSH 접속 완료
- [ ] 명령어 실행 완료
- [ ] "Success: Deleted..." 메시지 확인
- [ ] WordPress 관리자에서 Elementor 정상 작동

---

## 🚨 문제 발생 시

### ❌ "This does not seem to be a WordPress installation"
→ 경로 확인:
```bash
find /home -name wp-config.php 2>/dev/null | head -1
cd (위에서 나온 경로)
```

### ❌ "WP-CLI command not found"
→ WP-CLI 설치 확인:
```bash
which wp
wp --version
```

### ❌ 여전히 안전 모드가 켜져 있음
→ Plan B 실행: `🔧_WP-CLI_즉시_실행_명령어.md` 파일의 Plan B/C 참고

---

**이 방법이 MySQL보다 훨씬 안전하고 빠릅니다!**







