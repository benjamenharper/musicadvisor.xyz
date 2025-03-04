import { fetchPosts, fetchCategories } from '@/lib/api';
import { format } from 'date-fns';
import { decodeHTML } from '@/lib/utils';
import Link from 'next/link';
import AuthorAttribution from '@/components/AuthorAttribution';
import { config } from '@/lib/config';
import { Rocket } from 'lucide-react';

// Force dynamic rendering at runtime
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guides for Artists & Influencers',
  description: 'Discover expert guides for artists and influencers on music promotion, marketing, audience growth, and monetizing your passion.',
  keywords: ['music influencer', 'artist guides', 'music promotion', 'featured music content', 'AI music guides', 'music marketing strategies'],
  openGraph: {
    title: 'Guides for Artists & Influencers | MusicAdvisor.xyz',
    description: 'Discover expert guides for artists and influencers on music promotion, marketing, and audience growth.',
    images: [
      {
        url: '/musicianscropped.png',
        width: 1200,
        height: 630,
        alt: 'MusicAdvisor - Guides'
      }
    ]
  }
};

export default async function GuidesPage() {
  try {
    // Get all categories
    const categories = await fetchCategories(config.defaultSite);
    
    // Find specific categories
    const featuredCategory = categories.find(cat => cat.slug === 'featured');
    const newsCategory = categories.find(cat => cat.slug === 'news');
    const promotionCategory = categories.find(cat => cat.slug === 'promotion');
    const aiMusicCategory = categories.find(cat => cat.slug === 'aimusic');

    // Create an array of valid categories
    const validCategories = [
      featuredCategory,
      newsCategory, 
      promotionCategory,
      aiMusicCategory
    ].filter(Boolean); // Filter out any undefined categories

    if (validCategories.length === 0) {
      throw new Error('No valid categories found');
    }

    // Fetch posts for each category (limited to 6 posts each for the overview)
    const categoryPosts = await Promise.all(
      validCategories.map(category => 
        fetchPosts(config.defaultSite, category.id.toString(), { 
          per_page: '6', 
          _embed: 'true', 
          categories: category.id.toString() 
        })
      )
    );

    // Create a map of category to posts
    const categoryPostsMap = validCategories.reduce((acc, category, index) => {
      acc[category.slug] = categoryPosts[index];
      return acc;
    }, {});

    const renderPostGrid = (posts: any[], category: any) => {
      if (!posts || posts.length === 0) return null;

      return (
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">{category.name}</h2>
            <Link 
              href={`/category/${category.slug}`}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View all {category.name} →
            </Link>
          </div>
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
        {/* Guides Banner - Focused on artist influencer growth */}
        <section className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-10 mb-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center mb-4">
                <Rocket className="w-6 h-6 text-purple-200 mr-3" />
                <h1 className="text-3xl md:text-4xl font-bold">Guides</h1>
              </div>
              <p className="text-xl md:text-2xl text-purple-100 mb-3">
                Guides for Artists & Influencers
              </p>
              <p className="text-lg text-purple-200 mb-5">
                Grow your audience, build your brand, and monetize your passion
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link 
              href="/guides" 
              className="px-4 py-2 bg-purple-600 text-white rounded-full text-sm font-medium hover:bg-purple-700 transition-colors"
            >
              All Guides
            </Link>
            {validCategories.map(category => (
              <Link 
                key={category.id} 
                href={`/category/${category.slug}`}
                className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>

          {/* Render each category's posts */}
          {featuredCategory && renderPostGrid(categoryPostsMap[featuredCategory.slug], featuredCategory)}
          {newsCategory && renderPostGrid(categoryPostsMap[newsCategory.slug], newsCategory)}
          {promotionCategory && renderPostGrid(categoryPostsMap[promotionCategory.slug], promotionCategory)}
          {aiMusicCategory && renderPostGrid(categoryPostsMap[aiMusicCategory.slug], aiMusicCategory)}

          {/* Show message if no posts are found */}
          {Object.values(categoryPostsMap).every(posts => !posts?.length) && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-700 mb-4">No Guides Found</h2>
              <p className="text-gray-600">
                We couldn't find any guides at the moment. Please check back later.
              </p>
            </div>
          )}
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error in GuidesPage:', error);
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Something went wrong</h1>
        <p className="text-gray-600 mb-8">We're having trouble loading the content. Please try again later.</p>
      </div>
    );
  }
}
