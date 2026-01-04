// @ts-nocheck
// ============================================
// Type Definitions for WordPress GraphQL
// ============================================

export interface WPContent {
  __typename: 'Page' | 'Post';
  uri: string;
  slug: string;
  id?: string;
  databaseId?: number;
  pageId?: number;
  postId?: number;
  title?: string;
  content?: string;
  date?: string;
  author?: {
    node?: {
      name?: string;
      avatar?: {
        url?: string;
      };
    };
  };
  featuredImage?: {
    node?: {
      sourceUrl?: string;
      altText?: string;
      mediaDetails?: {
        width?: number;
        height?: number;
      };
    };
  };
  categories?: {
    nodes?: Array<{
      name?: string;
      slug?: string;
    }>;
  };
  seo?: RankMathSEO;
}

export interface RankMathSEO {
  title?: string;
  metaDesc?: string;
  opengraphTitle?: string;
  opengraphDescription?: string;
  opengraphImage?: {
    sourceUrl?: string;
  };
  canonical?: string;
  schema?: {
    raw?: string;
  };
}

export interface MenuItem {
  id: string;
  label: string;
  url: string;
  path?: string;
}

export interface MenuResponse {
  menus?: {
    nodes?: Array<{
      menuItems?: {
        nodes?: Array<{
          id: string;
          label: string;
          url: string;
          path?: string;
        }>;
      };
    }>;
  };
}

