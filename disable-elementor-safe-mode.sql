-- ============================================
-- Elementor 안전모드 완전 비활성화 SQL
-- WordPress phpMyAdmin에서 실행
-- ============================================

-- 1. 안전모드 플래그 제거
DELETE FROM wp_options 
WHERE option_name = 'elementor_safe_mode';

-- 2. 라이센스 에러 상태 제거
DELETE FROM wp_options 
WHERE option_name LIKE 'elementor_pro_license%';

-- 3. Elementor 캐시 완전 삭제
DELETE FROM wp_options 
WHERE option_name LIKE '_transient_elementor%';

DELETE FROM wp_options 
WHERE option_name LIKE '_transient_timeout_elementor%';

-- 4. 안전모드 기록 제거
DELETE FROM wp_usermeta 
WHERE meta_key = 'elementor_admin_notices';

-- 5. 확인
SELECT option_name, option_value 
FROM wp_options 
WHERE option_name LIKE '%elementor%safe%' 
   OR option_name LIKE '%elementor_pro_license%'
LIMIT 10;

-- ✅ 결과가 0개면 성공!






