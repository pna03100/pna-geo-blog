// ============================================
// [Security] WordPress GraphQL API Client
// OWASP A03 Defense: Input Validation with Zod
// Trinity Core: Type-Safe + Validated + Defensive
// ============================================

import { z } from 'zod';
import { env } from './env';
import {
  WPContent,
  MenuItem,
  MenuResponse,
  GraphQLResponse,
} from './types';

// ============================================
// [Security] Zod Schema - Runtime Validation
// ============================================

// WPContent 검증 스키마
const WPContentSchema = z.object({
  __typename: z.enum(['Page', 'Post']),
  uri: z.string(),
  slug: z.string(),
  databaseId: z.number(),
  title: z.string().nullable(),
  content: z.string().nullable().optional(),
  date: z.string().optional(),
  excerpt: z.string().optional(),
  author: z.object({
    node: z.object({
      name: z.string(),
      avatar: z.object({
        url: z.string(),
      }).nullable(),
    }),
  }).optional(),
  featuredImage: z.object({
    node: z.object({
      sourceUrl: z.string(),
      altText: z.string().nullable(),
      mediaDetails: z.object({
        width: z.number(),
        height: z.number(),
      }).nullable().optional(),
    }),
  }).nullable().optional(),
  categories: z.object({
    nodes: z.array(z.object({
      name: z.string(),
      slug: z.string(),
    })),
  }).optional(),
  seo: z.object({
    title: z.string().nullable(),
    metaDesc: z.string().nullable(),
    opengraphTitle: z.string().nullable(),
    opengraphDescription: z.string().nullable(),
    opengraphImage: z.object({
      sourceUrl: z.string(),
    }).nullable(),
    canonical: z.string().nullable(),
    schema: z.object({
      raw: z.string(),
    }).nullable(),
  }).nullable().optional(),
});

// MenuItem 검증 스키마
const MenuItemSchema = z.object({
  id: z.string(),
  label: z.string(),
  url: z.string(),
  path: z.string().nullable(),
});

// ============================================
// [Trinity] Smart Endpoint Selection
// Server: Direct WordPress API (성능 최적화)
// Client: Next.js Proxy (CORS 우회)
// ============================================
function getGraphQLEndpoint(): string {
  // [Server Component] Node.js 환경 → 직접 WordPress 호출
  if (typeof window === 'undefined') {
    return 'https://cms.pnamarketing.co.kr/graphql';
  }
  // [Client Component] 브라우저 환경 → Next.js Proxy 사용
  return '/api/graphql';
}

// ============================================
// [Security] Fetch Wrapper with Validation
// ============================================
async function fetchAPI<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T | null> {
  // [Trinity] 환경에 따라 자동으로 엔드포인트 선택
  const url = getGraphQLEndpoint();
  const isServer = typeof window === 'undefined';

  // [DEBUG] Body 준비
  const requestBody = JSON.stringify({ 
    query, 
    variables 
  });

  // [Security] Only log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`🚀 [API Request] ${isServer ? '🖥️ Server' : '🌐 Client'}`);
    console.log('📍 URL:', url);
    console.log('📝 Query:', query.substring(0, 100) + '...');
    console.log('🔧 Variables:', JSON.stringify(variables, null, 2));
    console.log('📦 Request Body Length:', requestBody.length);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: requestBody,
      // [Security] Next.js 캐싱 옵션 제거 (디버깅 중)
      cache: 'no-store',
    });

    if (process.env.NODE_ENV === 'development') {
      console.log('✅ Response Status:', response.status, response.statusText);
      console.log('📋 Response Headers:', Object.fromEntries(response.headers.entries()));
    }

    // [DEBUG] 응답 본문을 먼저 텍스트로 읽기
    const responseText = await response.text();
    
    if (process.env.NODE_ENV === 'development') {
      console.log('📄 Response Body Length:', responseText.length);
      console.log('📄 Response Body Preview:', responseText.substring(0, 500));
    }

    if (!response.ok) {
      if (process.env.NODE_ENV === 'development') {
        console.error('❌ HTTP Error:', response.status);
        console.error('📄 Full Response:', responseText);
      }
      return null;
    }

    // [DEBUG] JSON 파싱
    let json: GraphQLResponse<T>;
    try {
      json = JSON.parse(responseText);
      if (process.env.NODE_ENV === 'development') {
        console.log('✅ JSON Parsed Successfully');
      }
    } catch (parseError) {
      if (process.env.NODE_ENV === 'development') {
        console.error('❌ JSON Parse Failed:', parseError);
        console.error('📄 Raw Text:', responseText.substring(0, 500));
      }
      return null;
    }

    if (json.errors) {
      if (process.env.NODE_ENV === 'development') {
        console.error('❌ GraphQL Errors:', JSON.stringify(json.errors, null, 2));
      }
      return null;
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('✅ Data Received:', Object.keys(json.data || {}));
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    }

    return json.data;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      if (error instanceof Error) {
        console.error('💥 [Fetch Exception]');
        console.error('Error Type:', error.name);
        console.error('Error Message:', error.message);
        console.error('Stack:', error.stack);
      } else {
        console.error('💥 Unknown Error:', error);
      }
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    }
    return null;
  }
}

// ============================================
// [Security] Dummy Data (Fallback)
// ============================================
const DUMMY_POST: WPContent = {
  __typename: 'Post',
  uri: '/api-connection-failed',
  slug: 'api-connection-failed',
  databaseId: 0,
  title: '⚠️ WordPress API 연결 실패',
  content: '<p>환경변수를 확인하세요. WORDPRESS_API_URL이 올바르게 설정되어 있는지 확인하세요.</p>',
  date: new Date().toISOString(),
  author: {
    node: {
      name: 'System',
      avatar: null,
    },
  },
};

const DUMMY_MENU_ITEMS: MenuItem[] = [
  { id: '1', label: '홈', url: '/', path: '/' },
];

// ============================================
// Get Content by URI (Page or Post)
// ============================================
export async function getContentByURI(uri: string): Promise<WPContent | null> {
  const query = `
    query GetContentByURI($uri: ID!) {
      contentNode(id: $uri, idType: URI) {
        __typename
        uri
        databaseId
        ... on Page {
          slug
          title
          content
        }
        ... on Post {
          slug
          title
          content
          date
          author {
            node {
              name
              avatar {
                url
              }
            }
          }
          featuredImage {
            node {
              sourceUrl
              altText
              mediaDetails {
                width
                height
              }
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
        }
      }
    }
  `;

  try {
    const data = await fetchAPI<{ contentNode: unknown }>(query, { uri });

    if (!data || !data.contentNode) {
      if (process.env.NODE_ENV === 'development') {
        console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.error('❌ [Data Not Found]');
        console.error('📍 URI:', uri);
        console.error('💡 Possible Causes:');
        console.error('  1. WordPress API URL이 잘못되었습니다');
        console.error('  2. 해당 URI의 콘텐츠가 WordPress에 존재하지 않습니다');
        console.error('  3. WPGraphQL 플러그인이 비활성화되었습니다');
        console.error('  4. CORS 문제로 요청이 차단되었습니다');
        console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      }
      return null;
    }

    // [Security] Zod 검증
    const validated = WPContentSchema.safeParse(data.contentNode);

    if (!validated.success) {
      if (process.env.NODE_ENV === 'development') {
        console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.error('❌ [Validation Failed] contentNode');
        console.error('📍 URI:', uri);
        console.error('🔍 Validation Errors:', JSON.stringify(validated.error.errors, null, 2));
        console.error('📦 Raw Data:', JSON.stringify(data.contentNode, null, 2).substring(0, 500));
        console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      }
      return null;
    }

    return validated.data;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.error('💥 [getContentByURI Exception]');
      console.error('📍 URI:', uri);
      if (error instanceof Error) {
        console.error('Error Name:', error.name);
        console.error('Error Message:', error.message);
        console.error('Stack Trace:', error.stack);
      } else {
        console.error('Unknown Error:', error);
      }
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    }
    return null;
  }
}

// ============================================
// Get All Posts (for Sitemap / Homepage)
// ============================================
export async function getAllPosts(): Promise<WPContent[]> {
  const query = `
    query GetAllPosts {
      posts(first: 100, where: { status: PUBLISH }) {
        nodes {
          __typename
          uri
          slug
          databaseId
          title
          date
          excerpt
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
        }
      }
    }
  `;

  try {
    const data = await fetchAPI<{ posts: { nodes: unknown[] } }>(query);

    if (!data || !data.posts || !data.posts.nodes) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('⚠️ No posts found. Returning empty array.');
      }
      return [];
    }

    // [Security] 배열의 각 아이템을 Zod로 검증
    const validated = data.posts.nodes
      .map((node, index) => {
        const result = WPContentSchema.safeParse(node);
        if (!result.success && process.env.NODE_ENV === 'development') {
          console.error(`❌ [Validation Failed] Post #${index}`);
          console.error('Validation Errors:', JSON.stringify(result.error.errors, null, 2));
          console.error('Raw Data:', JSON.stringify(node, null, 2).substring(0, 500));
        }
        return result;
      })
      .filter((result) => result.success)
      .map((result) => (result as z.SafeParseSuccess<WPContent>).data);

    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ getAllPosts: ${validated.length} posts validated successfully`);
    }
    return validated;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('getAllPosts Error:', error);
    }
    return [];
  }
}

// ============================================
// Get All Pages (for Sitemap)
// ============================================
export async function getAllPages(): Promise<WPContent[]> {
  const query = `
    query GetAllPages {
      pages(first: 100, where: { status: PUBLISH }) {
        nodes {
          __typename
          uri
          slug
          databaseId
          title
        }
      }
    }
  `;

  try {
    const data = await fetchAPI<{ pages: { nodes: unknown[] } }>(query);

    if (!data || !data.pages || !data.pages.nodes) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('⚠️ No pages found. Returning empty array.');
      }
      return [];
    }

    // [Security] 배열의 각 아이템을 Zod로 검증
    const validated = data.pages.nodes
      .map((node) => WPContentSchema.safeParse(node))
      .filter((result) => result.success)
      .map((result) => (result as z.SafeParseSuccess<WPContent>).data);

    return validated;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('getAllPages Error:', error);
    }
    return [];
  }
}

// Elementor 관련 함수 제거됨 (No longer using Elementor)

// ============================================
// Get Primary Menu
// ============================================
export async function getPrimaryMenu(): Promise<MenuItem[]> {
  const query = `
    query GetMenus {
      menus(first: 1) {
        nodes {
          menuItems {
            nodes {
              id
              label
              url
              path
            }
          }
        }
      }
    }
  `;

  try {
    const data = await fetchAPI<MenuResponse>(query);

    if (!data || !data.menus || !data.menus.nodes || data.menus.nodes.length === 0) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('⚠️ No menus found. Returning dummy menu.');
      }
      return DUMMY_MENU_ITEMS;
    }

    const menuItems = data.menus.nodes[0]?.menuItems?.nodes || [];

    // [Security] 배열의 각 아이템을 Zod로 검증
    const validated = menuItems
      .map((item) => MenuItemSchema.safeParse(item))
      .filter((result) => result.success)
      .map((result) => (result as z.SafeParseSuccess<MenuItem>).data);

    return validated.length > 0 ? validated : DUMMY_MENU_ITEMS;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('getPrimaryMenu Error:', error);
    }
    return DUMMY_MENU_ITEMS;
  }
}
