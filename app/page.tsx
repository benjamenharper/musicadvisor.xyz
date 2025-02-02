import { fetchPosts, fetchCategories } from '@/lib/wordpress';
import { format } from 'date-fns';
import { decodeHTML } from '@/lib/utils';
import Link from 'next/link';
import AuthorAttribution from '@/components/AuthorAttribution';

export default async function Home() {
  try {
    // Get the categories we need
    const categories = await fetchCategories();
    const featuredCategory = categories.find(cat => cat.slug === 'featured');
    const newsCategory = categories.find(cat => cat.slug === 'news');
    const promotionCategory = categories.find(cat => cat.slug === 'promotion');

    if (!featuredCategory || !newsCategory || !promotionCategory) {
      console.error('Required categories not found:', { 
        featured: featuredCategory, 
        news: newsCategory, 
        promotion: promotionCategory 
      });
      throw new Error('Required categories not found');
    }

    // Fetch posts for each category
    const [featuredPosts, newsPosts, promotionPosts] = await Promise.all([
      fetchPosts({ categories: featuredCategory.id.toString(), per_page: '6', _embed: 'true' }),
      fetchPosts({ categories: newsCategory.id.toString(), per_page: '6', _embed: 'true' }),
      fetchPosts({ categories: promotionCategory.id.toString(), per_page: '6', _embed: 'true' })
    ]);

    const renderPostGrid = (posts: any[], category: any) => {
      if (!posts || posts.length === 0) return null;
      
      return (
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{category.name}</h2>
            <Link 
              href={`/category/${category.slug}`}
              className="text-indigo-600 hover:text-indigo-700"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post) => (
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
                  <div className="flex items-center justify-between mb-4">
                    <AuthorAttribution articleId={post.id.toString()} compact />
                    <time className="text-sm text-gray-500">
                      {format(new Date(post.date), 'MMMM d, yyyy')}
                    </time>
                  </div>
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
        </section>
      );
    };

    return (
      <main className="bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {renderPostGrid(featuredPosts, featuredCategory)}
          {renderPostGrid(newsPosts, newsCategory)}
          {renderPostGrid(promotionPosts, promotionCategory)}

          {/* Show debug info if no posts are found */}
          {!featuredPosts?.length && !newsPosts?.length && !promotionPosts?.length && (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">Welcome to Music Advisor</h2>
              <p className="mt-2 text-gray-600">
                We're setting up our content. Please check back soon.
              </p>
              <div className="mt-8 text-left bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Debug Information:</h3>
                <pre className="text-sm overflow-auto whitespace-pre-wrap">
                  {JSON.stringify({
                    categories: categories,
                    postCounts: {
                      featured: featuredPosts?.length || 0,
                      news: newsPosts?.length || 0,
                      promotion: promotionPosts?.length || 0
                    }
                  }, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error in Home:', error);
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-red-600">Error loading content. Please try again later.</p>
      </div>
    );
  }
}
