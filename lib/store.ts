'use client';

import { create } from 'zustand';
import { config } from './config';

interface SiteStore {
  currentSiteKey: string;
  setCurrentSiteKey: (key: string) => void;
}

export const useSiteStore = create<SiteStore>((set) => ({
  currentSiteKey: config.defaultSite,
  setCurrentSiteKey: (key) => set({ currentSiteKey: key }),
}));

// StoreProvider component for hydration
export function StoreProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
