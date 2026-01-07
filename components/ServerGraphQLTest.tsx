// ============================================
// [Trinity] Server Component GraphQL Test
// Server에서 직접 WordPress API 호출 확인
// ============================================

import { getContentByURI } from '@/lib/api';

export async function ServerGraphQLTest() {
  // [Server Component] lib/api.ts가 자동으로 직접 WordPress 호출
  console.log('🖥️ [Server Component] Testing GraphQL API...');
  
  const content = await getContentByURI('/');
  
  return (
    <div className="p-6 max-w-2xl mx-auto mt-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">🖥️ Server Component 테스트</h2>
        
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">
            <strong>🖥️ Server Component:</strong> 직접 WordPress API 호출
          </p>
          <p className="text-xs text-gray-500">
            Node.js에서 https://cms.pnamarketing.co.kr/graphql 직접 호출 (CORS 무관)
          </p>
        </div>

        {content ? (
          <div className="p-4 bg-green-50 border border-green-200 rounded">
            <p className="text-green-800 font-semibold mb-2">✅ 데이터 로드 성공!</p>
            <div className="bg-white p-3 rounded border border-green-300">
              <p className="text-sm">
                <strong>Title:</strong> {content.title || 'N/A'}
              </p>
              <p className="text-sm mt-1">
                <strong>URI:</strong> {content.uri}
              </p>
              <p className="text-sm mt-1">
                <strong>Type:</strong> {content.__typename}
              </p>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-yellow-800">⚠️ 데이터를 불러올 수 없습니다.</p>
            <p className="text-yellow-600 text-sm mt-1">
              WordPress API 연결을 확인하세요.
            </p>
          </div>
        )}

        <div className="mt-4 p-3 bg-gray-100 rounded text-xs text-gray-700">
          <p>💡 <strong>Note:</strong></p>
          <p className="mt-1">
            Server Component는 브라우저에서 실행되지 않으므로 CORS 제약이 없습니다.
            <br />
            따라서 Next.js 프록시 없이 직접 WordPress API를 호출할 수 있어 더 빠릅니다.
          </p>
        </div>
      </div>
    </div>
  );
}

