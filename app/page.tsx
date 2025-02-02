import { fetchPosts, fetchCategories } from '@/lib/wordpress';
import { format } from 'date-fns';
import { decodeHTML } from '@/lib/utils';

export default async function Home() {
  try {
    // First fetch categories to get their IDs
    const categories = await fetchCategories();
    const categoryMap = categories.reduce((acc: Record<string, number>, cat: any) => {
      acc[cat.slug] = cat.id;
      return acc;
    }, {});

    // Fetch posts by category
    const [featuredPosts, newsPosts, promotionPosts] = await Promise.all([
      fetchPosts({
        categories: categoryMap['featured']?.toString() || '',
        per_page: '9',
        _embed: 'true'
      }),
      fetchPosts({
        categories: categoryMap['news']?.toString() || '',
        per_page: '9',
        _embed: 'true'
      }),
      fetchPosts({
        categories: categoryMap['music-promotion']?.toString() || '',
        per_page: '9',
        _embed: 'true'
      })
    ]);

    const renderPostGrid = (posts: any[], title: string) => {
      if (!posts || posts.length === 0) return null;
      
      return (
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">{title}</h2>
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
                        {decodeHTML(post.title.rendered || '')}
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
      );
    };

    // Show debug info if no posts are found
    if (!featuredPosts?.length && !newsPosts?.length && !promotionPosts?.length) {
      return (
        <main className="bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">Welcome to Music Advisor</h2>
              <p className="mt-2 text-gray-600">
                We're setting up our content. Please check back soon.
              </p>
              <div className="mt-8 text-left bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Debug Information:</h3>
                <pre className="text-sm overflow-auto whitespace-pre-wrap">
                  {JSON.stringify({
                    categories: categoryMap,
                    postCounts: {
                      featured: featuredPosts?.length || 0,
                      news: newsPosts?.length || 0,
                      promotion: promotionPosts?.length || 0
                    }
                  }, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </main>
      );
    }

    return (
      <main className="bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {renderPostGrid(featuredPosts, "Featured Articles")}
          {renderPostGrid(newsPosts, "Latest News")}
          {renderPostGrid(promotionPosts, "Music Promotion")}
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error in Home page:', error);
    return (
      <main className="bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Welcome to Music Advisor</h2>
            <p className="mt-2 text-gray-600">
              We're experiencing technical difficulties. Please try again later.
            </p>
            <div className="mt-8 text-left bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Debug Information:</h3>
              <pre className="text-sm overflow-auto whitespace-pre-wrap">
                {JSON.stringify({
                  error: error instanceof Error ? error.message : 'Unknown error'
                }, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
