import { mockProperties } from './mockData';
import { config } from './config';

export const fetchProperties = async () => {
  // Return mock data instead of making API call
  return mockProperties;
};

export const fetchPosts = async (siteKey: string, category?: string) => {
  const site = config.sites[siteKey];
  const baseUrl = `${site.url}/wp-json/wp/v2/posts`;
  const timestamp = Date.now(); // Add timestamp to bypass cache
  const url = category && category !== 'all' 
    ? `${baseUrl}?categories=${category}&_embed&timestamp=${timestamp}` 
    : `${baseUrl}?_embed&timestamp=${timestamp}`;

  console.log('Fetching posts from:', url);

  const response = await fetch(url, {
    cache: 'no-store',
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    },
    next: {
      revalidate: 0,
      tags: ['posts']
    }
  });

  if (!response.ok) {
    console.error('Failed to fetch posts:', response.status, response.statusText);
    throw new Error('Failed to fetch posts');
  }

  const posts = await response.json();
  console.log('Fetched posts count:', posts.length);
  return posts;
};

export const fetchCategories = async (siteKey: string) => {
  const site = config.sites[siteKey];
  const url = `${site.url}/wp-json/wp/v2/categories?per_page=100&_fields=id,name,slug,description,count`;

  const response = await fetch(url, {
    headers: {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
    },
    next: { revalidate: 0 }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }

  const categories = await response.json();
  return categories.filter((cat: any) => cat.count > 0);
};

export default {
  fetchProperties,
  fetchPosts,
  fetchCategories
};
