'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SearchBox from '@/components/SearchBox';

interface ContentItem {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  type: 'post' | 'page';
  date?: string;
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

interface ContentClientProps {
  initialPosts: ContentItem[];
  initialPages: ContentItem[];
}

export default function ContentClient({ initialPosts, initialPages }: ContentClientProps) {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'posts' | 'pages'>('all');

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      try {
        // Dynamically import fetchPosts and fetchPages
        const { fetchPosts, fetchPages } = await import('@/lib/wordpress');

        const posts = await fetchPosts();
        const pages = await fetchPages();

        const combinedContent = [
          ...posts.map((post: any) => ({ ...post, type: 'post' as const })),
          ...pages.map((page: any) => ({ ...page, type: 'page' as const }))
        ].sort((a, b) => new Date(b.date || '').getTime() - new Date(a.date || '').getTime());

        setContent(combinedContent);
      } catch (error) {
        console.error('Error loading content:', error);
        setContent([]);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  const filteredContent = content.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'posts') return item.type === 'post';
    if (filter === 'pages') return item.type === 'page';
    return false;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <Link href="/content" className="group">
          <h1 className="text-4xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            Articles, News & Content
          </h1>
        </Link>
      </div>

      {/* Search Box */}
      <div className="mb-12">
        <div className="max-w-3xl mx-auto">
          <SearchBox />
        </div>
      </div>

      {/* Content Type Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              filter === 'all'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Content
          </button>
          <button
            onClick={() => setFilter('posts')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              filter === 'posts'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Articles & News
          </button>
          <button
            onClick={() => setFilter('pages')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              filter === 'pages'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Pages
          </button>
        </div>
      </div>

      {/* Content Grid */}
      {filteredContent.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No content found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredContent.map((item) => (
            <article
              key={`${item.type}-${item.id}`}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              {item._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                <div className="relative h-48 w-full">
                  <Image
                    src={item._embedded['wp:featuredmedia'][0].source_url}
                    alt={item.title.rendered}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-medium px-2 py-1 rounded ${
                    item.type === 'post' 
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    {item.type === 'post' ? 'Article' : 'Page'}
                  </span>
                  {item.type === 'post' && item._embedded?.['wp:term']?.[0] && (
                    <div className="flex gap-1">
                      {item._embedded['wp:term'][0].map((term) => (
                        <span
                          key={term.id}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                        >
                          {term.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <h2
                  className="text-xl font-semibold text-gray-900 mb-4"
                  dangerouslySetInnerHTML={{ __html: item.title.rendered }}
                />
                <div
                  className="text-gray-600 text-sm mb-4 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: item.excerpt?.rendered || '' }}
                />
                <Link
                  href={`/${item.slug}`}
                  className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  Read more
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
