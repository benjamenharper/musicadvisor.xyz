'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchPosts } from '@/lib/wordpress';
import { config } from '@/lib/config';
import { useStore } from '@/components/providers/StoreProvider';
import SearchBox from '@/components/SearchBox';

interface Post {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  featuredImage?: {
    sourceUrl: string;
    altText: string;
  };
  categories: {
    nodes: {
      id: string;
      name: string;
      slug: string;
    }[];
  };
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface PostsClientProps {
  initialPosts: Post[];
  initialCategories: Category[];
}

export default function PostsClient({ initialPosts, initialCategories }: PostsClientProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [categories] = useState(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(false);
  const currentSiteKey = useStore((state) => state.currentSiteKey);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const site = config.sites[currentSiteKey];
        const newPosts = await fetchPosts(site);
        setPosts(newPosts);
      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [currentSiteKey]);

  const filteredPosts = selectedCategory === 'all'
    ? posts
    : posts.filter(post => 
        post.categories.nodes.some(cat => cat.slug === selectedCategory)
      );

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
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <SearchBox />
      </div>

      <div className="mb-8">
        <div className="flex space-x-4">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-md ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.slug)}
              className={`px-4 py-2 rounded-md ${
                selectedCategory === category.slug
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <Link key={post.id} href={`/${post.slug}`}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              {post.featuredImage && (
                <div className="relative h-48">
                  <Image
                    src={post.featuredImage.sourceUrl}
                    alt={post.featuredImage.altText || post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <div
                  className="text-gray-600 mb-4 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: post.excerpt }}
                />
                <div className="flex flex-wrap gap-2">
                  {post.categories.nodes.map((category) => (
                    <span
                      key={category.id}
                      className="px-2 py-1 bg-gray-100 text-sm text-gray-600 rounded"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
