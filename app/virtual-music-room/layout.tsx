import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Virtual Music Room Platform | Hotly',
  description: 'Create and monetize your own virtual music room. Host exclusive listening sessions, concerts, and workshops with Hotly\'s innovative platform.',
  keywords: ['virtual music room', 'music monetization', 'virtual concerts', 'music workshops', 'listening sessions', 'music community'],
};

export default function VirtualMusicRoomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
