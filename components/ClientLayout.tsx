'use client';

import { useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import { useStore } from '@/components/providers/StoreProvider';
import { config } from '@/lib/config';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const setCurrentSiteKey = useStore((state) => state.setCurrentSiteKey);

  useEffect(() => {
    setCurrentSiteKey(config.defaultSite);
  }, [setCurrentSiteKey]);

  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="dark"
      disableTransitionOnChange
    >
      <Header />
      {children}
      <Footer />
    </ThemeProvider>
  );
}
