import { NextResponse } from 'next/server';
import { getWordPressAPI } from '@/lib/wordpress';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const perPage = searchParams.get('per_page') || '20';
    const page = searchParams.get('page') || '1';
    const embed = searchParams.has('_embed') ? '&_embed=1' : '';
    
    const response = await fetch(
      `${getWordPressAPI('posts')}?per_page=${perPage}&page=${page}${embed}`,
      { next: { revalidate: 3600 } }
    );
    
    // Get the total pages from the headers
    const totalPosts = response.headers.get('X-WP-Total');
    const totalPages = response.headers.get('X-WP-TotalPages');
    
    const posts = await response.json();
    
    return NextResponse.json(posts, {
      headers: {
        'X-Total-Posts': totalPosts || '0',
        'X-Total-Pages': totalPages || '0'
      }
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json([], { status: 500 });
  }
}
