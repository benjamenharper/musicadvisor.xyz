import { fetchPosts, fetchCategories } from '@/lib/api';
import { format } from 'date-fns';
import { decodeHTML } from '@/lib/utils';
import Link from 'next/link';
import AuthorAttribution from '@/components/AuthorAttribution';
import { config } from '@/lib/config';
import { Music } from 'lucide-react';

// Force dynamic rendering at runtime
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Music Industry News & Expert Guidance',
  description: 'Get expert guidance on music promotion, marketing, and distribution. Stay informed with the latest music industry trends, news, and strategies for success.',
  keywords: ['music industry guidance', 'music promotion tips', 'music marketing advice', 'artist development', 'music industry news', 'music business strategy'],
  openGraph: {
    title: 'Music Industry News & Expert Guidance | MusicAdvisor.xyz',
    description: 'Get expert guidance on music promotion, marketing, and distribution. Stay informed with the latest music industry trends.',
    images: [
      {
        url: '/musicianscropped.png',
        width: 1200,
        height: 630,
        alt: 'MusicAdvisor - Music Industry Guidance'
      }
    ]
  }
};

export default async function Home() {
  try {
    // Get the categories we need
    const categories = await fetchCategories(config.defaultSite);
    
    const featuredCategory = categories.find(cat => cat.slug === 'featured');
    const newsCategory = categories.find(cat => cat.slug === 'news');
    const promotionCategory = categories.find(cat => cat.slug === 'promotion');
    const aiMusicCategory = categories.find(cat => cat.slug === 'aimusic');

    if (!featuredCategory || !newsCategory || !promotionCategory) {
      throw new Error('Required categories not found');
    }

    // Fetch posts for each category (limited to 9 posts each)
    const [featuredPosts, newsPosts, promotionPosts] = await Promise.all([
      fetchPosts(config.defaultSite, featuredCategory.id.toString(), { per_page: '9', _embed: 'true', categories: featuredCategory.id.toString() }),
      fetchPosts(config.defaultSite, newsCategory.id.toString(), { per_page: '9', _embed: 'true', categories: newsCategory.id.toString() }),
      fetchPosts(config.defaultSite, promotionCategory.id.toString(), { per_page: '9', _embed: 'true', categories: promotionCategory.id.toString() })
    ]);

    // Fetch AI Music posts only if the category exists
    const aiMusicPosts = aiMusicCategory 
      ? await fetchPosts(config.defaultSite, aiMusicCategory.id.toString(), { per_page: '9', _embed: 'true', categories: aiMusicCategory.id.toString() })
      : [];

    const renderPostGrid = (posts: any[], category: any) => {
      if (!posts || posts.length === 0) return null;

      return (
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-gray-900">{category.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post: any) => (
              <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                  <Link href={`/${post.slug}`}>
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post._embedded['wp:featuredmedia'][0].source_url}
                        alt={decodeHTML(post.title.rendered)}
                        className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                  </Link>
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
              </div>
            ))}
          </div>
        </section>
      );
    };

    return (
      <main className="bg-background">
        {/* Welcome Banner - Now above the music room banner */}
        <section className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-12 mb-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-white p-4 rounded-full shadow-lg">
                  <Music className="w-12 h-12 text-purple-600" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Music Advisor</h1>
              <p className="text-xl md:text-2xl text-purple-100">
                For musicians and artists, by musicians and artists—expert guidance in the digital age.
              </p>
              <div className="mt-8">
                <Link
                  href="/services"
                  className="inline-block px-6 py-3 bg-white text-purple-600 rounded-full text-lg font-semibold hover:bg-purple-50 transition-colors"
                >
                  Explore Our Services
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Music Game Room Banner - Now a secondary callout */}
        <section className="max-w-6xl mx-auto mb-12 px-4">
          <div className="bg-blue-50 border border-blue-100 rounded-xl overflow-hidden shadow-md">
            <div className="md:flex items-center">
              <div className="md:w-2/3 p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-4">
                  Create Music Game Experiences
                </h2>
                <p className="text-blue-700 mb-6">
                  Host engaging music games where guests can play song trivia, guess songs, and connect with fellow music enthusiasts.
                </p>
                <div className="space-x-4">
                  <Link
                    href="https://bit.ly/hotlymusic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    Launch A Music Game Room
                  </Link>
                  <Link
                    href="/virtual-music-game-room"
                    className="inline-block text-blue-600 hover:text-blue-800 transition-colors text-sm"
                  >
                    Learn more →
                  </Link>
                </div>
              </div>
              <div className="md:w-1/3 bg-blue-600 p-6 hidden md:block">
                <div className="flex justify-center items-center h-full">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-24 text-white opacity-80">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
          {renderPostGrid(featuredPosts, featuredCategory)}
          {renderPostGrid(newsPosts, newsCategory)}
          {renderPostGrid(promotionPosts, promotionCategory)}
          {aiMusicCategory && renderPostGrid(aiMusicPosts, aiMusicCategory)}

          {/* Show debug info if no posts are found */}
          {!featuredPosts?.length && !newsPosts?.length && !promotionPosts?.length && !aiMusicPosts?.length && (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">Welcome to Music Advisor</h2>
              <p className="mt-2 text-gray-600">
                We're setting up our content. Please check back soon.
              </p>
              <div className="mt-8 text-left bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Debug Information:</h3>
                <pre className="text-sm overflow-auto whitespace-pre-wrap">
                  {JSON.stringify({
                    categories: categories,
                    postCounts: {
                      featured: featuredPosts?.length || 0,
                      news: newsPosts?.length || 0,
                      promotion: promotionPosts?.length || 0,
                      'ai-music': aiMusicPosts?.length || 0
                    }
                  }, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error in Home:', error);
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-red-600">Error loading content. Please try again later.</p>
      </div>
    );
  }
}
