'use client';

import { type ReactNode } from 'react';
import { createStore } from 'zustand';
import { createContext, useContext } from 'react';
import { useStore as useZustandStore } from 'zustand';
import { config } from '@/lib/config';

interface SiteStore {
  currentSiteKey: string;
  setCurrentSiteKey: (key: string) => void;
}

const createSiteStore = () =>
  createStore<SiteStore>((set) => ({
    currentSiteKey: config.defaultSite,
    setCurrentSiteKey: (key) => set({ currentSiteKey: key }),
  }));

type StoreType = ReturnType<typeof createSiteStore>;

const StoreContext = createContext<StoreType | null>(null);

export const useStore = <T,>(selector: (store: SiteStore) => T): T => {
  const store = useContext(StoreContext);
  if (!store) throw new Error('Store not found');
  return useZustandStore(store, selector);
};

export function StoreProvider({ children }: { children: ReactNode }) {
  const store = createSiteStore();

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
}
