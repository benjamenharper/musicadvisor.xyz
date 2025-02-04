import { fetchPosts, fetchCategories } from '@/lib/api';
import { format } from 'date-fns';
import { decodeHTML } from '@/lib/utils';
import Link from 'next/link';
import AuthorAttribution from '@/components/AuthorAttribution';
import { config } from '@/lib/config';

// Force dynamic rendering at runtime
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

export default async function Home() {
  try {
    // Get the categories we need
    const categories = await fetchCategories(config.defaultSite);
    console.log('Home: All categories:', categories.map(c => ({ id: c.id, name: c.name, slug: c.slug })));
    
    const featuredCategory = categories.find(cat => cat.slug === 'featured');
    const newsCategory = categories.find(cat => cat.slug === 'news');
    const promotionCategory = categories.find(cat => cat.slug === 'promotion');

    console.log('Home: Found categories:', {
      featured: featuredCategory?.id,
      news: newsCategory?.id,
      promotion: promotionCategory?.id
    });

    if (!featuredCategory || !newsCategory || !promotionCategory) {
      console.error('Required categories not found:', { 
        featured: featuredCategory, 
        news: newsCategory, 
        promotion: promotionCategory 
      });
      throw new Error('Required categories not found');
    }

    // Fetch posts for each category
    console.log('Home: Fetching posts for categories:', {
      featured: featuredCategory.id,
      news: newsCategory.id,
      promotion: promotionCategory.id
    });

    const [featuredPosts, newsPosts, promotionPosts] = await Promise.all([
      fetchPosts(config.defaultSite, featuredCategory.id.toString(), { per_page: '6', _embed: 'true' }),
      fetchPosts(config.defaultSite, newsCategory.id.toString(), { per_page: '6', _embed: 'true' }),
      fetchPosts(config.defaultSite, promotionCategory.id.toString(), { per_page: '6', _embed: 'true' })
    ]);

    console.log('Home: Post counts:', {
      featured: featuredPosts?.length || 0,
      news: newsPosts?.length || 0,
      promotion: promotionPosts?.length || 0
    });

    const renderPostGrid = (posts: any[], category: any) => {
      if (!posts || posts.length === 0) return null;

      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post: any) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                <Link href={`/posts/${post.slug}`}>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post._embedded['wp:featuredmedia'][0].source_url}
                      alt={decodeHTML(post.title.rendered)}
                      className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                </Link>
              )}
              <div className="p-4">
                <Link href={`/posts/${post.slug}`}>
                  <h3 className="text-xl font-semibold mb-2 hover:text-blue-600 transition-colors duration-200">
                    {decodeHTML(post.title.rendered)}
                  </h3>
                </Link>
                <div 
                  className="text-gray-600 mb-4 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                />
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{format(new Date(post.date), 'MMM d, yyyy')}</span>
                  <span>{post.readingTime} min read</span>
                </div>
              </div>
            </div>
          ))}
        </div>
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
