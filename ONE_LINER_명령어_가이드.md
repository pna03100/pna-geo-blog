# 🔥 MySQL One-Liner 명령어 즉시 실행 가이드

---

## ⚡ **가장 빠른 방법 (Windows PowerShell)**

### 1단계: PowerShell 스크립트 실행

현재 프로젝트 폴더에서:

```powershell
.\generate-mysql-command.ps1
```

→ **SSH 정보 입력 → DB 정보 자동 추출 → 명령어 자동 생성 → 클립보드 복사 → 즉시 실행 옵션**

---

## 📋 **수동으로 명령어 만들기**

### STEP 1: SSH 접속

```bash
ssh [사용자명]@[서버IP] -p [포트]
```

### STEP 2: DB 정보 확인

```bash
cd /home/master/applications/[앱이름]/public_html
grep -E "DB_NAME|DB_USER|DB_PASSWORD|DB_HOST" wp-config.php
```

**출력 예시:**
```php
define( 'DB_NAME', 'mydatabase' );
define( 'DB_USER', 'myuser' );
define( 'DB_PASSWORD', 'mypassword123' );
define( 'DB_HOST', 'localhost' );
```

### STEP 3: One-Liner 명령어 실행

위에서 확인한 정보를 아래 템플릿에 대입:

```bash
mysql -h"localhost" -u"myuser" -p"mypassword123" "mydatabase" -e "DELETE FROM wp_options WHERE option_name IN ('elementor_pro_license_key', '_elementor_pro_license_data', 'elementor_remote_info_library'); SELECT option_name, LEFT(option_value, 30) as preview FROM wp_options WHERE option_name LIKE '%elementor%license%' OR option_name LIKE '%elementor%remote%';"
```

---

## 🎯 **명령어 템플릿 (복사용)**

### ✅ **표준 버전 (권장)**

```bash
mysql -h"[호스트]" -u"[사용자]" -p"[비밀번호]" "[DB명]" -e "DELETE FROM wp_options WHERE option_name IN ('elementor_pro_license_key', '_elementor_pro_license_data', 'elementor_remote_info_library'); SELECT option_name FROM wp_options WHERE option_name LIKE '%elementor%license%';"
```

### 🔒 **보안 버전 (비밀번호 프롬프트)**

```bash
mysql -h"[호스트]" -u"[사용자]" -p "[DB명]" -e "DELETE FROM wp_options WHERE option_name IN ('elementor_pro_license_key', '_elementor_pro_license_data', 'elementor_remote_info_library'); SELECT option_name FROM wp_options WHERE option_name LIKE '%elementor%license%';"
```
→ 실행 후 비밀번호 입력 프롬프트 표시됨

---

## 📊 **실행 결과 예시**

### ✅ **성공 시:**

```
Query OK, 3 rows affected (0.01 sec)

Empty set (0.00 sec)
```
→ **3개 삭제됨, 남은 라이선스 데이터 없음**

### ⚠️ **이미 삭제된 경우:**

```
Query OK, 0 rows affected (0.00 sec)

Empty set (0.00 sec)
```
→ **이미 깨끗함**

### ❌ **에러 발생 시:**

```
ERROR 1045 (28000): Access denied for user 'myuser'@'localhost'
```
→ **비밀번호 재확인 필요**

```
ERROR 1146 (42S02): Table 'mydatabase.wp_options' doesn't exist
```
→ **테이블 접두사 확인 (`wp-config.php`의 `$table_prefix`)**

---

## 🔧 **트러블슈팅**

### 문제 1: 테이블 접두사가 다른 경우

```bash
# wp-config.php에서 확인:
grep "table_prefix" wp-config.php
# 출력: $table_prefix = 'wp_abc_';

# 명령어 수정:
mysql ... -e "DELETE FROM wp_abc_options WHERE ..."
```

### 문제 2: 비밀번호에 특수문자 포함

```bash
# 작은따옴표로 감싸기:
mysql -h"localhost" -u"myuser" -p'my$pass@123' "mydatabase" -e "..."
```

### 문제 3: 원격 DB 호스트

```bash
# DB_HOST가 'localhost'가 아닌 경우 (예: 127.0.0.1:3306)
mysql -h"127.0.0.1" -P3306 -u"myuser" -p"mypass" "mydatabase" -e "..."
```

---

## 🛡️ **보안 체크리스트**

- [ ] 명령어 실행 후 터미널 히스토리 삭제:
  ```bash
  history -c
  ```

- [ ] 비밀번호가 포함된 명령어를 파일로 저장하지 않기

- [ ] 작업 완료 후 SSH 세션 종료:
  ```bash
  exit
  ```

---

## 📌 **빠른 참조 카드**

| 상황 | 명령어 |
|------|--------|
| **자동 생성 (Windows)** | `.\generate-mysql-command.ps1` |
| **자동 생성 (Linux)** | SSH 접속 → `./generate-mysql-command.sh` |
| **수동 확인** | `grep -E "DB_" wp-config.php` |
| **즉시 실행** | 위 템플릿 복사 → 정보 대입 → 실행 |
| **삭제 확인** | `wp db query "SELECT * FROM wp_options WHERE option_name LIKE '%elementor%license%';" --allow-root` |

---

## 🚀 **전체 워크플로우 (30초 완성)**

```bash
# 1. SSH 접속
ssh user@server -p 22

# 2. 워드프레스 경로 이동
cd /home/master/applications/myapp/public_html

# 3. DB 정보 추출 & 저장
DB_NAME=$(grep "DB_NAME" wp-config.php | cut -d "'" -f 4)
DB_USER=$(grep "DB_USER" wp-config.php | cut -d "'" -f 4)
DB_PASSWORD=$(grep "DB_PASSWORD" wp-config.php | cut -d "'" -f 4)
DB_HOST=$(grep "DB_HOST" wp-config.php | cut -d "'" -f 4)

# 4. One-Liner 실행
mysql -h"$DB_HOST" -u"$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" -e "DELETE FROM wp_options WHERE option_name IN ('elementor_pro_license_key', '_elementor_pro_license_data', 'elementor_remote_info_library'); SELECT option_name FROM wp_options WHERE option_name LIKE '%elementor%license%';"

# 5. 결과 확인
echo "✅ 완료! 워드프레스 관리자 페이지에서 Elementor 확인하세요."
```

---

## 💡 **Pro Tip: 변수 활용**

```bash
# DB 정보를 변수로 저장하면 여러 번 재사용 가능
export DB_NAME="mydatabase"
export DB_USER="myuser"
export DB_PASSWORD="mypassword"
export DB_HOST="localhost"

# 이후 간단하게 실행
mysql -h"$DB_HOST" -u"$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" -e "DELETE FROM wp_options WHERE option_name = 'elementor_pro_license_key';"
```

---

**생성일:** 2026-01-05  
**Trinity-Core System Management v1.1**  
**Windows PowerShell 완전 호환**







