// @ts-nocheck
// ============================================
// WordPress GraphQL API Client (방어적 코드)
// ============================================

import { WPContent, MenuItem, MenuResponse } from './types';

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || '';

// 🔥 더미 데이터 (API 실패 시 사용)
const DUMMY_POST: WPContent = {
  __typename: 'Post',
  uri: '/dummy-post',
  slug: 'dummy-post',
  title: '임시 게시글 (API 연결 실패)',
  content: '<p>워드프레스 API에 연결할 수 없습니다. 환경변수를 확인하세요.</p>',
  date: new Date().toISOString(),
  author: {
    node: {
      name: '시스템',
    },
  },
};

const DUMMY_MENU_ITEMS: MenuItem[] = [
  { id: '1', label: '홈', url: '/', path: '/' },
];

// ============================================
// Fetch Wrapper with Extreme Error Handling
// ============================================
async function fetchAPI(query: string, variables: Record<string, any> = {}) {
  const url = WORDPRESS_API_URL;

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🚀 [API 요청 시작]');
  console.log('📍 URL:', url);
  console.log('📝 Query:', query.substring(0, 100) + '...');
  console.log('🔧 Variables:', JSON.stringify(variables, null, 2));
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  // URL 검증
  if (!url || url === '') {
    console.error('❌ WORDPRESS_API_URL 환경변수가 설정되지 않았습니다!');
    console.log('⚠️  더미 데이터를 반환합니다.');
    return null;
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
      next: { tags: ['wordpress'], revalidate: 3600 }, // 1시간 캐싱
    });

    console.log('✅ 응답 상태:', response.status, response.statusText);

    if (!response.ok) {
      console.error('❌ HTTP 에러:', response.status);
      const text = await response.text();
      console.error('📄 응답 내용:', text.substring(0, 200));
      return null;
    }

    const json = await response.json();

    if (json.errors) {
      console.error('❌ GraphQL 에러:', JSON.stringify(json.errors, null, 2));
      return null;
    }

    console.log('✅ 데이터 수신 성공:', Object.keys(json.data || {}));
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    return json.data;
  } catch (error: any) {
    console.error('💥 [Fetch 예외 발생]');
    console.error('에러 타입:', error?.name);
    console.error('에러 메시지:', error?.message);
    console.error('스택:', error?.stack);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    return null;
  }
}

// ============================================
// Get Content by URI (Page or Post)
// ============================================
export async function getContentByURI(uri: string): Promise<WPContent | null> {
  const query = `
    query GetContentByURI($uri: ID!) {
      contentNode(id: $uri, idType: URI) {
        __typename
        uri
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
    const data = await fetchAPI(query, { uri });

    if (!data || !data.contentNode) {
      console.log('🚨 API 실패, 더미 데이터 사용함 (getContentByURI)');
      console.warn(`⚠️  URI "${uri}"에 대한 콘텐츠를 찾을 수 없습니다. (더미 데이터 반환)`);
      return DUMMY_POST;
    }

    return data.contentNode;
  } catch (error) {
    console.log('🚨 API 실패, 더미 데이터 사용함 (getContentByURI - catch)');
    console.error('getContentByURI 실패:', error);
    return DUMMY_POST;
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
          uri
          slug
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
    const data = await fetchAPI(query);

    if (!data || !data.posts || !data.posts.nodes) {
      console.log('🚨 API 실패, 더미 데이터 사용함 (getAllPosts)');
      console.warn('⚠️  게시글을 가져올 수 없습니다. (빈 배열 반환)');
      return [];
    }

    return data.posts.nodes;
  } catch (error) {
    console.log('🚨 API 실패, 더미 데이터 사용함 (getAllPosts - catch)');
    console.error('getAllPosts 실패:', error);
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
          uri
          slug
          title
        }
      }
    }
  `;

  try {
    const data = await fetchAPI(query);

    if (!data || !data.pages || !data.pages.nodes) {
      console.log('🚨 API 실패, 더미 데이터 사용함 (getAllPages)');
      console.warn('⚠️  페이지를 가져올 수 없습니다. (빈 배열 반환)');
      return [];
    }

    return data.pages.nodes;
  } catch (error) {
    console.log('🚨 API 실패, 더미 데이터 사용함 (getAllPages - catch)');
    console.error('getAllPages 실패:', error);
    return [];
  }
}

// ============================================
// Get Primary Menu (메뉴 위치 오류 방지)
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
    const data: MenuResponse | null = await fetchAPI(query);

    if (!data || !data.menus || !data.menus.nodes || data.menus.nodes.length === 0) {
      console.log('🚨 메뉴 없음, 더미 데이터 사용');
      return DUMMY_MENU_ITEMS;
    }

    const menuItems = data.menus.nodes[0]?.menuItems?.nodes || [];
    return menuItems.length > 0 ? menuItems : DUMMY_MENU_ITEMS;
  } catch (error) {
    console.log('🚨 메뉴 조회 실패, 더미 데이터 사용');
    console.error('getPrimaryMenu 에러:', error);
    return DUMMY_MENU_ITEMS;
  }
}

