import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchPosts, fetchCategories } from '@/lib/api';
import { config } from '@/lib/config';
import { decodeHTML } from '@/lib/utils';
import { format } from 'date-fns';
import AuthorAttribution from '@/components/AuthorAttribution';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Music - MusicAdvisor',
  description: 'Explore the latest in AI music technology, tools, and trends. Learn how artificial intelligence is transforming music creation, production, and distribution.',
  keywords: ['ai music', 'artificial intelligence music', 'music ai', 'ai music production', 'ai music tools'],
  openGraph: {
    title: 'AI Music - MusicAdvisor',
    description: 'Explore the latest in AI music technology, tools, and trends.',
    images: [
      {
        url: '/musicianscropped.png',
        width: 1200,
        height: 630,
        alt: 'AI Music - MusicAdvisor'
      }
    ]
  }
};

// Force dynamic rendering at runtime
export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function PostsList() {
  try {
    // First get the category ID
    const categories = await fetchCategories(config.defaultSite);
    const aiMusicCategory = categories.find(cat => cat.slug === 'aimusic');
    
    if (!aiMusicCategory) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500">AI Music category not found.</p>
        </div>
      );
    }

    const posts = await fetchPosts(config.defaultSite, aiMusicCategory.id.toString());

    if (!posts || !Array.isArray(posts)) {
      console.error('Invalid posts data:', posts);
      throw new Error('Invalid response from API');
    }

    if (posts.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500">No posts found in AI Music category.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <Link href={`/${post.slug}`} className="block">
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
              <div className="p-4">
                <Link href={`/${post.slug}`}>
                  <h2 className="text-xl font-semibold hover:text-blue-600 transition-colors duration-200">
                    {decodeHTML(post.title.rendered)}
                  </h2>
                </Link>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                  <span>{post.readingTime} min read</span>
                </div>
                <div className="mt-2">
                  <AuthorAttribution postId={post.id.toString()} compact />
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  <time dateTime={post.date}>
                    {format(new Date(post.date), 'MMM d, yyyy')}
                  </time>
                </div>
                <div 
                  className="mt-3 text-gray-600 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                />
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

export default function AIMusic() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">AI Music</h1>
        <p className="text-lg text-gray-600">
          Explore the latest developments in AI music technology and how it's transforming the music industry
        </p>
      </div>

      <Suspense fallback={<div>Loading posts...</div>}>
        <PostsList />
      </Suspense>
    </div>
  );
}
