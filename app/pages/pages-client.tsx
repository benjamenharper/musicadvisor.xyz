'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useStore } from '@/components/providers/StoreProvider';
import { fetchPages } from '@/lib/wordpress';
import { config } from '@/lib/config';

interface WordPressPage {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  link: string;
}

interface PagesClientProps {
  initialPages: WordPressPage[];
}

export default function PagesClient({ initialPages }: PagesClientProps) {
  const [pages, setPages] = useState(initialPages);
  const [loading, setLoading] = useState(false);
  const currentSiteKey = useStore((state) => state.currentSiteKey);
  const site = config.sites[currentSiteKey];

  useEffect(() => {
    const loadPages = async () => {
      if (currentSiteKey === config.defaultSite) {
        setPages(initialPages);
        return;
      }

      setLoading(true);
      try {
        const data = await fetchPages(site);
        setPages(data);
      } catch (error) {
        console.error('Error fetching pages:', error);
        setPages([]);
      } finally {
        setLoading(false);
      }
    };

    loadPages();
  }, [currentSiteKey, site, initialPages]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Pages</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pages.map((page) => (
          <Link key={page.id} href={`/${page.slug}`}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{page.title}</h2>
                <div
                  className="text-gray-600 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: page.excerpt }}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
