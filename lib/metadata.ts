import type { Metadata } from 'next';

export function generateMetadata(
  title: string,
  description: string,
  keywords: string[] = [],
  image?: string
): Metadata {
  const fullTitle = `${title} | MusicAdvisor.xyz`;
  
  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords,
  };

  if (image) {
    metadata.openGraph = {
      title: fullTitle,
      description,
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
