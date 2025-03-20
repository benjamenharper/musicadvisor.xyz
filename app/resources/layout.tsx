import type { Metadata } from 'next';
import { generateCanonicalMetadata } from '@/lib/canonicalUrl';

export const metadata: Metadata = {
  title: 'Music Industry Resources | MusicAdvisor.xyz',
  description: 'Access valuable resources for music industry professionals, artists, and enthusiasts. Find guides, tools, and information to advance your music career.',
  keywords: ['music resources', 'music industry guides', 'music career resources', 'artist resources', 'music business tools'],
  ...generateCanonicalMetadata('/resources'),
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
