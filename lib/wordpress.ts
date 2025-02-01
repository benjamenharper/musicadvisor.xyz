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
  const site = config.sites[siteKey];
  // Remove leading slash if present
  const cleanEndpoint = endpoint.replace(/^\//, '');
  return `${site.url}/wp-json/wp/v2/${cleanEndpoint}`;
}

// Utility functions for common API calls
export async function fetchPosts(params: Record<string, string> = {}, siteKey: string = config.defaultSite) {
  const endpoint = 'posts';
  const url = new URL(getWordPressAPI(endpoint, siteKey));
  // Add _embed parameter
  url.searchParams.append('_embed', '1');

  console.log('fetchPosts: Fetching posts from URL:', url.toString());

  const response = await fetch(url.toString(), {
    next: { revalidate: 3600 }
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('fetchPosts: Error response', response.status, response.statusText, errorText);
    throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
  }

  try {
    return await response.json();
  } catch (error) {
    console.error('fetchPosts: Error parsing JSON:', error);
    throw error;
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
  // Try fetching from posts
  const postsUrl = new URL(getWordPressAPI('posts', siteKey));
  postsUrl.searchParams.append('slug', slug);
  postsUrl.searchParams.append('_embed', '1');
  console.log('fetchContentBySlug (posts): Fetching post with slug:', slug, 'from URL:', postsUrl.toString());

  let response = await fetch(postsUrl.toString(), { next: { revalidate: 60 } });
  if (response.ok) {
    const postsData = await response.json();
    console.log('fetchContentBySlug (posts): Received data:', postsData);
    if (postsData.length > 0) {
      console.log('fetchContentBySlug: Found post for slug:', slug);
      return postsData[0];
    }
  } else {
    const errorText = await response.text();
    console.error('fetchContentBySlug (posts): Error response', response.status, response.statusText, errorText);
  }

  // If not found in posts, try pages
  const pagesUrl = new URL(getWordPressAPI('pages', siteKey));
  pagesUrl.searchParams.append('slug', slug);
  pagesUrl.searchParams.append('_embed', '1');
  console.log('fetchContentBySlug (pages): Fetching page with slug:', slug, 'from URL:', pagesUrl.toString());

  response = await fetch(pagesUrl.toString(), { next: { revalidate: 60 } });
  if (response.ok) {
    const pagesData = await response.json();
    console.log('fetchContentBySlug (pages): Received data:', pagesData);
    if (pagesData.length > 0) {
      console.log('fetchContentBySlug: Found page for slug:', slug);
      return pagesData[0];
    }
  } else {
    const errorText = await response.text();
    console.error('fetchContentBySlug (pages): Error response', response.status, response.statusText, errorText);
  }

  throw new Error('Content not found for slug: ' + slug);
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
