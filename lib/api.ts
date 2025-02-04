import { mockProperties } from './mockData';

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

export default {
  fetchProperties,
  fetchPosts
};
