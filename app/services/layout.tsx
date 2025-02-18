import type { Metadata } from 'next';
import { generateMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateMetadata(
  'Music Industry Services',
  'Comprehensive music industry services including promotion, distribution, and marketing strategies. Expert guidance for artists at every stage of their career.',
  ['music promotion services', 'music distribution', 'artist marketing', 'music industry consulting', 'artist development']
);
