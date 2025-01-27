'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { config } from './config';

interface SiteStoreContextType {
  currentSiteKey: string;
  setCurrentSiteKey: (key: string) => void;
}

const SiteStoreContext = createContext<SiteStoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [currentSiteKey, setCurrentSiteKey] = useState<string>(config.defaultSite);

  const value = {
    currentSiteKey,
    setCurrentSiteKey,
  };

  return (
    <SiteStoreContext.Provider value={value}>
      {children}
    </SiteStoreContext.Provider>
  );
}

export function useSiteStore(): SiteStoreContextType {
  const context = useContext(SiteStoreContext);
  if (context === undefined) {
    throw new Error('useSiteStore must be used within a StoreProvider');
  }
  return context;
}
