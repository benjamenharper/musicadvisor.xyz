'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '@/components/providers/StoreProvider';
import SearchBox from '@/components/SearchBox';
import { fetchPosts, fetchPages } from '@/lib/wordpress';
import { config } from '@/lib/config';

interface ContentItem {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  type: 'post' | 'page';
  featuredImage?: {
    sourceUrl: string;
    altText: string;
  };
  categories?: {
    nodes: {
      id: string;
      name: string;
      slug: string;
    }[];
  };
}

interface ContentClientProps {
  initialPosts: ContentItem[];
  initialPages: ContentItem[];
}

export default function ContentClient({ initialPosts, initialPages }: ContentClientProps) {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'posts' | 'pages'>('all');
  const currentSiteKey = useStore((state) => state.currentSiteKey);
  const site = config.sites[currentSiteKey];

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      try {
        const [posts, pages] = await Promise.all([
          fetchPosts(site),
          fetchPages(site)
        ]);

        const combinedContent = [
          ...posts.map((post: any) => ({ ...post, type: 'post' as const })),
          ...pages.map((page: any) => ({ ...page, type: 'page' as const }))
        ].sort((a, b) => new Date(b.date || '').getTime() - new Date(a.date || '').getTime());

        setContent(combinedContent);
      } catch (error) {
        console.error('Error loading content:', error);
      } finally {
        setLoading(false);
      }
    };

    if (currentSiteKey !== config.defaultSite) {
      loadContent();
    } else {
      const combinedContent = [
        ...initialPosts.map((post: any) => ({ ...post, type: 'post' as const })),
        ...initialPages.map((page: any) => ({ ...page, type: 'page' as const }))
      ].sort((a, b) => new Date(b.date || '').getTime() - new Date(a.date || '').getTime());
      
      setContent(combinedContent);
      setLoading(false);
    }
  }, [currentSiteKey, site, initialPosts, initialPages]);

  const filteredContent = content.filter(item => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Content</h1>
        <SearchBox />
      </div>

      <div className="mb-8">
        <div className="flex space-x-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('posts')}
            className={`px-4 py-2 rounded-md ${
              filter === 'posts'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Posts
          </button>
          <button
            onClick={() => setFilter('pages')}
            className={`px-4 py-2 rounded-md ${
              filter === 'pages'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Pages
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredContent.map((item) => (
          <Link key={item.id} href={`/${item.slug}`}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              {item.featuredImage && (
                <div className="relative h-48">
                  <Image
                    src={item.featuredImage.sourceUrl}
                    alt={item.featuredImage.altText || item.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <span className="px-2 py-1 bg-gray-100 text-sm text-gray-600 rounded capitalize">
                    {item.type}
                  </span>
                </div>
                <div
                  className="text-gray-600 mb-4 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: item.excerpt }}
                />
                {item.type === 'post' && item.categories && (
                  <div className="flex flex-wrap gap-2">
                    {item.categories.nodes.map((category) => (
                      <span
                        key={category.id}
                        className="px-2 py-1 bg-gray-100 text-sm text-gray-600 rounded"
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
