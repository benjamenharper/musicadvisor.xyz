import type { Metadata } from 'next';
import { generateCanonicalMetadata } from '@/lib/canonicalUrl';

export const metadata: Metadata = {
  title: 'Google Analytics Debug | MusicAdvisor',
  description: 'Debug page for Google Analytics implementation on MusicAdvisor.xyz.',
  ...generateCanonicalMetadata('/ga-debug'),
};

export default function GADebugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
