import type { Metadata } from 'next';
import { generateCanonicalMetadata } from '@/lib/canonicalUrl';

export const metadata: Metadata = {
  title: 'Content Management | MusicAdvisor',
  description: 'Browse and manage all content on MusicAdvisor.xyz including posts and pages.',
  ...generateCanonicalMetadata('/content'),
};

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
