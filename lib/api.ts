import { mockProperties } from './mockData';
import { config } from './config';

export const fetchProperties = async () => {
  // Return mock data instead of making API call
  return mockProperties;
};

export const fetchPosts = async (siteKey: string, category?: string) => {
  const site = config.sites[siteKey];
  const baseUrl = `${site.url}/wp-json/wp/v2/posts`;
  const timestamp = Date.now();

  // Try direct WordPress API call first
  const directUrl = `${baseUrl}?_embed=1&timestamp=${timestamp}&per_page=100&_fields=id,title,excerpt,date,slug,_links,_embedded`;
  console.log('Attempting direct WordPress API call:', directUrl);

  try {
    const response = await fetch(directUrl, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
      }
    });

    if (!response.ok) {
      throw new Error(`WordPress API returned ${response.status}`);
    }

    const posts = await response.json();
    
    // Sort posts manually by date
    const sortedPosts = posts.sort((a: any, b: any) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });

    // Log details about the posts we received
    console.log('Posts fetched:', {
      total: sortedPosts.length,
      newest: sortedPosts[0] ? {
        id: sortedPosts[0].id,
        title: sortedPosts[0].title.rendered,
        date: sortedPosts[0].date
      } : null,
      oldest: sortedPosts[sortedPosts.length - 1] ? {
        id: sortedPosts[sortedPosts.length - 1].id,
        title: sortedPosts[sortedPosts.length - 1].title.rendered,
        date: sortedPosts[sortedPosts.length - 1].date
      } : null,
      allDates: sortedPosts.map((p: any) => p.date)
    });

    return sortedPosts;
  } catch (error) {
    console.error('Error fetching posts:', error);

    // First, get the total number of posts
    const countResponse = await fetch(`${baseUrl}?per_page=1`, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
      }
    });
    
    const totalPosts = parseInt(countResponse.headers.get('X-WP-Total') || '0');
    console.log('Total posts available:', totalPosts);

    // Build query parameters for full fetch
    const params = new URLSearchParams({
      _embed: '1',
      timestamp: timestamp.toString(),
      per_page: totalPosts.toString(), // Fetch all posts at once
      _fields: 'id,title,excerpt,date,slug,_links,_embedded'
    });
    
    if (category && category !== 'all') {
      params.append('categories', category);
    }

    const url = `${baseUrl}?${params.toString()}`;
    console.log('Fetching all posts from:', url);

    try {
      const response = await fetch(url, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
        },
        next: { revalidate: 0 }
      });

      if (!response.ok) {
        console.error('Failed to fetch posts:', {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries())
        });
        throw new Error(`Failed to fetch posts: ${response.status} ${response.statusText}`);
      }

      const posts = await response.json();
      
      // Sort posts manually by date
      const sortedPosts = posts.sort((a: any, b: any) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA;
      });

      // Log details about the posts we received
      console.log('Posts fetched:', {
        total: sortedPosts.length,
        newest: sortedPosts[0] ? {
          id: sortedPosts[0].id,
          title: sortedPosts[0].title.rendered,
          date: sortedPosts[0].date
        } : null,
        oldest: sortedPosts[sortedPosts.length - 1] ? {
          id: sortedPosts[sortedPosts.length - 1].id,
          title: sortedPosts[sortedPosts.length - 1].title.rendered,
          date: sortedPosts[sortedPosts.length - 1].date
        } : null,
        dates: sortedPosts.map((p: any) => p.date).join(', ')
      });
      
      return sortedPosts;
    } catch (error) {
      console.error('Error in fetchPosts:', error);
      throw error;
    }
  }
};

export const fetchCategories = async (siteKey: string) => {
  const site = config.sites[siteKey];
  const timestamp = Date.now();
  const url = `${site.url}/wp-json/wp/v2/categories?per_page=100&_fields=id,name,slug,description,count&timestamp=${timestamp}`;

  console.log('Fetching categories from:', url);

  try {
    const response = await fetch(url, {
      cache: 'no-store',
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status}`);
    }

    const categories = await response.json();
    const activeCategories = categories.filter((cat: any) => cat.count > 0);
    console.log('Categories fetched:', {
      total: categories.length,
      active: activeCategories.length,
      categories: activeCategories.map((c: any) => `${c.name} (${c.count})`).join(', ')
    });
    return activeCategories;
  } catch (error) {
    console.error('Error in fetchCategories:', error);
    throw error;
  }
};

export default {
  fetchProperties,
  fetchPosts,
  fetchCategories
};
