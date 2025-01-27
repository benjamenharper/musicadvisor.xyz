'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchPages } from '@/lib/wordpress';
import { useStore } from '@/components/providers/StoreProvider';

interface WordPressPage {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  slug: string;
  link: string;
}

export default function Pages() {
  const [pages, setPages] = useState<WordPressPage[]>([]);
  const [loading, setLoading] = useState(true);
  const currentSiteKey = useStore((state) => state.currentSiteKey);

  useEffect(() => {
    const loadPages = async () => {
      setLoading(true);
      try {
        const data = await fetchPages();
        setPages(data);
      } catch (error) {
        console.error('Error fetching pages:', error);
        setPages([]);
      } finally {
        setLoading(false);
      }
    };

    loadPages();
  }, [currentSiteKey]);

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
        <Link href="/pages" className="group">
          <h1 className="text-4xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Pages</h1>
        </Link>
      </div>

      {pages.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No pages found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pages.map((page) => (
            <article
              key={page.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-6">
                <h2
                  className="text-xl font-semibold text-gray-900 mb-4"
                  dangerouslySetInnerHTML={{ __html: page.title.rendered }}
                />
                <div
                  className="text-gray-600 text-sm mb-4 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: page.excerpt?.rendered || '' }}
                />
                <Link
                  href={`/${page.slug}`}
                  className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  View Page
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
