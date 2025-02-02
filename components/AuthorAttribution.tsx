import Image from 'next/image';
import Link from 'next/link';
import angelicaImage from '@/public/angelica-peterson.jpg';
import markImage from '@/public/markjackson.jpg';
import alisonImage from '@/public/alisonjenks.jpg';

type Author = {
  name: string;
  role: string;
  image: any;
  shortBio: string;
};

const authors: Record<string, Author> = {
  'featured': {
    name: 'Angelica Peterson',
    role: 'Featured Author',
    image: angelicaImage,
    shortBio: 'Music industry veteran with over a decade of experience in artist development and digital marketing.'
  },
  'news': {
    name: 'Mark Jackson',
    role: 'News Contributor',
    image: markImage,
    shortBio: 'Music industry journalist covering breaking news and emerging trends.'
  },
  'promotion': {
    name: 'Alison Jenks',
    role: 'Promotion Strategist',
    image: alisonImage,
    shortBio: 'Digital marketing specialist with expertise in music promotion and audience growth strategies.'
  }
};

interface AuthorAttributionProps {
  category: string;
  compact?: boolean;
}

export default function AuthorAttribution({ category, compact = false }: AuthorAttributionProps) {
  const author = authors[category];
  
  if (!author) return null;

  if (compact) {
    return (
      <Link href={`/about#${author.name.toLowerCase().replace(' ', '-')}`} className="flex items-center gap-2 group">
        <div className="relative w-6 h-6 flex-shrink-0">
          <Image
            src={author.image}
            alt={author.name}
            className="rounded-full object-cover"
            fill
            sizes="24px"
          />
        </div>
        <span className="text-sm text-gray-600 group-hover:text-indigo-600 truncate">
          {author.name}
        </span>
      </Link>
    );
  }

  return (
    <Link href={`/about#${author.name.toLowerCase().replace(' ', '-')}`} className="flex items-center gap-4 group">
      <div className="relative w-12 h-12 flex-shrink-0">
        <Image
          src={author.image}
          alt={author.name}
          className="rounded-full object-cover"
          fill
          sizes="48px"
        />
      </div>
      <div>
        <div className="font-medium text-gray-900 group-hover:text-indigo-600">
          {author.name}
        </div>
        <div className="text-sm text-gray-500">{author.role}</div>
        <div className="text-sm text-gray-600 mt-1 line-clamp-2">
          {author.shortBio}
        </div>
      </div>
    </Link>
  );
}
