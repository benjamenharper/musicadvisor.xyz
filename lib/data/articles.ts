export interface Article {
  id: string;
  title: string;
  slug: string;
  authorId: string;
  publishDate: string;
  lastUpdated?: string;
  category: string;
  tags: string[];
  description: string;
  image: string;
  readTime?: number;
  featured?: boolean;
}

export const articles: Article[] = [
  {
    id: 'music-promotion-strategies-2025',
    title: '10 Essential Music Promotion Strategies for 2025',
    slug: 'music-promotion-strategies-2025',
    authorId: 'alison-jenks',
    publishDate: '2025-01-15',
    category: 'music-promotion',
    tags: ['promotion', 'marketing', 'digital', 'strategy'],
    description: 'Learn the most effective ways to promote your music in today\'s digital landscape',
    image: '/images/promotion-strategies.jpg',
    readTime: 8,
    featured: true
  },
  {
    id: 'building-artist-brand',
    title: 'How to Build a Strong Artist Brand',
    slug: 'building-artist-brand',
    authorId: 'angelica-peterson',
    publishDate: '2025-01-20',
    category: 'marketing',
    tags: ['branding', 'marketing', 'identity'],
    description: 'A comprehensive guide to developing your unique artist brand and identity',
    image: '/images/artist-branding.jpg',
    readTime: 12
  },
  {
    id: 'streaming-algorithms-explained',
    title: 'Understanding Music Streaming Algorithms',
    slug: 'streaming-algorithms-explained',
    authorId: 'mark-jackson',
    publishDate: '2025-01-25',
    lastUpdated: '2025-02-01',
    category: 'industry-news',
    tags: ['streaming', 'technology', 'distribution'],
    description: 'Deep dive into how streaming platforms recommend music to listeners',
    image: '/images/streaming-algorithms.jpg',
    readTime: 15,
    featured: true
  }
];
