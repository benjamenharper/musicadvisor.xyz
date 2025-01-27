'use client';

import { type ReactNode, useRef } from 'react';
import { type StoreApi, useStore } from 'zustand';
import { useSiteStore } from '@/lib/store';

interface StoreProviderProps {
  children: ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps) {
  const storeRef = useRef<StoreApi<any>>();
  if (!storeRef.current) {
    storeRef.current = useSiteStore;
  }
  return children;
}

export default StoreProvider;
