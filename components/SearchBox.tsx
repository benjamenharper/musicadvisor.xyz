'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { searchPosts } from '@/lib/wordpress';
import { useSiteStore } from '@/lib/store';
import { useDebounce } from '@/lib/hooks';

interface SearchResult {
  id: number;
  slug: string;
  title: { rendered: string };
}

export default function SearchBox() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const { currentSiteKey } = useSiteStore();
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const searchArticles = async () => {
      setError(null);
      
      if (debouncedQuery.trim().length === 0) {
        setResults([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      
      try {
        const searchResults = await searchPosts(debouncedQuery, currentSiteKey);
        setResults(searchResults);
        setShowResults(true);
      } catch (error) {
        console.error('Error searching articles:', error);
        setError('Failed to search articles');
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    searchArticles();
  }, [debouncedQuery, currentSiteKey]);

  return (
    <div className="relative w-full" ref={searchRef}>
      <div className="relative">
        <div className="relative flex items-center">
          <svg 
            className="absolute left-4 h-6 w-6 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowResults(true)}
            placeholder="Search articles and pages..."
            className="w-full pl-12 pr-4 py-4 text-lg text-gray-900 placeholder-gray-500 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            aria-label="Search content"
          />
          {isLoading && (
            <div className="absolute right-4">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          )}
        </div>
      </div>

      {/* Results dropdown */}
      {showResults && (query.trim().length > 0) && (
        <div className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
          {error ? (
            <div className="px-6 py-4 text-sm text-red-500">
              {error}
            </div>
          ) : results.length === 0 ? (
            <div className="px-6 py-4 text-base text-gray-500">
              No content found
            </div>
          ) : (
            <ul className="py-2">
              {results.map((result) => (
                <li key={result.id}>
                  <Link
                    href={`/${result.slug}`}
                    className="block px-6 py-3 hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      setShowResults(false);
                      setQuery('');
                    }}
                  >
                    <span
                      className="text-base text-gray-900"
                      dangerouslySetInnerHTML={{ __html: result.title.rendered }}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
