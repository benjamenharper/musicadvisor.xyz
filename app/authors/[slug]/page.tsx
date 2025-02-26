'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { authors } from '@/lib/data/authors';
import { decodeHTML } from '@/lib/utils';

export default function AuthorPage({ params }: { params: { slug: string } }) {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Find the author from our data
  const author = authors.find(a => a.id === params.slug);
  
  // If no author is found, we'll use the slug to create a name
  const authorName = author ? author.name : params.slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  useEffect(() => {
    async function fetchAuthorPosts() {
      try {
        // Fetch posts for this specific author using our new API endpoint
        console.log(`Fetching posts for author: ${params.slug}`);
        const response = await fetch(`/api/posts/by-author?authorId=${params.slug}`);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error(`API error: ${response.status} - ${errorText}`);
          throw new Error(`Failed to fetch posts: ${response.status}`);
        }
        
        const authorPosts = await response.json();
        console.log(`Received ${authorPosts.length} posts for author ${params.slug}`);
        console.log('First post (if any):', authorPosts[0]);
        setPosts(authorPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
        // Set empty posts array in case of error
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }
    
    fetchAuthorPosts();
  }, [params.slug]);

  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Author Profile */}
          <section className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-48 h-48 relative flex-shrink-0 mx-auto md:mx-0">
                <img
                  src={author?.image?.src || "/conormurphy.png"}
                  alt={authorName}
                  className="rounded-lg object-cover w-full h-full"
                />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {authorName}
                </h1>
                <h2 className="text-xl text-indigo-600 mb-4">{author?.role || "Music Industry Expert"}</h2>
                <div className="prose prose-lg mb-6">
                  <p>{author?.shortBio || "Experienced music industry professional with expertise in artist development and digital marketing."}</p>
                </div>
                <div className="flex flex-wrap gap-3 mb-6">
                  {author?.expertiseAreas?.map((area, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {area}
                    </span>
                  )) || (
                    <>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        artist development
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        digital marketing
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        music promotion
                      </span>
                    </>
                  )}
                </div>
                <div className="flex gap-4">
                  {author?.socialLinks?.twitter && (
                    <a
                      href={author.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-indigo-600"
                    >
                      Twitter
                    </a>
                  )}
                  {author?.socialLinks?.linkedin && (
                    <a
                      href={author.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-indigo-600"
                    >
                      LinkedIn
                    </a>
                  )}
                  {author?.socialLinks?.website && (
                    <a
                      href={author.socialLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-indigo-600"
                    >
                      Website
                    </a>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Author's Articles */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Latest Articles</h2>
            
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              </div>
            ) : posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <article key={post.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-gray-900 mb-2">
                        <a href={`/${post.slug}`} className="hover:text-indigo-600 transition-colors">
                          {decodeHTML(post.title?.rendered || post.title || "Untitled Post")}
                        </a>
                      </h2>
                      <div className="text-sm text-gray-500 mb-3">
                        {post.readingTime || '5'} mins read
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <time className="text-sm text-gray-500">
                          {new Date(post.date).toLocaleDateString()}
                        </time>
                      </div>
                      <div 
                        className="text-gray-600 line-clamp-3"
                        dangerouslySetInnerHTML={{ 
                          __html: post.excerpt?.rendered || post.excerpt || "No excerpt available"
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
