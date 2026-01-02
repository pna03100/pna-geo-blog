/**
 * 방탄 WordPress GraphQL API 함수
 * - 에러가 나도 빌드가 터지지 않음
 * - 디버깅 로그 완벽 출력
 * - Empty State 안전 처리
 */

import { ContentNode, AllPostsData, AllPagesData, MenuData } from './types';

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL;

// ========================================
// 핵심 fetchAPI 함수 (방탄조끼 장착)
// ========================================
async function fetchAPI<T>(query: string, variables?: Record<string, unknown>): Promise<T | null> {
  // 🔍 디버깅 로그 1: 어떤 URL로 요청하는지
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📡 [API 요청 시작]');
  console.log('URL:', WORDPRESS_API_URL);
  console.log('Query:', query.substring(0, 100) + '...');
  console.log('Variables:', JSON.stringify(variables, null, 2));

  // 환경변수 체크
  if (!WORDPRESS_API_URL) {
    console.error('❌ WORDPRESS_API_URL이 설정되지 않았습니다.');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    return null;
  }

  try {
    const response = await fetch(WORDPRESS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      next: {
        tags: ['wordpress'],
      },
    });

    // 🔍 디버깅 로그 2: HTTP 응답 상태
    console.log('📥 [응답 받음]');
    console.log('Status:', response.status, response.statusText);

    if (!response.ok) {
      console.error('❌ HTTP 에러:', response.status, response.statusText);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      return null;
    }

    const json = await response.json();

    // 🔍 디버깅 로그 3: GraphQL 에러 체크
    if (json.errors) {
      console.error('❌ GraphQL 에러:', JSON.stringify(json.errors, null, 2));
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      return null;
    }

    // 🔍 디버깅 로그 4: 성공
    console.log('✅ 데이터 받음:', json.data ? 'OK' : 'Empty');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    return json.data;
  } catch (error) {
    // 🔍 디버깅 로그 5: 네트워크 에러
    console.error('💥 [FETCH 실패 - 네트워크 에러]');
    console.error('Error:', error);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    return null;
  }
}

// ========================================
// GraphQL 쿼리 정의
// ========================================

// SEO Fragment (Rank Math)
const SEO_FIELDS = `
  seo {
    title
    description
    canonical
    focusKeywords
    openGraphTitle
    openGraphDescription
    openGraphImage {
      sourceUrl
    }
    schema {
      raw
    }
  }
`;

// Post Fields
const POST_FIELDS = `
  id
  title
  content
  slug
  uri
  date
  modified
  excerpt
  ${SEO_FIELDS}
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
  author {
    node {
      name
      description
      avatar {
        url
      }
    }
  }
  categories {
    nodes {
      name
      slug
    }
  }
`;

// Page Fields
const PAGE_FIELDS = `
  id
  title
  content
  slug
  uri
  date
  modified
  ${SEO_FIELDS}
`;

// ========================================
// API 함수들 (방어적 코드)
// ========================================

/**
 * URI로 콘텐츠 가져오기 (Post 또는 Page)
 */
export async function getContentByURI(uri: string): Promise<ContentNode | null> {
  const data = await fetchAPI<{ contentNode: ContentNode | null }>(
    `
    query GetContentByURI($uri: ID!) {
      contentNode(id: $uri, idType: URI) {
        __typename
        ... on Post {
          ${POST_FIELDS}
        }
        ... on Page {
          ${PAGE_FIELDS}
        }
      }
    }
  `,
    { uri }
  );

  // 🛡️ 방어: 데이터가 없으면 null 반환
  if (!data || !data.contentNode) {
    console.warn(`⚠️ URI "${uri}"에 해당하는 콘텐츠를 찾을 수 없습니다.`);
    return null;
  }

  return data.contentNode;
}

/**
 * 모든 Post 가져오기 (Sitemap용)
 */
export async function getAllPosts(): Promise<AllPostsData['posts']['nodes']> {
  const data = await fetchAPI<AllPostsData>(
    `
    query GetAllPosts {
      posts(first: 1000, where: { status: PUBLISH }) {
        nodes {
          slug
          uri
          modified
        }
      }
    }
  `
  );

  // 🛡️ 방어: 데이터가 없으면 빈 배열 반환
  if (!data || !data.posts || !data.posts.nodes) {
    console.warn('⚠️ 게시글이 없습니다. 빈 배열을 반환합니다.');
    return [];
  }

  return data.posts.nodes;
}

/**
 * 모든 Page 가져오기 (Sitemap용)
 */
export async function getAllPages(): Promise<AllPagesData['pages']['nodes']> {
  const data = await fetchAPI<AllPagesData>(
    `
    query GetAllPages {
      pages(first: 1000, where: { status: PUBLISH }) {
        nodes {
          slug
          uri
          modified
        }
      }
    }
  `
  );

  // 🛡️ 방어: 데이터가 없으면 빈 배열 반환
  if (!data || !data.pages || !data.pages.nodes) {
    console.warn('⚠️ 페이지가 없습니다. 빈 배열을 반환합니다.');
    return [];
  }

  return data.pages.nodes;
}

/**
 * 최근 게시글 가져오기 (홈페이지용)
 */
export async function getRecentPosts(count: number = 10): Promise<AllPostsData['posts']['nodes']> {
  const data = await fetchAPI<AllPostsData>(
    `
    query GetRecentPosts($count: Int!) {
      posts(first: $count, where: { status: PUBLISH }) {
        nodes {
          ${POST_FIELDS}
        }
      }
    }
  `,
    { count }
  );

  // 🛡️ 방어: 데이터가 없으면 빈 배열
  if (!data || !data.posts || !data.posts.nodes) {
    console.warn('⚠️ 최근 게시글이 없습니다.');
    return [];
  }

  return data.posts.nodes;
}

/**
 * 메뉴 가져오기 (Navigation용)
 */
export async function getMenuByLocation(location: string): Promise<MenuData['menu'] | null> {
  const data = await fetchAPI<MenuData>(
    `
    query GetMenu($location: MenuLocationEnum!) {
      menu(id: $location, idType: LOCATION) {
        menuItems {
          nodes {
            id
            label
            url
            path
            target
            cssClasses
          }
        }
      }
    }
  `,
    { location }
  );

  // 🛡️ 방어: 메뉴가 없으면 null
  if (!data || !data.menu) {
    console.warn(`⚠️ "${location}" 위치의 메뉴를 찾을 수 없습니다.`);
    return null;
  }

  return data.menu;
}

