const API_URL = process.env.WORDPRESS_API_URL;

async function fetchAPI(query: string, { variables }: { variables?: any } = {}) {
  const headers = { 'Content-Type': 'application/json' };

  if (!API_URL) {
    throw new Error('WORDPRESS_API_URL 환경변수가 설정되지 않았습니다.');
  }

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query,
        variables,
      }),
      next: { tags: ['wordpress'] },
      cache: 'no-store' 
    });

    const json = await res.json();
    
    if (json.errors) {
      console.error('❌ GraphQL 에러 발생:', json.errors);
      return null;
    }
    return json.data;
  } catch (error) {
    console.error('❌ fetchAPI 네트워크 에러:', error);
    return null;
  }
}

export async function getAllPaths() {
  const data = await fetchAPI(`
    query GetAllPaths {
      posts(first: 100) {
        nodes {
          slug
        }
      }
      pages(first: 100) {
        nodes {
          slug
        }
      }
    }
  `);

  if (!data) return [];

  const postSlugs = data?.posts?.nodes.map((node: any) => `/blog/${node.slug}`) || [];
  const pageSlugs = data?.pages?.nodes.map((node: any) => `/${node.slug}`) || [];

  return [...postSlugs, ...pageSlugs];
}

export async function getContentByUri(uri: string) {
  // URI 보정
  const cleanUri = uri.endsWith('/') ? uri : `${uri}/`;
  console.log(`🔍 데이터 요청 URI: ${cleanUri}`);

  // ★ 수정됨: 에러를 유발하는 metaDesc 필드를 삭제했습니다.
  const query = `
    query GetContentByUri($uri: ID!) {
      contentNode(id: $uri, idType: URI) {
        __typename
        id
        uri
        slug
        ... on Page {
          title
          content
          date
          seo {
            title
          }
        }
        ... on Post {
          title
          content
          date
          seo {
            title
          }
          featuredImage {
            node {
              sourceUrl
            }
          }
          author {
            node {
              name
            }
          }
          categories {
            nodes {
              name
            }
          }
        }
      }
    }
  `;

  const data = await fetchAPI(query, {
    variables: {
      uri: cleanUri
    }
  });

  return data?.contentNode;
}