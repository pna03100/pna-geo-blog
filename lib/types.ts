/**
 * WordPress GraphQL Types
 * WPGraphQL + Rank Math SEO 전용
 */

// Rank Math SEO 데이터 타입
export interface RankMathSeo {
  title: string;
  description: string;
  canonical?: string;
  focusKeywords?: string;
  openGraphTitle?: string;
  openGraphDescription?: string;
  openGraphImage?: {
    sourceUrl?: string;
  };
  schema?: {
    raw?: string;
  };
}

// Featured Image 타입
export interface FeaturedImage {
  node: {
    sourceUrl: string;
    altText: string;
    mediaDetails?: {
      width?: number;
      height?: number;
    };
  };
}

// Author 타입
export interface Author {
  node: {
    name: string;
    description?: string;
    avatar?: {
      url: string;
    };
  };
}

// Category 타입
export interface Category {
  name: string;
  slug: string;
}

// Post 타입 (블로그 글)
export interface Post {
  __typename: 'Post';
  id: string;
  title: string;
  content: string;
  slug: string;
  uri: string;
  date: string;
  modified: string;
  excerpt?: string;
  seo: RankMathSeo;
  featuredImage?: FeaturedImage;
  author?: Author;
  categories?: {
    nodes: Category[];
  };
}

// Page 타입 (Elementor 페이지)
export interface Page {
  __typename: 'Page';
  id: string;
  title: string;
  content: string;
  slug: string;
  uri: string;
  date: string;
  modified: string;
  seo: RankMathSeo;
}

// ContentNode는 Post 또는 Page
export type ContentNode = Post | Page;

// API 응답 타입
export interface ContentNodeById {
  contentNode: ContentNode | null;
}

export interface AllPostsData {
  posts: {
    nodes: Post[];
  };
}

export interface AllPagesData {
  pages: {
    nodes: Page[];
  };
}

// Menu 타입 (네비게이션)
export interface MenuItem {
  id: string;
  label: string;
  url: string;
  path?: string;
  target?: string;
  cssClasses?: string[];
}

export interface MenuData {
  menu?: {
    menuItems?: {
      nodes: MenuItem[];
    };
  };
}

