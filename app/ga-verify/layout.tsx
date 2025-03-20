import type { Metadata } from 'next';
import { generateCanonicalMetadata } from '@/lib/canonicalUrl';

export const metadata: Metadata = {
  title: 'Google Analytics Verification | MusicAdvisor',
  description: 'Verification page for Google Analytics implementation on MusicAdvisor.xyz.',
  ...generateCanonicalMetadata('/ga-verify'),
};

export default function GAVerifyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
