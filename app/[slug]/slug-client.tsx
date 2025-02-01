'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { format } from 'date-fns';
import { useStore } from '@/components/providers/StoreProvider';
import RelatedContent from '@/components/RelatedContent';
import { fetchContentBySlug } from '@/lib/wordpress';
import { config } from '@/lib/config';

interface SlugClientProps {
  initialContent: any;
}

export default function SlugClient({ initialContent }: SlugClientProps) {
  const params = useParams();
  const currentSiteKey = useStore((state) => state.currentSiteKey);
  const [content, setContent] = useState(initialContent);
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const site = config.sites[currentSiteKey];

  useEffect(() => {
    const loadContent = async () => {
      if (currentSiteKey === config.defaultSite) {
        setContent(initialContent);
        return;
      }

      setLoading(true);
      try {
        const result = await fetchContentBySlug(params.slug as string, site);
        if (result) {
          setContent(result);
        }
      } catch (error) {
        console.error('Error fetching content:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [currentSiteKey, site, params.slug, initialContent]);

  useEffect(() => {
    const loadRecentPosts = async () => {
      try {
        const recentResult = await fetch(`/api/posts/recent`);
        const recentData = await recentResult.json();
        setRecentPosts(recentData.posts || []);
      } catch (error) {
        console.error('Error fetching recent posts:', error);
      }
    };

    loadRecentPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!content) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <article className="prose lg:prose-xl mx-auto">
        <h1>{content.title}</h1>
        {content.date && (
          <p className="text-gray-600">
            Published on {format(new Date(content.date), 'MMMM d, yyyy')}
          </p>
        )}
        <div dangerouslySetInnerHTML={{ __html: content.content }} />
      </article>
      {recentPosts.length > 0 && (
        <div className="mt-12">
          <RelatedContent posts={recentPosts} />
        </div>
      )}
    </div>
  );
}
