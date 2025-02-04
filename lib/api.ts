import { mockProperties } from './mockData';
import { config } from './config';
import axios from 'axios';

export const fetchProperties = async () => {
  // Return mock data instead of making API call
  return mockProperties;
};

export const fetchPosts = async (siteKey: string, category?: string) => {
  const site = config.sites[siteKey];
  const baseUrl = `${site.url}/wp-json/wp/v2/posts`;
  const timestamp = Date.now();

  // Build URL with all necessary parameters
  const params = new URLSearchParams({
    _embed: '1',
    timestamp: timestamp.toString(),
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
    const { data: posts, headers } = await axios.get(url, {
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0'
      },
      // Prevent caching at axios level
      transformRequest: [(data, headers) => {
        headers['If-None-Match'] = '';
        headers['If-Modified-Since'] = '';
        return data;
      }],
      // Add random query param to prevent caching
      params: {
        nocache: Math.random()
      }
    });

    console.log('WordPress API Headers:', headers);
    console.log('Total posts in response:', posts.length);

    // Log the first few posts for debugging
    posts.slice(0, 3).forEach((post: any) => {
      console.log('Post:', {
        id: post.id,
        title: post.title.rendered,
        date: post.date,
        url: url
      });
    });

    return posts;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        headers: error.response?.headers,
        data: error.response?.data
      });
    }
    throw error;
  }
};

export const fetchCategories = async (siteKey: string) => {
  const site = config.sites[siteKey];
  const timestamp = Date.now();
  const url = `${site.url}/wp-json/wp/v2/categories`;

  try {
    const { data: categories } = await axios.get(url, {
      params: {
        per_page: '100',
        _fields: 'id,name,slug,description,count',
        timestamp,
        nocache: Math.random()
      },
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });

    const activeCategories = categories.filter((cat: any) => cat.count > 0);
    console.log('Categories fetched:', {
      total: categories.length,
      active: activeCategories.length,
      categories: activeCategories.map((c: any) => `${c.name} (${c.count})`).join(', ')
    });
    return activeCategories;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        headers: error.response?.headers,
        data: error.response?.data
      });
    }
    throw error;
  }
};

export default {
  fetchProperties,
  fetchPosts,
  fetchCategories
};
