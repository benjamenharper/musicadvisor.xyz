import { NextResponse } from 'next/server';
import { getWordPressAPI } from '@/lib/wordpress';
import { decodeHTML } from '@/lib/utils';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const authorId = searchParams.get('authorId');
    
    if (!authorId) {
      return NextResponse.json({ error: 'Author ID is required' }, { status: 400 });
    }
    
    // Fetch posts by WordPress author ID
    const response = await fetch(
      `${getWordPressAPI('posts')}?author=${authorId}&per_page=100&_embed=1`,
      { next: { revalidate: 3600 } }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status}`);
    }
    
    const posts = await response.json();
    
    // Process posts to decode HTML entities
    const processedPosts = posts.map((post: any) => {
      // Create a new object to avoid mutating the original
      const processedPost = { ...post };
      
      // Decode title
      if (processedPost.title?.rendered) {
        processedPost.title.rendered = decodeHTML(processedPost.title.rendered);
      }
      
      // Decode excerpt
      if (processedPost.excerpt?.rendered) {
        processedPost.excerpt.rendered = decodeHTML(processedPost.excerpt.rendered);
      }
      
      return processedPost;
    });
    
    return NextResponse.json(processedPosts);
  } catch (error) {
    console.error('Error fetching posts by WordPress author:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}
