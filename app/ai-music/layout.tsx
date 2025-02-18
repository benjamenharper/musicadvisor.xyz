import type { Metadata } from 'next';
import { generateMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateMetadata(
  'AI Music Generation Tools',
  'Create unique music with artificial intelligence. Generate custom melodies, harmonies, and complete songs using our advanced AI music tools.',
  ['ai music generation', 'ai composer', 'music creation tools', 'ai music maker', 'custom music generation']
);

export default function AIMusicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
