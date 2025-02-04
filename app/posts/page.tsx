import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SearchBox from '@/components/SearchBox';
import { fetchCategories, fetchPosts } from '@/lib/api';
import { config } from '@/lib/config';
import { decodeHTML } from '@/lib/utils';
import { format } from 'date-fns';
import AuthorAttribution from '@/components/AuthorAttribution';
import { headers } from 'next/headers';

interface Post {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  readingTime: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
    }>>;
  };
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

// Force dynamic rendering at runtime
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

// This forces a new render on every request
function getTimestamp() {
  return new Date().getTime();
}

async function PostsList({ selectedCategory = 'all' }) {
  // Force dynamic rendering by reading headers
  headers();
  const timestamp = getTimestamp();
  
  try {
    console.log(`[${timestamp}] Fetching posts for category:`, selectedCategory);
    const posts = await fetchPosts(config.defaultSite, selectedCategory);
    console.log(`[${timestamp}] Fetched ${posts?.length} posts`);
    
    if (!posts || posts.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500">No posts found. New posts should appear here within a few seconds of publishing.</p>
          <p className="text-gray-400 text-sm mt-2">Last checked: {new Date(timestamp).toLocaleTimeString()}</p>
        </div>
      );
    }

    // Add debug info at the top
    return (
      <div className="space-y-8">
        <div className="bg-gray-50 p-4 rounded-lg text-xs font-mono">
          <h3 className="font-semibold mb-2">Debug Info:</h3>
          <div>Total Posts: {posts.length}</div>
          <div>Latest Post: {posts[0]?.title.rendered} ({new Date(posts[0]?.date).toLocaleString()})</div>
          <div>Oldest Post: {posts[posts.length - 1]?.title.rendered} ({new Date(posts[posts.length - 1]?.date).toLocaleString()})</div>
          <div className="mt-2">All Post Dates:</div>
          <div className="text-xs overflow-x-auto whitespace-pre">
            {posts.map((post: any) => `\n${new Date(post.date).toLocaleString()} - ${post.title.rendered}`)}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <Link href={`/posts/${post.slug}`}>
                {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={post._embedded['wp:featuredmedia'][0].source_url}
                      alt={decodeHTML(post.title.rendered)}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2 hover:text-blue-600 transition-colors">
                    {decodeHTML(post.title.rendered)}
                  </h2>
                  <div 
                    className="text-gray-600 mb-4 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                  />
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <AuthorAttribution postId={post.id.toString()} />
                    <time dateTime={post.date} className="font-mono">
                      {format(new Date(post.date), 'MMM d, yyyy HH:mm')}
                    </time>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error rendering posts:', error);
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error loading posts. Please try again later.</p>
        <p className="text-gray-400 text-sm mt-2">{error.message}</p>
      </div>
    );
  }
}

async function Categories() {
  // Force dynamic rendering by reading headers
  headers();
  const timestamp = getTimestamp();
  
  console.log('Fetching categories at timestamp:', timestamp);
  const categories = await fetchCategories(config.defaultSite);
  console.log('Fetched categories count:', categories?.length);
  
  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-2">
        <Link
          href="/posts"
          className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          All
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/posts?category=${category.slug}`}
            className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default async function Posts({ searchParams }: { searchParams: { category?: string } }) {
  const selectedCategory = searchParams.category || 'all';
  const timestamp = getTimestamp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <Link href="/posts" className="group">
          <h1 className="text-4xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            Articles & News
          </h1>
        </Link>
      </div>

      <div className="mb-8">
        <SearchBox />
      </div>

      <Suspense fallback={<div>Loading categories...</div>}>
        <Categories />
      </Suspense>

      <Suspense 
        fallback={
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        }
      >
        <PostsList selectedCategory={selectedCategory} />
      </Suspense>

      {/* Debug info */}
      <div className="text-xs text-gray-400 mt-8 text-center">
        Page rendered at: {new Date(timestamp).toLocaleTimeString()}
      </div>
    </div>
  );
}
