import { NextResponse } from 'next/server';
import { getWordPressAPI } from '@/lib/wordpress';

export async function GET() {
  try {
    const response = await fetch(
      `${getWordPressAPI('posts')}?per_page=5&_embed=1`,
      { next: { revalidate: 3600 } }
    );

    const posts = await response.json();
    
    // Transform the posts to include only necessary data
    const transformedPosts = posts.map((post: any) => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      date: post.date,
      excerpt: post.excerpt,
      featuredImage: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
    }));

    return NextResponse.json({ posts: transformedPosts });
  } catch (error) {
    console.error('Error fetching recent posts:', error);
    return NextResponse.json({ posts: [] }, { status: 500 });
  }
}
