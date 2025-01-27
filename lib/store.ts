'use client';

import { createStore } from 'zustand';
import { persist } from 'zustand/middleware';
import { config } from './config';

export interface SiteStore {
  currentSiteKey: string;
  setCurrentSiteKey: (key: string) => void;
}

export const createSiteStore = () =>
  createStore<SiteStore>()(
    persist(
      (set) => ({
        currentSiteKey: config.defaultSite,
        setCurrentSiteKey: (key: string) => set({ currentSiteKey: key }),
      }),
      {
        name: 'site-storage',
      }
    )
  );

// StoreProvider component for hydration
export function StoreProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
