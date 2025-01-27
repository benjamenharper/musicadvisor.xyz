'use client';

import { ThemeProvider } from 'next-themes';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { StoreProvider } from '@/components/providers/StoreProvider';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <ThemeProvider 
        attribute="class" 
        defaultTheme="dark"
        disableTransitionOnChange
      >
        <Header />
        {children}
        <Footer />
      </ThemeProvider>
    </StoreProvider>
  );
}
