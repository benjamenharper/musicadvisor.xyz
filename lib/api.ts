import { mockProperties } from './mockData';
import { config } from './config';
import axios from 'axios';
import { calculateReadingTime } from './utils/calculateReadingTime';

export const fetchProperties = async () => {
  // Return mock data instead of making API call
  return mockProperties;
};

export const fetchPosts = async (siteKey: string, category?: string, options: { per_page?: string; _embed?: string; categories?: string } = {}) => {
  const site = config.sites[siteKey];
  if (!site) {
    console.error('Site not found:', siteKey);
    throw new Error(`Site ${siteKey} not found in config`);
  }

  const baseUrl = `${site.url}/wp-json/wp/v2/posts`;
  const timestamp = Date.now();

  // Build URL with all necessary parameters
  const params = new URLSearchParams({
    _embed: options._embed || '1',
    timestamp: timestamp.toString(),
    per_page: options.per_page || '100',
    orderby: 'date',
    order: 'desc',
    _fields: 'id,title,excerpt,content,date,modified,slug,_links,_embedded'
  });

  if (options.categories) {
    params.append('categories', options.categories);
  } else if (category && category !== 'all') {
    params.append('categories', category);
  }

  const url = `${baseUrl}?${params.toString()}`;

  try {
    console.log('Making request with headers:', {
      'Accept': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
      'Pragma': 'no-cache',
      'Expires': '0'
    });

    const response = await axios.get(url, {
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0'
      },
      validateStatus: (status) => {
        return status === 200; // Only accept 200 OK
      }
    });

    if (!response.data || !Array.isArray(response.data)) {
      console.error('Invalid response data:', response.data);
      throw new Error('Invalid response from WordPress API');
    }

    const posts = response.data.map(post => ({
      ...post,
      readingTime: calculateReadingTime(post.content.rendered)
    }));

    console.log('Posts fetched successfully:', {
      total: posts.length,
      latest: posts[0] ? {
        id: posts[0].id,
        title: posts[0].title?.rendered,
        date: posts[0].date,
        readingTime: posts[0].readingTime
      } : 'No posts',
      responseHeaders: response.headers
    });

    return posts;
  } catch (error) {
    console.error('Error fetching posts:', {
      error: error.message,
      response: error.response ? {
        status: error.response.status,
        statusText: error.response.statusText,
        headers: error.response.headers,
        data: error.response.data
      } : 'No response',
      request: error.request ? 'Request made but no response' : 'Request setup failed'
    });
    throw error;
  }
};

export const fetchCategories = async (siteKey: string) => {
  const site = config.sites[siteKey];
  if (!site) {
    console.error('Site not found:', siteKey);
    throw new Error(`Site ${siteKey} not found in config`);
  }

  const timestamp = Date.now();
  const url = `${site.url}/wp-json/wp/v2/categories`;

  console.log('Fetching categories:', {
    siteKey,
    url,
    timestamp: new Date(timestamp).toISOString()
  });

  try {
    const response = await axios.get(url, {
      params: {
        per_page: '100',
        _fields: 'id,name,slug,description,count',
        timestamp
      },
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });

    if (!response.data || !Array.isArray(response.data)) {
      console.error('Invalid categories response:', response.data);
      throw new Error('Invalid response from WordPress API');
    }

    const categories = response.data;
    const activeCategories = categories.filter((cat: any) => cat.count > 0);
    
    console.log('Categories fetched:', {
      total: categories.length,
      active: activeCategories.length,
      categories: activeCategories.map((c: any) => `${c.name} (${c.count})`).join(', ')
    });

    return activeCategories;
  } catch (error) {
    console.error('Error fetching categories:', {
      error: error.message,
      response: error.response ? {
        status: error.response.status,
        statusText: error.response.statusText,
        headers: error.response.headers,
        data: error.response.data
      } : 'No response'
    });
    throw error;
  }
};

export default {
  fetchProperties,
  fetchPosts,
  fetchCategories
};
