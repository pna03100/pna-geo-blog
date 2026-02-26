// ============================================
// [AG-STANDARD 10단계] Google Indexing API
// 글 발행 즉시 구글에 알림 → 1분 내 색인
// ============================================
// [사전 조건] 환경변수 GOOGLE_INDEXING_KEY_JSON 필요
// Google Cloud Console에서 서비스 계정 생성 후 JSON 키를 Base64로 인코딩하여 설정
// ============================================

interface IndexingResult {
    success: boolean;
    url: string;
    error?: string;
}

/**
 * Google Indexing API를 호출하여 URL 색인을 요청합니다.
 * @param url 색인할 URL (예: https://pnamarketing.co.kr/insights/post-slug)
 * @param type 'URL_UPDATED' | 'URL_DELETED'
 */
export async function notifyGoogleIndexing(
    url: string,
    type: 'URL_UPDATED' | 'URL_DELETED' = 'URL_UPDATED'
): Promise<IndexingResult> {
    const keyJson = process.env.GOOGLE_INDEXING_KEY_JSON;

    if (!keyJson) {
        console.warn('⚠️ [Indexing API] GOOGLE_INDEXING_KEY_JSON 환경변수가 설정되지 않았습니다. 건너뜁니다.');
        return { success: false, url, error: 'Missing GOOGLE_INDEXING_KEY_JSON' };
    }

    try {
        // Base64로 인코딩된 서비스 계정 키 디코딩
        const credentials = JSON.parse(Buffer.from(keyJson, 'base64').toString('utf-8'));

        // JWT 토큰 생성 (Google OAuth2)
        const jwt = await createJWT(credentials);
        const accessToken = await getAccessToken(jwt);

        // Indexing API 호출
        const response = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ url, type }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`❌ [Indexing API] Error ${response.status}:`, errorText);
            return { success: false, url, error: `HTTP ${response.status}: ${errorText}` };
        }

        await response.json();
        console.log(`✅ [Indexing API] ${type} 성공:`, url);
        return { success: true, url };
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        console.error('❌ [Indexing API] Exception:', message);
        return { success: false, url, error: message };
    }
}

// ============================================
// JWT 헬퍼 (외부 라이브러리 없이 구현)
// ============================================
async function createJWT(credentials: { client_email: string; private_key: string }): Promise<string> {
    const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
    const now = Math.floor(Date.now() / 1000);
    const payload = Buffer.from(JSON.stringify({
        iss: credentials.client_email,
        scope: 'https://www.googleapis.com/auth/indexing',
        aud: 'https://oauth2.googleapis.com/token',
        iat: now,
        exp: now + 3600,
    })).toString('base64url');

    const signInput = `${header}.${payload}`;

    // Node.js crypto로 RS256 서명
    const crypto = await import('crypto');
    const sign = crypto.createSign('RSA-SHA256');
    sign.update(signInput);
    const signature = sign.sign(credentials.private_key, 'base64url');

    return `${signInput}.${signature}`;
}

async function getAccessToken(jwt: string): Promise<string> {
    const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
    });

    if (!response.ok) {
        throw new Error(`OAuth2 token error: ${response.status}`);
    }

    const data = await response.json();
    return data.access_token;
}
