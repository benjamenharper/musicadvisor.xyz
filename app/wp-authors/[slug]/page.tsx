'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { decodeHTML } from '@/lib/utils';

interface WPAuthor {
  id: number;
  name: string;
  slug: string;
  description: string;
  avatar: string | null;
  link: string;
  meta: {
    twitter: string | null;
    linkedin: string | null;
    website: string | null;
  };
}

interface Post {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  slug: string;
  link: string;
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string }>;
  };
}

export default function WordPressAuthorPage({ params }: { params: { slug: string } }) {
  const [author, setAuthor] = useState<WPAuthor | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAuthorAndPosts() {
      try {
        console.log(`Fetching WordPress author: ${params.slug}`);
        
        // Fetch the author data
        const authorResponse = await fetch(`/api/wp-authors?slug=${params.slug}`);
        
        if (!authorResponse.ok) {
          throw new Error(`Failed to fetch author: ${authorResponse.status}`);
        }
        
        const authors = await authorResponse.json();
        
        if (!authors || authors.length === 0) {
          throw new Error('Author not found');
        }
        
        const authorData = authors[0];
        setAuthor(authorData);
        
        // Now fetch posts by this author
        console.log(`Fetching posts for author ID: ${authorData.id}`);
        
        const postsResponse = await fetch(`/api/posts/by-wp-author?authorId=${authorData.id}`);
        
        if (!postsResponse.ok) {
          throw new Error(`Failed to fetch posts: ${postsResponse.status}`);
        }
        
        const postsData = await postsResponse.json();
        console.log(`Received ${postsData.length} posts for author ${authorData.name}`);
        
        setPosts(postsData);
      } catch (err) {
        console.error('Error:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    }
    
    fetchAuthorAndPosts();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !author) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              {error || 'Author not found'}
            </div>
            <div className="mt-4">
              <Link href="/wp-authors" className="text-indigo-600 hover:text-indigo-700">
                ← Back to WordPress Authors
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Author Profile */}
          <section className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-48 h-48 relative flex-shrink-0 mx-auto md:mx-0">
                <img
                  src={author.avatar || "/placeholder-avatar.png"}
                  alt={author.name}
                  className="rounded-lg object-cover w-full h-full"
                />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {decodeHTML(author.name)}
                </h1>
                <h2 className="text-xl text-indigo-600 mb-4">WordPress Author</h2>
                
                {author.description && (
                  <div 
                    className="prose prose-lg mb-6"
                    dangerouslySetInnerHTML={{ __html: decodeHTML(author.description) }}
                  />
                )}
                
                <div className="flex gap-4 mb-4">
                  {author.meta.twitter && (
                    <a
                      href={author.meta.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-indigo-600"
                    >
                      Twitter
                    </a>
                  )}
                  {author.meta.linkedin && (
                    <a
                      href={author.meta.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-indigo-600"
                    >
                      LinkedIn
                    </a>
                  )}
                  {author.meta.website && (
                    <a
                      href={author.meta.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-indigo-600"
                    >
                      Website
                    </a>
                  )}
                </div>
                
                <div className="mt-4">
                  <Link href="/wp-authors" className="text-indigo-600 hover:text-indigo-700">
                    ← Back to WordPress Authors
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Author's Articles */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Latest Articles</h2>
            
            {posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <article key={post.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-gray-900 mb-2">
                        <a href={`/${post.slug}`} className="hover:text-indigo-600 transition-colors">
                          {decodeHTML(post.title.rendered)}
                        </a>
                      </h2>
                      <div className="text-sm text-gray-500 mb-3">
                        5 mins read
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <time className="text-sm text-gray-500">
                          {new Date(post.date).toLocaleDateString()}
                        </time>
                      </div>
                      <div 
                        className="text-gray-600 line-clamp-3"
                        dangerouslySetInnerHTML={{ 
                          __html: decodeHTML(post.excerpt.rendered)
                        }}
                      />
                      <div className="mt-4">
                        <a
                          href={`/${post.slug}`}
                          className="text-indigo-600 hover:text-indigo-700 font-medium"
                        >
                          Read More →
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No articles found for this author.</p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
