import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SearchBox from '@/components/SearchBox';
import { fetchCategories, fetchPosts } from '@/lib/api';
import { config } from '@/lib/config';
import { decodeHTML } from '@/lib/utils';
import { format } from 'date-fns';
import AuthorAttribution from '@/components/AuthorAttribution';

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
export const revalidate = 0;

async function PostsList({ selectedCategory = 'all' }) {
  try {
    const posts = await fetchPosts(config.defaultSite, selectedCategory);

    if (!posts || !Array.isArray(posts)) {
      console.error('Invalid posts data:', posts);
      throw new Error('Invalid response from API');
    }

    if (posts.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500">No posts found.</p>
        </div>
      );
    }

    return (
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
    );
  } catch (error) {
    console.error('Error rendering posts:', error);
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error loading posts. Please try again later.</p>
      </div>
    );
  }
}

async function Categories() {
  const categories = await fetchCategories(config.defaultSite);

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
    </div>
  );
}
