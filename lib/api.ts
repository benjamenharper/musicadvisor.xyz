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
    _fields: 'id,title,excerpt,date,modified,slug,_links,_embedded',
    // Add random noise to prevent caching
    nocache: Math.random().toString(),
    _: timestamp.toString()
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
        'Expires': '0',
        // Prevent WordPress from sending 304 Not Modified
        'If-None-Match': '',
        'If-Modified-Since': ''
      },
      // Prevent axios from caching
      transformRequest: [(data, headers) => {
        delete headers.common['If-None-Match'];
        delete headers.common['If-Modified-Since'];
        return data;
      }],
      // Force axios to make a new request
      validateStatus: (status) => {
        return status === 200; // Only accept 200 OK
      }
    });

    console.log('WordPress API Headers:', headers);
    console.log('Total posts in response:', posts.length);
    console.log('Latest post:', posts[0] ? {
      id: posts[0].id,
      title: posts[0].title.rendered,
      date: posts[0].date,
      modified: posts[0].modified
    } : 'No posts');

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
