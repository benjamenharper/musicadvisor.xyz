// Import metadata types at the top
import { Metadata } from 'next';
import { generateCanonicalMetadata } from '@/lib/canonicalUrl';
import { authors } from '@/lib/data/authors';
import AuthorPageContent from '@/components/AuthorPageContent';

// Generate metadata for the author page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  // Find the author from our data
  const author = authors.find(a => a.id === params.slug);
  
  // If no author is found, we'll use the slug to create a name
  const authorName = author ? author.name : params.slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  const title = `${authorName} - Author Profile`;
  const description = author?.shortBio || `Articles and insights from ${authorName}, music industry expert.`;
  
  return {
    title,
    description,
    ...generateCanonicalMetadata(`/authors/${params.slug}`),
    openGraph: {
      title,
      description,
      type: 'profile',
      url: `https://musicadvisor.xyz/authors/${params.slug}`,
      images: [
        {
          url: author?.image?.src || '/conormurphy.png',
          width: 1200,
          height: 630,
          alt: authorName
        }
      ]
    }
  };
}

// Default export is the page component
export default function AuthorPage({ params }: { params: { slug: string } }) {
  return <AuthorPageContent params={params} />;
}
