// ============================================
// [Security] Type Definitions for WordPress GraphQL
// Trinity Core: Strict Types = Runtime Safety
// ============================================

// Author Node (완전 타입 안전)
export interface WPAuthorNode {
  name: string;
  avatar: {
    url: string;
  } | null;
}

// Featured Image Node (완전 타입 안전)
export interface WPFeaturedImageNode {
  sourceUrl: string;
  altText: string | null;
  mediaDetails: {
    width: number;
    height: number;
  } | null;
}

// Category Node (완전 타입 안전)
export interface WPCategoryNode {
  name: string;
  slug: string;
}

// RankMath SEO Data (완전 타입 안전)
export interface RankMathSEO {
  title: string | null;
  metaDesc: string | null;
  opengraphTitle: string | null;
  opengraphDescription: string | null;
  opengraphImage: {
    sourceUrl: string;
  } | null;
  canonical: string | null;
  schema: {
    raw: string;
  } | null;
}

// WordPress Content (Post or Page) - Union Type
export interface WPContent {
  __typename: 'Page' | 'Post';
  uri: string;
  slug: string;
  databaseId: number;
  title: string | null;
  content: string | null;
  
  // Post 전용 필드 (Page에는 undefined)
  date?: string;
  excerpt?: string;
  author?: {
    node: WPAuthorNode;
  };
  featuredImage?: {
    node: WPFeaturedImageNode;
  } | null;
  categories?: {
    nodes: WPCategoryNode[];
  };
  
  // SEO (RankMath/Yoast 플러그인)
  seo?: RankMathSEO | null;
}

// Menu Item (메뉴 아이템 타입)
export interface MenuItem {
  id: string;
  label: string;
  url: string;
  path: string | null;
}

// Menu Response (GraphQL 응답 구조)
export interface MenuResponse {
  menus: {
    nodes: Array<{
      menuItems: {
        nodes: MenuItem[];
      };
    }>;
  } | null;
}

// GraphQL API Response Wrapper
export interface GraphQLResponse<T> {
  data: T | null;
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
    path?: string[];
  }>;
}

// Fetch Options (API 호출 설정)
export interface FetchOptions {
  revalidate?: number;
  tags?: string[];
}

