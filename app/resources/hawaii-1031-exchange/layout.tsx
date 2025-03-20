import type { Metadata } from 'next';
import { generateCanonicalMetadata } from '@/lib/canonicalUrl';

export const metadata: Metadata = {
  title: 'Hawaii 1031 Exchange Guide | MusicAdvisor.xyz',
  description: 'Everything you need to know about 1031 exchanges in Hawaii, including rules, timelines, and qualified properties.',
  keywords: ['hawaii 1031 exchange', 'tax deferred exchange', 'like-kind exchange', 'investment properties', 'real estate exchange'],
  ...generateCanonicalMetadata('/resources/hawaii-1031-exchange'),
};

export default function Hawaii1031ExchangeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
