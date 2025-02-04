import { NextResponse } from 'next/server';
import { fetchPosts } from '@/lib/api';
import { config } from '@/lib/config';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function GET() {
  try {
    // Get posts directly
    const posts = await fetchPosts(config.defaultSite);
    
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      buildTime: process.env.BUILD_TIMESTAMP,
      totalPosts: posts.length,
      firstThreePosts: posts.slice(0, 3).map(post => ({
        id: post.id,
        title: post.title.rendered,
        date: post.date,
        modified: post.modified
      }))
    });
  } catch (error) {
    console.error('Error in debug-fetch:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
      buildTime: process.env.BUILD_TIMESTAMP
    }, { status: 500 });
  }
}
