import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { authors } from '@/lib/data/authors';
import { fetchPosts } from '@/lib/wordpress';
import { format } from 'date-fns';
import { decodeHTML } from '@/lib/utils';
import fs from 'fs/promises';
import path from 'path';

async function getAuthorPosts(authorId: string) {
  try {
    const csvPath = path.join(process.cwd(), 'data', 'post-authors.csv');
    const content = await fs.readFile(csvPath, 'utf-8');
    const lines = content.split('\n').slice(1); // Skip header
    
    // Get all post IDs for this author
    const authorPostIds = lines
      .filter(line => line.trim())
      .map(line => {
        const [postId, assignedAuthorId] = line.split(',');
        return assignedAuthorId.trim() === authorId ? postId.trim() : null;
      })
      .filter(id => id !== null);

    // Fetch all posts
    const allPosts = await fetchPosts({ per_page: '50', _embed: 'true' });
    
    // Filter posts by author's post IDs
    return allPosts.filter(post => authorPostIds.includes(post.id.toString()));
  } catch (error) {
    console.error('Error getting author posts:', error);
    return [];
  }
}

export default async function AuthorPage({ params }: { params: { slug: string } }) {
  const author = authors.find(a => a.id === params.slug);
  if (!author) {
    notFound();
  }

  const authorPosts = await getAuthorPosts(author.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Author Profile */}
      <section className="bg-white rounded-lg shadow-lg p-8 mb-12">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-48 h-48 relative flex-shrink-0 mx-auto md:mx-0">
            <Image
              src={author.image}
              alt={author.name}
              className="rounded-lg object-cover"
              priority
              placeholder="blur"
              fill
            />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {author.name}
            </h1>
            <h2 className="text-xl text-indigo-600 mb-4">{author.role}</h2>
            <div className="prose prose-lg mb-6">
              <p>{author.shortBio}</p>
            </div>
            <div className="flex flex-wrap gap-3 mb-6">
              {author.expertiseAreas.map(area => (
                <span
                  key={area}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {area}
                </span>
              ))}
            </div>
            {author.socialLinks && (
              <div className="flex gap-4">
                {author.socialLinks.twitter && (
                  <a
                    href={author.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-indigo-600"
                  >
                    Twitter
                  </a>
                )}
                {author.socialLinks.linkedin && (
                  <a
                    href={author.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-indigo-600"
                  >
                    LinkedIn
                  </a>
                )}
                {author.socialLinks.website && (
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
            )}
          </div>
        </div>
      </section>

      {/* Author's Articles */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Latest Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {authorPosts.map(post => (
            <article key={post.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                <div className="relative h-48">
                  <img 
                    src={post._embedded['wp:featuredmedia'][0].source_url}
                    alt={decodeHTML(post.title.rendered || '')}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  <Link href={`/${post.slug}`} className="hover:text-indigo-600 transition-colors">
                    {decodeHTML(post.title.rendered || '')}
                  </Link>
                </h3>
                <time className="text-sm text-gray-500 mb-4 block">
                  {format(new Date(post.date), 'MMMM d, yyyy')}
                </time>
                {post.excerpt.rendered && (
                  <div 
                    className="text-gray-600 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                  />
                )}
                <div className="mt-4">
                  <Link
                    href={`/${post.slug}`}
                    className="text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        {authorPosts.length === 0 && (
          <p className="text-gray-600">No articles found by this author.</p>
        )}
      </section>
    </div>
  );
}
