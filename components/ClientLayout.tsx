'use client';

import { useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import { useStore } from '@/components/providers/StoreProvider';
import { config } from '@/lib/config';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from 'next/link';

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
      <Header>
        <div className="flex items-center gap-4">
          <Link
            href="/category/featured"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Featured
          </Link>
          <Link
            href="/category/news"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            News
          </Link>
          <Link
            href="/category/music-promotion"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Music Promotion
          </Link>
        </div>
      </Header>
      {children}
      <Footer />
    </ThemeProvider>
  );
}
