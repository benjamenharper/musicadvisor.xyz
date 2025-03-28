import type { Metadata } from 'next';
import { generateCanonicalMetadata } from '@/lib/canonicalUrl';

export const metadata: Metadata = {
  title: 'Host Virtual Music Game Rooms | MusicAdvisor.xyz',
  description: 'Create engaging virtual music game rooms for your guests. Host interactive music trivia, song guessing games, and build a vibrant music community.',
  keywords: ['virtual music room', 'music games', 'music trivia', 'song guessing', 'music community', 'interactive music games'],
  ...generateCanonicalMetadata('/virtual-music-game-room'),
};

export default function VirtualMusicRoomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
