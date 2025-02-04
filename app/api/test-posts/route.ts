import { NextResponse } from 'next/server';
import { config } from '@/lib/config';
import axios from 'axios';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function GET() {
  const site = config.sites[config.defaultSite];
  const baseUrl = `${site.url}/wp-json/wp/v2/posts`;
  const timestamp = Date.now();
  
  try {
    const { data: posts, headers } = await axios.get(baseUrl, {
      params: {
        _embed: '1',
        timestamp,
        per_page: '1',
        nocache: Math.random()
      },
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0'
      },
      transformRequest: [(data, headers) => {
        headers['If-None-Match'] = '';
        headers['If-Modified-Since'] = '';
        return data;
      }]
    });

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      requestUrl: baseUrl,
      headers: headers,
      postCount: posts.length,
      latestPost: posts[0] ? {
        id: posts[0].id,
        title: posts[0].title.rendered,
        date: posts[0].date
      } : null
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    if (axios.isAxiosError(error)) {
      return NextResponse.json({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString(),
        requestUrl: baseUrl,
        response: {
          status: error.response?.status,
          statusText: error.response?.statusText,
          headers: error.response?.headers,
          data: error.response?.data
        }
      }, { status: 500 });
    }
    return NextResponse.json({
      success: false,
      error: 'Unknown error occurred',
      timestamp: new Date().toISOString(),
      requestUrl: baseUrl
    }, { status: 500 });
  }
}
