import type { Metadata } from 'next';

export function generateMetadata(
  title: string,
  description: string,
  keywords: string[] = [],
  image?: string,
  path?: string
): Metadata {
  const fullTitle = `${title} | MusicAdvisor.xyz`;
  const baseUrl = 'https://musicadvisor.xyz';
  
  // Generate canonical URL based on the current path
  const canonicalUrl = path ? `${baseUrl}${path}` : baseUrl;
  
  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords,
    // Add canonical URL to alternates
    alternates: {
      canonical: canonicalUrl,
    }
  };

  if (image) {
    metadata.openGraph = {
      title: fullTitle,
      description,
      url: canonicalUrl, // Add canonical URL to OpenGraph
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    };
  }

  return metadata;
}
