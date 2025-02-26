import { NextResponse } from 'next/server';
import { getWordPressAPI } from '@/lib/wordpress';
import { authors } from '@/lib/data/authors';
import { decodeHTML } from '@/lib/utils';

// Function to get a deterministic author ID for a post
function getAuthorForPost(postId: number | string): string {
  // Convert postId to string if it's not already
  const postIdStr = postId.toString();
  
  // Use a simple hash function to deterministically assign authors
  let hash = 0;
  for (let i = 0; i < postIdStr.length; i++) {
    hash = ((hash << 5) - hash) + postIdStr.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  
  // Get a positive index within the authors array
  const authorIndex = Math.abs(hash) % authors.length;
  return authors[authorIndex].id;
}

// Process post data to decode HTML entities
function processPostData(post: any): any {
  if (!post) return post;
  
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
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const authorId = searchParams.get('authorId');
    
    if (!authorId) {
      return NextResponse.json({ error: 'Author ID is required' }, { status: 400 });
    }
    
    // Fetch all posts
    const response = await fetch(
      `${getWordPressAPI('posts')}?per_page=100&_embed=1`,
      { next: { revalidate: 3600 } }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status}`);
    }
    
    const posts = await response.json();
    
    // Filter posts by author using our deterministic function
    const authorPosts = posts
      .filter((post: any) => {
        const postAuthor = getAuthorForPost(post.id);
        return postAuthor === authorId;
      })
      .map(processPostData); // Process each post to decode HTML entities
    
    return NextResponse.json(authorPosts);
  } catch (error) {
    console.error('Error fetching posts by author:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}
