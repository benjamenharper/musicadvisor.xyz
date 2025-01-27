'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchRelatedPosts } from '@/lib/wordpress';
import { format } from 'date-fns';

interface RelatedContentProps {
  posts?: any[];
  currentSlug: string;
}

export default function RelatedContent({ posts, currentSlug }: RelatedContentProps) {
  const [relatedPosts, setRelatedPosts] = useState<any[]>(posts || []);

  useEffect(() => {
    const loadRelatedPosts = async () => {
      try {
        const posts = await fetchRelatedPosts(currentSlug);
        setRelatedPosts(posts);
      } catch (error) {
        console.error('Error loading related posts:', error);
      }
    };

    if (!posts) {
      loadRelatedPosts();
    }
  }, [currentSlug, posts]);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <div className="bg-card rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Posts</h3>
      <div className="space-y-4">
        {relatedPosts.map((post) => (
          <article key={post.id} className="group">
            <Link href={`/content/${post.slug}`}>
              <h4 className="font-medium group-hover:text-primary transition-colors">
                {post.title}
              </h4>
              {post.date && (
                <time className="text-sm text-muted-foreground">
                  {format(new Date(post.date), 'MMMM d, yyyy')}
                </time>
              )}
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
