import type { Metadata } from 'next';
import { generateCanonicalMetadata } from '@/lib/canonicalUrl';

export const metadata: Metadata = {
  title: 'Hawaii Title Information | MusicAdvisor.xyz',
  description: 'Learn about the title process in Hawaii real estate transactions, including title search, insurance, and common issues.',
  keywords: ['hawaii title', 'title insurance', 'title search', 'property rights', 'real estate title'],
  ...generateCanonicalMetadata('/resources/hawaii-title'),
};

export default function HawaiiTitleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
