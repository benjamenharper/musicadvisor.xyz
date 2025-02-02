import Image from 'next/image';
import Link from 'next/link';
import { authors } from '@/lib/data/authors';

export default function AuthorsPage() {
  return (
    <main className="bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-12">Our Authors</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {authors.map(author => (
            <Link 
              key={author.id} 
              href={`/authors/${author.id}`}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image
                    src={author.image}
                    alt={author.name}
                    className="rounded-full object-cover"
                    fill
                    sizes="64px"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{author.name}</h2>
                  <p className="text-indigo-600">{author.role}</p>
                </div>
              </div>
              <p className="mt-4 text-gray-600 line-clamp-3">{author.shortBio}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {author.expertiseAreas.slice(0, 3).map(area => (
                  <span
                    key={area}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
