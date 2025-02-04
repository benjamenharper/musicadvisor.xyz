'use client';

import Image from 'next/image';
import Link from 'next/link';
import { authors } from '@/lib/data/authors';
import { useEffect, useState } from 'react';

interface AuthorAttributionProps {
  postId: string;
  compact?: boolean;
}

export default function AuthorAttribution({ postId, compact = false }: AuthorAttributionProps) {
  const [author, setAuthor] = useState<typeof authors[0] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAuthor() {
      if (!postId) return;
      
      setIsLoading(true);
      try {
        const response = await fetch(`/api/authors?postId=${postId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.authorId) {
          const foundAuthor = authors.find(a => a.id === data.authorId);
          setAuthor(foundAuthor || null);
        }
      } catch (error) {
        console.error('Error fetching author:', error);
        setAuthor(null);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAuthor();
  }, [postId]);

  if (isLoading) {
    return (
      <div className={`flex items-${compact ? 'center' : 'start'} gap-${compact ? '2' : '4'} animate-pulse`}>
        <div className={`relative w-${compact ? '8' : '12'} h-${compact ? '8' : '12'} flex-shrink-0 bg-gray-200 rounded-full`} />
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-24" />
          {!compact && (
            <>
              <div className="h-3 bg-gray-200 rounded w-32 mt-2" />
              <div className="h-3 bg-gray-200 rounded w-48 mt-2" />
            </>
          )}
        </div>
      </div>
    );
  }

  if (!author) return null;

  if (compact) {
    return (
      <Link href={`/authors/${author.id}`} className="flex items-center gap-2 group">
        <div className="relative w-8 h-8 flex-shrink-0">
          <Image
            src={author.image}
            alt={author.name}
            className="rounded-full"
            fill
            sizes="32px"
          />
        </div>
        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
          {author.name}
        </span>
      </Link>
    );
  }

  return (
    <Link href={`/authors/${author.id}`} className="flex items-start gap-4 group">
      <div className="relative w-12 h-12 flex-shrink-0">
        <Image
          src={author.image}
          alt={author.name}
          className="rounded-full"
          fill
          sizes="48px"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-medium group-hover:text-primary transition-colors">
          {author.name}
        </h3>
        <p className="text-sm text-muted-foreground">{author.role}</p>
        <p className="text-sm mt-1">{author.shortBio}</p>
      </div>
    </Link>
  );
}
