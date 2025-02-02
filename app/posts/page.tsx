'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SearchBox from '@/components/SearchBox';
import { useStore } from '@/components/providers/StoreProvider';
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

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const currentSiteKey = useStore((state) => state.currentSiteKey);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [categoriesData, postsData] = await Promise.all([
          fetchCategories(currentSiteKey || config.defaultSite),
          fetchPosts({ _embed: '1', _fields: 'id,slug,title,excerpt,date,_links,_embedded' }, currentSiteKey || config.defaultSite)
        ]);
        
        setCategories(categoriesData);
        setPosts(postsData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setCategories([]);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
    // Reset selected category when site changes
    setSelectedCategory('all');
  }, [currentSiteKey]); // Re-fetch when site changes

  const filteredPosts = selectedCategory === 'all'
    ? posts
    : posts.filter(post => 
        post._embedded?.['wp:term']?.[0]?.some(term => term.slug === selectedCategory)
      );

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
        <Link href="/posts" className="group">
          <h1 className="text-4xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Articles & News</h1>
        </Link>
      </div>

      {/* Search Box */}
      <div className="mb-8">
        <SearchBox />
      </div>
      
      {/* Categories */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              selectedCategory === 'all'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.slug)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                selectedCategory === category.slug
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Grid */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No articles found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                <div className="relative h-48 w-full">
                  <Image
                    src={post._embedded['wp:featuredmedia'][0].source_url}
                    alt={post.title.rendered}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  <Link href={`/${post.slug}`} className="hover:text-indigo-600 transition-colors">
                    {decodeHTML(post.title.rendered)}
                  </Link>
                </h2>
                <div className="text-sm text-gray-500 mb-3">{post.readingTime} mins read</div>
                <div className="flex items-center justify-between mb-4">
                  <AuthorAttribution articleId={post.id.toString()} compact />
                  <time className="text-sm text-gray-500">
                    {format(new Date(post.date), 'MMMM d, yyyy')}
                  </time>
                </div>
                {/* Categories */}
                <div className="mb-4">
                  {post._embedded?.['wp:term']?.[0]?.map((term) => (
                    <span
                      key={term.id}
                      className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full mr-2 mb-2"
                    >
                      {term.name}
                    </span>
                  ))}
                </div>
                <div
                  className="text-gray-600 text-sm mb-4 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                />
                <Link
                  href={`/${post.slug}`}
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
