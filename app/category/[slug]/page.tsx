import { fetchPosts } from '@/lib/wordpress';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const posts = await fetchPosts({
    categories: params.slug,
    per_page: '12',
    _embed: 'true'
  });

  if (!posts || posts.length === 0) {
    notFound();
  }

  // Capitalize first letter of category name
  const categoryTitle = params.slug.charAt(0).toUpperCase() + params.slug.slice(1);

  return (
    <main className="bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-8">{categoryTitle}</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
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
                    <a href={`/${post.slug}`} className="hover:text-indigo-600 transition-colors">
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
      </div>
    </main>
  );
}
