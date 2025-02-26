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

export default function WordPressAuthorsPage() {
  const [authors, setAuthors] = useState<WPAuthor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [errorDetails, setErrorDetails] = useState<any>(null);
  const [debugInfo, setDebugInfo] = useState<any>(null);

  useEffect(() => {
    async function fetchAuthors() {
      try {
        console.log('Fetching WordPress authors...');
        const response = await fetch('/api/wp-authors');
        
        if (!response.ok) {
          const errorData = await response.json();
          console.error(`API error: ${response.status} - ${JSON.stringify(errorData)}`);
          setError(`Failed to fetch authors: ${response.status}`);
          setErrorDetails(errorData);
          return;
        }
        
        const data = await response.json();
        console.log('Received WordPress authors data:', data);
        
        if (data.authors) {
          // New response format with debug info
          setAuthors(data.authors);
          setDebugInfo(data.debug);
          console.log(`Received ${data.authors.length} WordPress authors`);
        } else {
          // Old response format (just an array)
          setAuthors(data);
          console.log(`Received ${data.length} WordPress authors`);
        }
      } catch (err) {
        console.error('Error fetching WordPress authors:', err);
        setError('Failed to load WordPress authors. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchAuthors();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">WordPress Authors</h1>
            <p className="text-gray-600">
              This page displays authors directly from the WordPress API. This is a demonstration of how we can 
              transition to using WordPress's native author functionality.
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              <p className="font-bold">{error}</p>
              
              <div className="mt-4">
                <a 
                  href="https://benh155.sg-host.com/wp-json/wp/v2/users?per_page=100" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Try Direct WordPress API URL
                </a>
              </div>
              
              {errorDetails && (
                <div className="mt-4 p-4 bg-gray-100 rounded-md">
                  <p className="text-sm font-bold">Error Details:</p>
                  <pre className="text-xs mt-1 overflow-auto max-h-40">
                    {JSON.stringify(errorDetails, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          ) : authors.length > 0 ? (
            <>
              {debugInfo && (
                <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-md mb-6">
                  <p><strong>Debug Info:</strong></p>
                  <pre className="mt-2 text-xs overflow-auto max-h-40">
                    {JSON.stringify(debugInfo, null, 2)}
                  </pre>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {authors.map((author) => (
                  <div key={author.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        {author.avatar && (
                          <img 
                            src={author.avatar} 
                            alt={author.name} 
                            className="w-12 h-12 rounded-full mr-4"
                          />
                        )}
                        <div>
                          <h2 className="text-xl font-bold text-gray-900">
                            {decodeHTML(author.name)}
                          </h2>
                          <p className="text-sm text-gray-500">WordPress ID: {author.id}</p>
                        </div>
                      </div>
                      
                      {author.description && (
                        <div 
                          className="text-gray-600 mb-4 line-clamp-3"
                          dangerouslySetInnerHTML={{ __html: decodeHTML(author.description) }}
                        />
                      )}
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {author.meta.twitter && (
                          <a 
                            href={author.meta.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:text-blue-800"
                          >
                            Twitter
                          </a>
                        )}
                        {author.meta.linkedin && (
                          <a 
                            href={author.meta.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:text-blue-800"
                          >
                            LinkedIn
                          </a>
                        )}
                        {author.meta.website && (
                          <a 
                            href={author.meta.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:text-blue-800"
                          >
                            Website
                          </a>
                        )}
                      </div>
                      
                      <div className="mt-4">
                        <Link 
                          href={`/wp-authors/${author.slug}`}
                          className="text-indigo-600 hover:text-indigo-700 font-medium"
                        >
                          View Author Page →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-md">
              <p className="font-bold">No WordPress authors found.</p>
              <p className="mt-2">Make sure your WordPress site has users with the author role.</p>
              <div className="mt-4 p-4 bg-gray-100 rounded-md">
                <p className="text-sm font-bold">Debug Information:</p>
                <p className="text-xs mt-1">API URL: {`${window.location.origin}/api/wp-authors`}</p>
                <p className="text-xs mt-1">Authors array length: {authors.length}</p>
                {debugInfo && (
                  <div className="mt-2">
                    <p className="text-xs font-semibold">API Debug Info:</p>
                    <pre className="text-xs mt-1 overflow-auto max-h-40">
                      {JSON.stringify(debugInfo, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
