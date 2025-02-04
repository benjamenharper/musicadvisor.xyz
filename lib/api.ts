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
  const uniqueId = Math.random().toString(36).substring(7);
  
  // Build query parameters
  const params = new URLSearchParams({
    _embed: '1',
    timestamp: timestamp.toString(),
    unique: uniqueId,
    nocache: 'true',
    per_page: '100',
    orderby: 'date',
    order: 'desc',
    _fields: 'id,title,excerpt,date,slug,_links,_embedded'
  });
  
  if (category && category !== 'all') {
    params.append('categories', category);
  }

  const url = `${baseUrl}?${params.toString()}`;
  console.log('Fetching posts from:', url);

  try {
    const response = await fetch(url, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0',
        'If-None-Match': '', // Prevent 304 responses
        'If-Modified-Since': ''
      },
      next: {
        revalidate: 0,
        tags: ['posts']
      }
    });

    if (!response.ok) {
      console.error('Failed to fetch posts:', response.status, response.statusText);
      throw new Error(`Failed to fetch posts: ${response.status} ${response.statusText}`);
    }

    const posts = await response.json();
    console.log('Successfully fetched posts. Count:', posts.length);
    
    // Log the first post for debugging
    if (posts.length > 0) {
      console.log('Latest post:', {
        id: posts[0].id,
        title: posts[0].title.rendered,
        date: posts[0].date,
        url: url
      });
    }
    
    return posts;
  } catch (error) {
    console.error('Error in fetchPosts:', error);
    throw error;
  }
};

export const fetchCategories = async (siteKey: string) => {
  const site = config.sites[siteKey];
  const timestamp = Date.now();
  const uniqueId = Math.random().toString(36).substring(7);
  const url = `${site.url}/wp-json/wp/v2/categories?per_page=100&_fields=id,name,slug,description,count&timestamp=${timestamp}&unique=${uniqueId}&nocache=true`;

  console.log('Fetching categories from:', url);

  try {
    const response = await fetch(url, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0',
        'If-None-Match': '', // Prevent 304 responses
        'If-Modified-Since': ''
      },
      next: {
        revalidate: 0,
        tags: ['categories']
      }
    });

    if (!response.ok) {
      console.error('Failed to fetch categories:', response.status, response.statusText);
      throw new Error(`Failed to fetch categories: ${response.status} ${response.statusText}`);
    }

    const categories = await response.json();
    const activeCategories = categories.filter((cat: any) => cat.count > 0);
    console.log('Successfully fetched categories. Active count:', activeCategories.length);
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
