import { NextResponse } from 'next/server';
import { config } from '@/lib/config';
import axios from 'axios';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function GET() {
  const site = config.sites[config.defaultSite];
  const baseUrl = `${site.url}/wp-json/wp/v2/posts`;
  const timestamp = Date.now();

  // Create multiple test URLs
  const urls = [
    // Test 1: Basic request
    `${baseUrl}?_embed=1&per_page=5`,
    // Test 2: With timestamp
    `${baseUrl}?_embed=1&per_page=5&timestamp=${timestamp}`,
    // Test 3: With cache busting
    `${baseUrl}?_embed=1&per_page=5&nocache=${Math.random()}`,
    // Test 4: With all headers
    `${baseUrl}?_embed=1&per_page=5&nocache=${Math.random()}&timestamp=${timestamp}`
  ];

  const results = [];

  for (const url of urls) {
    try {
      console.log('Testing URL:', url);
      const startTime = Date.now();
      
      const { data: posts, headers } = await axios.get(url, {
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });

      results.push({
        url,
        success: true,
        timeMs: Date.now() - startTime,
        headers: headers,
        totalPosts: posts.length,
        posts: posts.map((post: any) => ({
          id: post.id,
          title: post.title.rendered,
          date: post.date,
          modified: post.modified
        }))
      });
    } catch (error) {
      results.push({
        url,
        success: false,
        error: error.message,
        response: error.response ? {
          status: error.response.status,
          statusText: error.response.statusText,
          headers: error.response.headers,
          data: error.response.data
        } : null
      });
    }
  }

  // Also test the REST API root to see if we can access it
  try {
    const { data: rootData } = await axios.get(`${site.url}/wp-json/`);
    results.push({
      url: `${site.url}/wp-json/`,
      success: true,
      rootData
    });
  } catch (error) {
    results.push({
      url: `${site.url}/wp-json/`,
      success: false,
      error: error.message
    });
  }

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    buildTime: process.env.BUILD_TIMESTAMP,
    results
  });
}
