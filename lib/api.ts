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
  content: z.string().nullable(),
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
      }).nullable(),
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
// [Security] Fetch Wrapper with Validation
// ============================================
async function fetchAPI<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T | null> {
  const url = env.WORDPRESS_API_URL;

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🚀 [API Request]');
  console.log('📍 URL:', url);
  console.log('📝 Query:', query.substring(0, 100) + '...');
  console.log('🔧 Variables:', JSON.stringify(variables, null, 2));
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
      next: { tags: ['wordpress'], revalidate: 3600 },
    });

    console.log('✅ Response Status:', response.status, response.statusText);

    if (!response.ok) {
      console.error('❌ HTTP Error:', response.status);
      const text = await response.text();
      console.error('📄 Response:', text.substring(0, 200));
      return null;
    }

    const json: GraphQLResponse<T> = await response.json();

    if (json.errors) {
      console.error('❌ GraphQL Errors:', JSON.stringify(json.errors, null, 2));
      return null;
    }

    console.log('✅ Data Received:', Object.keys(json.data || {}));
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    return json.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('💥 [Fetch Exception]');
      console.error('Error Type:', error.name);
      console.error('Error Message:', error.message);
      console.error('Stack:', error.stack);
    } else {
      console.error('💥 Unknown Error:', error);
    }
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
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
      console.warn(`⚠️ URI "${uri}" not found. Returning dummy data.`);
      return DUMMY_POST;
    }

    // [Security] Zod 검증
    const validated = WPContentSchema.safeParse(data.contentNode);

    if (!validated.success) {
      console.error('❌ [Validation Failed] contentNode:', validated.error);
      return DUMMY_POST;
    }

    return validated.data;
  } catch (error) {
    console.error('getContentByURI Error:', error);
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
      console.warn('⚠️ No posts found. Returning empty array.');
      return [];
    }

    // [Security] 배열의 각 아이템을 Zod로 검증
    const validated = data.posts.nodes
      .map((node) => WPContentSchema.safeParse(node))
      .filter((result) => result.success)
      .map((result) => (result as z.SafeParseSuccess<WPContent>).data);

    return validated;
  } catch (error) {
    console.error('getAllPosts Error:', error);
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
      console.warn('⚠️ No pages found. Returning empty array.');
      return [];
    }

    // [Security] 배열의 각 아이템을 Zod로 검증
    const validated = data.pages.nodes
      .map((node) => WPContentSchema.safeParse(node))
      .filter((result) => result.success)
      .map((result) => (result as z.SafeParseSuccess<WPContent>).data);

    return validated;
  } catch (error) {
    console.error('getAllPages Error:', error);
    return [];
  }
}

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
      console.warn('⚠️ No menus found. Returning dummy menu.');
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
    console.error('getPrimaryMenu Error:', error);
    return DUMMY_MENU_ITEMS;
  }
}
