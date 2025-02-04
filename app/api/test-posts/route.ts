import { NextResponse } from 'next/server';
import { config } from '@/lib/config';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function GET() {
  const site = config.sites[config.defaultSite];
  const baseUrl = `${site.url}/wp-json/wp/v2/posts`;
  const timestamp = Date.now();
  const url = `${baseUrl}?_embed&timestamp=${timestamp}&per_page=1`;

  console.log('Testing WordPress API:', url);

  try {
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
      throw new Error(`WordPress API returned ${response.status}`);
    }

    const posts = await response.json();
    
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      requestUrl: url,
      postCount: posts.length,
      latestPost: posts[0] ? {
        id: posts[0].id,
        title: posts[0].title.rendered,
        date: posts[0].date
      } : null
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
      requestUrl: url
    }, { status: 500 });
  }
}
