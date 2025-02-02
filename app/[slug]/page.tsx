import { fetchPostBySlug, fetchRecentPosts } from '@/lib/wordpress';
import { format } from 'date-fns';
import { decodeHTML } from '@/lib/utils';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function PostPage({ params }: { params: { slug: string } }) {
  const [post, recentPosts] = await Promise.all([
    fetchPostBySlug(params.slug),
    fetchRecentPosts(5)
  ]);
  
  if (!post) {
    notFound();
  }

  return (
    <main className="bg-background min-h-screen py-12">
      {/* Featured Image - Full Width */}
      {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
        <div className="relative h-[400px] mb-8">
          <img 
            src={post._embedded['wp:featuredmedia'][0].source_url}
            alt={post.title.rendered || ''}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <article className="flex-1">
            <header className="mb-8">
              {post.title.rendered && (
                <h1 
                  className="text-4xl font-bold text-gray-900 mb-4"
                >{decodeHTML(post.title.rendered)}</h1>
              )}
              <time className="text-gray-500">
                {format(new Date(post.date), 'MMMM d, yyyy')}
              </time>
            </header>

            {post.content.rendered && (
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content.rendered }}
              />
            )}
          </article>

          {/* Sidebar */}
          <aside className="lg:w-80 space-y-8">
            {/* Recent Posts */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Posts</h2>
              <div className="space-y-4">
                {recentPosts.filter(p => p.id !== post.id).slice(0, 4).map((recentPost) => (
                  <div key={recentPost.id} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                    <Link 
                      href={`/${recentPost.slug}`}
                      className="block hover:text-indigo-600 transition-colors"
                    >
                      <h3 className="font-medium text-gray-900 line-clamp-2" 
                        dangerouslySetInnerHTML={{ __html: recentPost.title.rendered || '' }}
                      />
                      <time className="text-sm text-gray-500">
                        {format(new Date(recentPost.date), 'MMMM d, yyyy')}
                      </time>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Categories</h2>
              <div className="space-y-2">
                <Link 
                  href="/category/news"
                  className="block text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  News
                </Link>
                <Link 
                  href="/category/featured"
                  className="block text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  Featured
                </Link>
                <Link 
                  href="/category/promotion"
                  className="block text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  Promotion
                </Link>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
              <h2 className="text-xl font-bold mb-4">Stay Updated</h2>
              <p className="text-sm mb-4 text-indigo-100">
                Get the latest music industry news and promotion tips delivered to your inbox.
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-white text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
