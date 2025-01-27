'use client';

import { ThemeProvider } from 'next-themes';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
