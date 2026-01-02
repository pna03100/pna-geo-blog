// WordPress GraphQL 타입 정의

export interface SeoData {
  title?: string;
  metaDesc?: string;
  opengraphTitle?: string;
  opengraphDescription?: string;
  opengraphImage?: {
    sourceUrl?: string;
  };
  canonical?: string;
  metaRobotsNoindex?: string;
  metaRobotsNofollow?: string;
  schema?: {
    raw?: string;
  };
}

export interface FeaturedImage {
  node?: {
    sourceUrl?: string;
    altText?: string;
    mediaDetails?: {
      width?: number;
      height?: number;
    };
  };
}

export interface Author {
  node?: {
    name?: string;
    url?: string;
  };
}

export interface Category {
  nodes?: Array<{
    name?: string;
    uri?: string;
  }>;
}

export interface Post {
  __typename: 'Post';
  id: string;
  title?: string;
  content?: string;
  date?: string;
  modified?: string;
  slug?: string;
  uri?: string;
  seo?: SeoData;
  featuredImage?: FeaturedImage;
  author?: Author;
  categories?: Category;
}

export interface Page {
  __typename: 'Page';
  id: string;
  title?: string;
  content?: string;
  slug?: string;
  uri?: string;
  seo?: SeoData;
}

export type ContentNode = Post | Page;

export interface ContentByUriResponse {
  contentNode: ContentNode | null;
}

export interface AllUrisResponse {
  posts: {
    nodes: Array<{
      uri: string;
      modified: string;
    }>;
  };
  pages: {
    nodes: Array<{
      uri: string;
      modified: string;
    }>;
  };
}

