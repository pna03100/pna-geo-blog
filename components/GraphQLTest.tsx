// ============================================
// [Trinity] GraphQL Proxy Test Component
// Server Component와 Client Component 모두 테스트
// ============================================

'use client';

import { useState } from 'react';

interface GraphQLTestResult {
  data?: {
    generalSettings?: {
      title: string;
      url: string;
      description: string;
    };
  };
  errors?: Array<{ message: string }>;
}

export function GraphQLTest() {
  const [result, setResult] = useState<GraphQLTestResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testGraphQL = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // [Client Component] /api/graphql 프록시를 통해 호출
      const response = await fetch('/api/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query TestConnection {
              generalSettings {
                title
                url
                description
              }
            }
          `,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.errors) {
        throw new Error(data.errors[0].message);
      }

      setResult(data);
      if (process.env.NODE_ENV === 'development') {
        console.log('✅ GraphQL Proxy Test Success:', data);
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      if (process.env.NODE_ENV === 'development') {
        console.error('❌ GraphQL Proxy Test Failed:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">🧪 GraphQL Proxy 테스트</h2>
        
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">
            <strong>🌐 Client Component:</strong> /api/graphql 프록시 사용
          </p>
          <p className="text-xs text-gray-500">
            브라우저에서 Next.js 프록시를 통해 WordPress API 호출 (CORS 우회)
          </p>
        </div>

        <button
          onClick={testGraphQL}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {loading ? '⏳ 테스트 중...' : '🚀 프록시 테스트 실행'}
        </button>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
            <p className="text-red-800 font-semibold">❌ 에러 발생:</p>
            <p className="text-red-600 text-sm mt-1">{error}</p>
          </div>
        )}

        {result && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
            <p className="text-green-800 font-semibold mb-2">✅ 성공!</p>
            <div className="bg-white p-3 rounded border border-green-300 overflow-auto">
              <pre className="text-xs text-gray-800">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-2">📋 동작 원리:</h3>
        <ol className="text-sm text-gray-700 space-y-2 list-decimal list-inside">
          <li>
            <strong>Server Component:</strong> 
            <code className="ml-2 px-2 py-1 bg-gray-200 rounded text-xs">
              https://cms.pnamarketing.co.kr/graphql
            </code>
            <span className="block ml-6 text-xs text-gray-600">
              → Node.js에서 직접 WordPress API 호출 (빠름, CORS 무관)
            </span>
          </li>
          <li>
            <strong>Client Component:</strong>
            <code className="ml-2 px-2 py-1 bg-gray-200 rounded text-xs">
              /api/graphql
            </code>
            <span className="block ml-6 text-xs text-gray-600">
              → Next.js 프록시를 통해 WordPress API 호출 (CORS 우회)
            </span>
          </li>
        </ol>
      </div>
    </div>
  );
}

