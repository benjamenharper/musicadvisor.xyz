'use client';

import Link from 'next/link';

interface PostCardProps {
  post: {
    id: number;
    slug: string;
    title: { rendered: string };
    excerpt: { rendered: string };
  };
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/content/${post.slug}`}>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2 line-clamp-2" 
              dangerouslySetInnerHTML={{ __html: post.title.rendered }} 
          />
          <div 
            className="text-muted-foreground text-sm mb-3 line-clamp-3"
            dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
          />
        </div>
      </Link>
    </article>
  );
}
