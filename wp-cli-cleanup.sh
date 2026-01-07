#!/bin/bash
# WP-CLI를 사용한 Elementor 라이선스 즉시 삭제 스크립트
# 서버에서 직접 실행하세요!

set -e  # 에러 발생 시 중단

echo "🔍 Step 1: WordPress 경로 확인 중..."
WP_PATH=$(find /home -name wp-config.php 2>/dev/null | head -1 | xargs dirname)

if [ -z "$WP_PATH" ]; then
    echo "❌ WordPress 설치를 찾을 수 없습니다."
    exit 1
fi

echo "✅ WordPress 경로: $WP_PATH"
cd "$WP_PATH"

echo ""
echo "🔥 Step 2: Elementor 라이선스 데이터 삭제 중..."

# 라이선스 키 삭제
echo "  → elementor_pro_license_key 삭제..."
wp option delete elementor_pro_license_key --allow-root 2>/dev/null || echo "    (이미 없음)"

# 라이선스 데이터 삭제
echo "  → _elementor_pro_license_data 삭제..."
wp option delete _elementor_pro_license_data --allow-root 2>/dev/null || echo "    (이미 없음)"

# 원격 정보 삭제
echo "  → elementor_remote_info_library 삭제..."
wp option delete elementor_remote_info_library --allow-root 2>/dev/null || echo "    (이미 없음)"

# 안전 모드 삭제
echo "  → elementor_safe_mode 삭제..."
wp option delete elementor_safe_mode --allow-root 2>/dev/null || echo "    (이미 없음)"

echo ""
echo "🧹 Step 3: 캐시 비우기..."

# Transient 삭제
echo "  → Transient 삭제 중..."
wp transient delete --all --allow-root

# 캐시 플러시
echo "  → 캐시 플러시 중..."
wp cache flush --allow-root

# Elementor CSS 캐시 삭제
echo "  → Elementor CSS 캐시 삭제 중..."
wp elementor flush-css --allow-root 2>/dev/null || echo "    (Elementor CLI 명령어 없음)"

echo ""
echo "✅ Step 4: 삭제 확인..."
if wp option get elementor_pro_license_key --allow-root 2>&1 | grep -q "Could not get"; then
    echo "✅ 라이선스 데이터가 완벽하게 삭제되었습니다!"
else
    echo "⚠️  라이선스 키가 아직 존재합니다."
fi

echo ""
echo "🎉 완료! 이제 WordPress 관리자에서 Elementor를 확인하세요."
echo "   Elementor > 도구 > 안전 모드가 OFF 되어 있어야 합니다."







