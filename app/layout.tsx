import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import ClientSideProvider from "@/components/providers/ClientSideProvider";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "MusicAdvisor - Music Promotion and News",
  description: "Helping Artists Thrive - Music Industry News and Promotion Tips",
  verification: {
    google: 'IzPak72Ui3pU-C9bh-jWxuAhvJMRhDWxPuUxhM0DGoA',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col bg-background text-foreground`}>
        <header className="border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-indigo-600 transition-colors">
                MusicAdvisor
              </Link>
              <nav>
                <Link href="/about" className="text-gray-600 hover:text-indigo-600 transition-colors">
                  About
                </Link>
              </nav>
            </div>
          </div>
        </header>
        <ClientSideProvider>
          <ClientLayout>
            <main className="flex-1">
              {children}
            </main>
          </ClientLayout>
        </ClientSideProvider>
        <footer className="border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <p className="text-center text-gray-600"> 2025 MusicAdvisor. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
