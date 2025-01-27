'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import RelatedContent from '@/components/RelatedContent';
import { fetchContentBySlug } from '@/lib/wordpress';
import { useSiteStore } from '@/lib/store';

interface ContentPageProps {
  params: {
    slug: string;
  };
}

export default function ContentPage() {
  const params = useParams();
  const { currentSiteKey } = useSiteStore();
  const [content, setContent] = useState<any>(null);
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const slug = params?.slug as string;

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      try {
        const result = await fetchContentBySlug(slug);
        if (result) {
          setContent(result);
          // Fetch recent posts after content is loaded
          const recentResult = await fetch(`/api/posts/recent`);
          const recentData = await recentResult.json();
          setRecentPosts(recentData.posts || []);
        } else {
          notFound();
        }
      } catch (error) {
        console.error('Error fetching content:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadContent();
    }
  }, [slug, currentSiteKey]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!content) {
    notFound();
  }

  const isPost = content.type === 'post';
  const date = content.date ? new Date(content.date) : new Date();
  const title = content?.title?.rendered || '';
  const contentHtml = content?.content?.rendered || '';
  const featuredImage = content?._embedded?.['wp:featuredmedia']?.[0]?.source_url;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row lg:gap-12">
        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {/* Featured Image */}
          {featuredImage && (
            <div className="relative h-[400px] mb-8 rounded-lg overflow-hidden">
              <Image
                src={featuredImage}
                alt={title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Content Header */}
          <div className="mb-8">
            {isPost && date && (
              <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                <time dateTime={date.toISOString()}>
                  {format(date, 'MMMM d, yyyy')}
                </time>
                {content.categories && content.categories.length > 0 && (
                  <div className="flex gap-2">
                    {content.categories.map((category: any) => (
                      <span
                        key={category.id}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
            {title && (
              <h1 
                className="text-4xl font-bold text-foreground mb-4"
                dangerouslySetInnerHTML={{ __html: title }}
              />
            )}
          </div>

          {/* Content Body */}
          {contentHtml && (
            <div 
              className="prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          )}
        </main>

        {/* Sidebar */}
        <aside className="lg:w-80 flex-none mt-12 lg:mt-0">
          <div className="sticky top-8 space-y-8">
            {/* Recent Posts */}
            {recentPosts.length > 0 && (
              <RelatedContent 
                posts={recentPosts} 
                currentSlug={Array.isArray(params.slug) ? params.slug[0] : params.slug} 
              />
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
