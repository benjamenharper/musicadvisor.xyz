import { mockProperties } from './mockData';
import { config } from './config';

export const fetchProperties = async () => {
  // Return mock data instead of making API call
  return mockProperties;
};

export const fetchPosts = async (siteKey: string, category?: string) => {
  const site = config.sites[siteKey];
  const baseUrl = `${site.url}/wp-json/wp/v2/posts`;
  const url = category && category !== 'all' 
    ? `${baseUrl}?categories=${category}&_embed` 
    : `${baseUrl}?_embed`;

  const response = await fetch(url, {
    headers: {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
    },
    next: { revalidate: 0 } // Disable caching for this request
  });

  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }

  const posts = await response.json();
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
