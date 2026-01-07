#!/bin/bash
# ============================================
# Elementor Pro 라이선스 DB 강제 정리 스크립트
# Trinity-Core System Management Script
# ============================================

echo "🔍 [STEP 1] 워드프레스 루트 디렉토리 확인..."
if [ ! -f "wp-config.php" ]; then
    echo "❌ ERROR: wp-config.php를 찾을 수 없습니다!"
    echo "💡 워드프레스 루트 디렉토리로 이동 후 재실행하세요."
    echo "   예: cd /home/master/applications/[앱이름]/public_html"
    exit 1
fi

echo "✅ wp-config.php 발견!"
echo ""

# ============================================
# STEP 2: WP-CLI 확인 및 삭제 시도
# ============================================
echo "🔍 [STEP 2] WP-CLI 사용 가능 여부 확인..."

if command -v wp &> /dev/null; then
    echo "✅ WP-CLI 발견! WP-CLI로 삭제를 진행합니다."
    echo ""
    
    # Elementor Pro 라이선스 관련 옵션 삭제
    echo "🗑️  삭제 대상:"
    echo "  - elementor_pro_license_key"
    echo "  - _elementor_pro_license_data"
    echo "  - elementor_remote_info_library"
    echo ""
    
    wp option delete elementor_pro_license_key --allow-root
    wp option delete _elementor_pro_license_data --allow-root
    wp option delete elementor_remote_info_library --allow-root
    
    echo ""
    echo "✅ WP-CLI 삭제 완료!"
    echo ""
    
    # 확인
    echo "🔍 [STEP 4] 삭제 확인 (남은 Elementor 관련 옵션):"
    wp db query "SELECT option_name FROM wp_options WHERE option_name LIKE '%elementor%license%' OR option_name LIKE '%elementor%remote%';" --allow-root
    
else
    echo "⚠️  WP-CLI를 찾을 수 없습니다. MySQL 직접 접속 방법으로 전환합니다."
    echo ""
    
    # ============================================
    # STEP 3: wp-config.php에서 DB 정보 파싱
    # ============================================
    echo "🔍 [STEP 3] wp-config.php에서 DB 접속 정보 파싱..."
    
    DB_NAME=$(grep "DB_NAME" wp-config.php | cut -d "'" -f 4)
    DB_USER=$(grep "DB_USER" wp-config.php | cut -d "'" -f 4)
    DB_PASSWORD=$(grep "DB_PASSWORD" wp-config.php | cut -d "'" -f 4)
    DB_HOST=$(grep "DB_HOST" wp-config.php | cut -d "'" -f 4)
    
    echo "✅ DB 정보 파싱 완료 (출력 생략, 보안 유지)"
    echo ""
    
    # ============================================
    # MySQL One-Liner DELETE 쿼리 실행
    # ============================================
    echo "🗑️  MySQL 직접 접속하여 라이선스 데이터 삭제 중..."
    
    mysql -h"$DB_HOST" -u"$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" <<EOF
DELETE FROM wp_options WHERE option_name = 'elementor_pro_license_key';
DELETE FROM wp_options WHERE option_name = '_elementor_pro_license_data';
DELETE FROM wp_options WHERE option_name = 'elementor_remote_info_library';
EOF
    
    echo "✅ MySQL 삭제 완료!"
    echo ""
    
    # ============================================
    # STEP 4: 삭제 확인
    # ============================================
    echo "🔍 [STEP 4] 삭제 확인 (남은 Elementor 관련 옵션):"
    
    mysql -h"$DB_HOST" -u"$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" <<EOF
SELECT option_name, LEFT(option_value, 50) as value_preview 
FROM wp_options 
WHERE option_name LIKE '%elementor%license%' 
   OR option_name LIKE '%elementor%remote%';
EOF
fi

echo ""
echo "======================================"
echo "✅ 작업 완료!"
echo "======================================"
echo ""
echo "📌 다음 단계:"
echo "1. 워드프레스 관리자 페이지 접속"
echo "2. Elementor > 도구 > 라이선스 재인증"
echo "3. 또는 라이선스 없이 사용 (Pro 기능 제한)"
echo ""







