'use client';

import { createContext, type ReactNode, useContext, useRef } from 'react';
import { type StoreApi } from 'zustand';
import { createSiteStore, type SiteStore } from '@/lib/store';

const StoreContext = createContext<StoreApi<SiteStore> | null>(null);

export function useStore<T>(selector: (store: SiteStore) => T): T {
  const store = useContext(StoreContext);
  if (!store) throw new Error('useSiteStore must be used within a StoreProvider');
  return selector(store.getState());
}

interface StoreProviderProps {
  children: ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps) {
  const storeRef = useRef<StoreApi<SiteStore>>();
  if (!storeRef.current) {
    storeRef.current = createSiteStore();
  }
  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  );
}

export default StoreProvider;
