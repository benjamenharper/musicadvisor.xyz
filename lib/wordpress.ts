import { config } from './config';

const getBaseUrl = (siteKey: string = config.defaultSite) => {
  const site = config.sites[siteKey];
  if (!site?.domain) {
    // In development/test, return mock data
    if (process.env.NODE_ENV === 'development') {
      return 'https://demo.wordpress.com/wp-json/wp/v2';
    }
    throw new Error(`Invalid site key or missing domain: ${siteKey}`);
  }
  return `${site.domain}/wp-json/wp/v2`.replace(/\/+$/, ''); // Remove trailing slashes
};

const getSiteUrl = (siteKey: string = config.defaultSite) => {
  const site = config.sites[siteKey];
  if (!site?.domain) {
    // In development/test, return mock data
    if (process.env.NODE_ENV === 'development') {
      return 'https://demo.wordpress.com';
    }
    throw new Error(`Invalid site key or missing domain: ${siteKey}`);
  }
  return site.domain.replace(/\/+$/, ''); // Remove trailing slashes
};

export function getWordPressAPI(endpoint: string, siteKey: string = config.defaultSite): string {
  const baseUrl = getBaseUrl(siteKey);
  
  // Remove leading slash if present
  const cleanEndpoint = endpoint.replace(/^\//, '');
  
  return `${baseUrl}/${cleanEndpoint}`;
}

// Utility functions for common API calls
export async function fetchPosts(params: Record<string, string> = {}, siteKey: string = config.defaultSite) {
  try {
    // Ensure we have the required environment variables
    const baseUrl = getBaseUrl(siteKey);
    
    // Build the URL with proper error handling
    const url = new URL(`${baseUrl}/posts`);
    
    // Add query parameters
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    // Add _embed parameter to get featured images
    url.searchParams.append('_embed', '1');

    const response = await fetch(url.toString(), {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
    }

    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return []; // Return empty array instead of throwing to prevent page crash
  }
}

export async function fetchCategories(siteKey: string = config.defaultSite) {
  try {
    const url = new URL(`${getBaseUrl(siteKey)}/categories`);
    url.searchParams.append('_embed', '1');

    const response = await fetch(url.toString(), {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function fetchContentBySlug(slug: string, siteKey: string = config.defaultSite) {
  try {
    // First try to find it as a post
    const postUrl = new URL(`${getBaseUrl(siteKey)}/posts`);
    postUrl.searchParams.append('slug', slug);
    postUrl.searchParams.append('_embed', '1');

    const postResponse = await fetch(postUrl.toString(), {
      next: { revalidate: 3600 }
    });

    if (postResponse.ok) {
      const posts = await postResponse.json();
      if (posts.length > 0) return posts[0];
    }

    // If not found as a post, try as a page
    const pageUrl = new URL(`${getBaseUrl(siteKey)}/pages`);
    pageUrl.searchParams.append('slug', slug);
    pageUrl.searchParams.append('_embed', '1');

    const pageResponse = await fetch(pageUrl.toString(), {
      next: { revalidate: 3600 }
    });

    if (pageResponse.ok) {
      const pages = await pageResponse.json();
      if (pages.length > 0) return pages[0];
    }

    throw new Error(`Content not found: ${slug}`);
  } catch (error) {
    console.error('Error fetching content:', error);
    return null;
  }
}

export async function fetchPages(params: Record<string, string> = {}, siteKey: string = config.defaultSite) {
  try {
    const url = new URL(`${getBaseUrl(siteKey)}/pages`);
    
    // Add query parameters
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    // Add _embed parameter to get featured images
    url.searchParams.append('_embed', '1');

    const response = await fetch(url.toString(), {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching pages:', error);
    return [];
  }
}

export async function searchPosts(searchTerm: string, siteKey: string = config.defaultSite) {
  try {
    // Search both posts and pages
    const [postsResponse, pagesResponse] = await Promise.all([
      fetch(
        `${getWordPressAPI('posts', siteKey)}?search=${encodeURIComponent(searchTerm)}&_embed=1&per_page=5`,
        { next: { revalidate: 3600 } }
      ),
      fetch(
        `${getWordPressAPI('pages', siteKey)}?search=${encodeURIComponent(searchTerm)}&_embed=1&per_page=5`,
        { next: { revalidate: 3600 } }
      )
    ]);

    if (!postsResponse.ok || !pagesResponse.ok) {
      throw new Error(`WordPress API error: ${postsResponse.ok ? '' : `Posts: ${postsResponse.status}`} ${pagesResponse.ok ? '' : `Pages: ${pagesResponse.status}`}`);
    }

    const [posts, pages] = await Promise.all([
      postsResponse.json(),
      pagesResponse.json()
    ]);

    // Combine and sort by relevance (keeping original order from WordPress)
    // Limit to top 10 results total
    const combined = [
      ...posts.map((post: any) => ({ ...post, type: 'post' })),
      ...pages.map((page: any) => ({ ...page, type: 'page' }))
    ].slice(0, 10);

    return combined;
  } catch (error) {
    console.error('Error searching content:', error);
    return [];
  }
}

export async function fetchAllContent(params: Record<string, string> = {}) {
  const sites = config.megaSite.sources;
  
  try {
    const allContent = await Promise.all(
      sites.map(async (siteKey) => {
        const [posts, pages] = await Promise.all([
          fetchPosts({ ...params, _embed: '1' }, siteKey),
          fetchPages({ ...params, _embed: '1' }, siteKey)
        ]);

        // Add source and type information to each item
        const processedPosts = posts.map((post: any) => ({
          ...post,
          source: siteKey,
          sourceInfo: config.sites[siteKey],
          type: 'post' as const
        }));

        const processedPages = pages.map((page: any) => ({
          ...page,
          source: siteKey,
          sourceInfo: config.sites[siteKey],
          type: 'page' as const
        }));

        return [...processedPosts, ...processedPages];
      })
    );

    // Flatten and sort by date
    return allContent
      .flat()
      .sort((a, b) => new Date(b.date || '').getTime() - new Date(a.date || '').getTime());
  } catch (error) {
    console.error('Error fetching all content:', error);
    return [];
  }
}

export async function searchAllContent(searchTerm: string) {
  const sites = config.megaSite.sources;
  
  try {
    const allResults = await Promise.all(
      sites.map(async (siteKey) => {
        const results = await searchPosts(searchTerm, siteKey);
        return results.map((result: any) => ({
          ...result,
          source: siteKey,
          sourceInfo: config.sites[siteKey]
        }));
      })
    );

    // Flatten and sort by relevance (keeping original order from WordPress)
    return allResults.flat().slice(0, 10); // Limit to top 10 results
  } catch (error) {
    console.error('Error searching all content:', error);
    return [];
  }
}

export async function fetchPostBySlug(slug: string) {
  try {
    const url = new URL(`${getBaseUrl()}/posts`);
    url.searchParams.append('slug', slug);
    url.searchParams.append('_embed', '1');

    const response = await fetch(url.toString(), {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
    }

    const posts = await response.json();
    return posts.length > 0 ? posts[0] : null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function fetchPageBySlug(slug: string) {
  try {
    const url = new URL(`${getBaseUrl()}/pages`);
    url.searchParams.append('slug', slug);
    url.searchParams.append('_embed', '1');

    const response = await fetch(url.toString(), {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
    }

    const pages = await response.json();
    return pages.length > 0 ? pages[0] : null;
  } catch (error) {
    console.error('Error fetching page:', error);
    return null;
  }
}

export async function fetchRecentPosts(count: number = 5) {
  try {
    const url = new URL(`${getBaseUrl()}/posts`);
    url.searchParams.append('per_page', count.toString());
    url.searchParams.append('_embed', '1');

    const response = await fetch(url.toString(), {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching recent posts:', error);
    return [];
  }
}

export async function fetchRelatedPosts(currentSlug: string) {
  try {
    // First get the current post to find its categories
    const currentPost = await fetchPostBySlug(currentSlug);
    if (!currentPost?._embedded?.['wp:term']?.[0]) {
      return [];
    }

    // Get the categories of the current post
    const categories = currentPost._embedded['wp:term'][0]
      .map((term: any) => term.id)
      .join(',');

    // Fetch posts from the same categories, excluding the current post
    const url = new URL(`${getBaseUrl()}/posts`);
    url.searchParams.append('categories', categories);
    url.searchParams.append('exclude', currentPost.id.toString());
    url.searchParams.append('per_page', '3');
    url.searchParams.append('_embed', '1');

    const response = await fetch(url.toString(), {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
}
