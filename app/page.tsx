import { fetchPosts } from '@/lib/wordpress';
import { format } from 'date-fns';

export default async function Home() {
  // Fetch featured posts first
  const featuredPosts = await fetchPosts({
    categories: 'featured',
    per_page: '3',
    _embed: 'true'
  });

  // Fetch latest posts from all categories
  const latestPosts = await fetchPosts({
    per_page: '9',
    _embed: 'true',
    exclude: featuredPosts.map(post => post.id).join(',')
  });

  return (
    <main className="bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {featuredPosts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Featured</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredPosts.map((post) => (
                <article key={post.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                    <div className="relative h-48">
                      <img 
                        src={post._embedded['wp:featuredmedia'][0].source_url}
                        alt={post.title.rendered || ''}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex flex-col gap-2">
                      <h2 className="text-xl font-bold text-gray-900">
                        <a href={`/post/${post.slug}`} className="hover:text-indigo-600 transition-colors">
                          {post.title.rendered || ''}
                        </a>
                      </h2>
                      <time className="text-sm text-gray-500">
                        {format(new Date(post.date), 'MMMM d, yyyy')}
                      </time>
                    </div>
                    {post.excerpt.rendered && (
                      <div 
                        className="mt-4 text-gray-600 line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                      />
                    )}
                    <div className="mt-4">
                      <a
                        href={`/post/${post.slug}`}
                        className="text-indigo-600 hover:text-indigo-700 font-medium"
                      >
                        Read More →
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestPosts.map((post) => (
            <article key={post.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                <div className="relative h-48">
                  <img 
                    src={post._embedded['wp:featuredmedia'][0].source_url}
                    alt={post.title.rendered || ''}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-bold text-gray-900">
                    <a href={`/post/${post.slug}`} className="hover:text-indigo-600 transition-colors">
                      {post.title.rendered || ''}
                    </a>
                  </h2>
                  <time className="text-sm text-gray-500">
                    {format(new Date(post.date), 'MMMM d, yyyy')}
                  </time>
                </div>
                {post.excerpt.rendered && (
                  <div 
                    className="mt-4 text-gray-600 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                  />
                )}
                <div className="mt-4">
                  <a
                    href={`/post/${post.slug}`}
                    className="text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    Read More →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
