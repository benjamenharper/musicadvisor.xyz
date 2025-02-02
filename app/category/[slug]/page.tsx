import { fetchPosts, fetchCategories } from '@/lib/wordpress';
import { decodeHTML } from '@/lib/utils';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';
import AuthorAttribution from '@/components/AuthorAttribution';
import Link from 'next/link';

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  try {
    console.log('CategoryPage: Fetching for slug:', params.slug);
    
    // First fetch categories to get their IDs
    const categories = await fetchCategories();
    console.log('CategoryPage: All categories:', categories);
    
    const category = categories.find(cat => cat.slug === params.slug);
    console.log('CategoryPage: Found category:', category);
    
    if (!category) {
      console.error('Category not found:', params.slug);
      notFound();
    }

    // Fetch posts for this category using its ID
    const posts = await fetchPosts({
      categories: category.id.toString(),
      per_page: '12',
      _embed: 'true'
    });
    console.log('CategoryPage: Found posts:', posts?.length || 0);

    if (!posts || posts.length === 0) {
      console.error('No posts found for category:', category.name);
      return (
        <main className="bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold mb-8">{decodeHTML(category.name)}</h1>
            {category.description && (
              <div 
                className="prose prose-lg mb-8 text-gray-600"
                dangerouslySetInnerHTML={{ __html: category.description }}
              />
            )}
            <p className="text-gray-600">No posts found in this category.</p>
          </div>
        </main>
      );
    }

    return (
      <main className="bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold mb-8">{decodeHTML(category.name)}</h1>
          {category.description && (
            <div 
              className="prose prose-lg mb-8 text-gray-600"
              dangerouslySetInnerHTML={{ __html: category.description }}
            />
          )}
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
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    <Link href={`/${post.slug}`} className="hover:text-indigo-600 transition-colors">
                      {decodeHTML(post.title.rendered)}
                    </Link>
                  </h2>
                  <div className="text-sm text-gray-500 mb-3">{post.readingTime} mins read</div>
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
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error in CategoryPage:', error);
    notFound();
  }
}
