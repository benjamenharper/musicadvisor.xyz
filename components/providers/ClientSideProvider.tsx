'use client';

import { StoreProvider } from './StoreProvider';

export default function ClientSideProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StoreProvider>{children}</StoreProvider>;
}
