#!/bin/bash
# ============================================
# wp-config.php 자동 파싱 → MySQL One-Liner 생성기
# Trinity-Core Auto-Command Generator
# ============================================

echo "🔍 wp-config.php에서 DB 정보 추출 중..."
echo ""

# wp-config.php가 현재 디렉토리에 있는지 확인
if [ ! -f "wp-config.php" ]; then
    echo "❌ ERROR: wp-config.php를 찾을 수 없습니다!"
    echo "💡 워드프레스 루트 디렉토리로 이동 후 재실행하세요."
    exit 1
fi

# DB 정보 추출
DB_NAME=$(grep "DB_NAME" wp-config.php | cut -d "'" -f 4)
DB_USER=$(grep "DB_USER" wp-config.php | cut -d "'" -f 4)
DB_PASSWORD=$(grep "DB_PASSWORD" wp-config.php | cut -d "'" -f 4)
DB_HOST=$(grep "DB_HOST" wp-config.php | cut -d "'" -f 4)

echo "✅ DB 정보 추출 완료!"
echo ""
echo "======================================"
echo "📋 추출된 정보:"
echo "======================================"
echo "DB Name: $DB_NAME"
echo "DB User: $DB_USER"
echo "DB Host: $DB_HOST"
echo "DB Password: [보안상 숨김]"
echo ""

# One-Liner 명령어 생성
echo "======================================"
echo "🔥 복사해서 실행할 명령어:"
echo "======================================"
echo ""
echo "mysql -h\"$DB_HOST\" -u\"$DB_USER\" -p\"$DB_PASSWORD\" \"$DB_NAME\" -e \"DELETE FROM wp_options WHERE option_name IN ('elementor_pro_license_key', '_elementor_pro_license_data', 'elementor_remote_info_library'); SELECT option_name, LEFT(option_value, 30) as preview FROM wp_options WHERE option_name LIKE '%elementor%license%' OR option_name LIKE '%elementor%remote%';\""
echo ""
echo "======================================"
echo ""
echo "📌 위 명령어를 복사해서 터미널에 붙여넣기 하세요!"
echo ""


