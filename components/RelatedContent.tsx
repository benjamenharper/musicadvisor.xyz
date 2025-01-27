'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchRelatedPosts } from '@/lib/wordpress';
import { format } from 'date-fns';

interface RelatedContentProps {
  currentSlug: string;
}

export default function RelatedContent({ currentSlug }: RelatedContentProps) {
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);

  useEffect(() => {
    const loadRelatedPosts = async () => {
      try {
        const posts = await fetchRelatedPosts(currentSlug);
        setRelatedPosts(posts);
      } catch (error) {
        console.error('Error loading related posts:', error);
      }
    };

    loadRelatedPosts();
  }, [currentSlug]);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {relatedPosts.map((post) => (
        <article key={post.id} className="group">
          <Link href={`/${post.slug}`}>
            <h3 
              className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
            <time 
              dateTime={post.date}
              className="text-xs text-muted-foreground"
            >
              {format(new Date(post.date), 'MMMM d, yyyy')}
            </time>
          </Link>
        </article>
      ))}
    </div>
  );
}
