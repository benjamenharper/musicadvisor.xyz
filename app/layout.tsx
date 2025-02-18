import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import ClientLayout from "@/components/ClientLayout";
import ClientSideProvider from "@/components/providers/ClientSideProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from 'next/link';
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'MusicAdvisor.xyz - Music Industry Guidance',
    template: '%s | MusicAdvisor.xyz'
  },
  description: "Expert guidance on music promotion, marketing, and distribution. Stay informed with the latest music industry trends, news, and strategies for success.",
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
        <GoogleAnalytics />
        <ClientSideProvider>
          <ClientLayout>
            <div className="min-h-screen bg-background flex flex-col">
              <Header>
                <div className="flex items-center gap-4">
                  <Link
                    href="/category/featured"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Featured
                  </Link>
                  <Link
                    href="/category/artist-development"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Artist Development
                  </Link>
                  <Link
                    href="/category/music-promotion"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Music Promotion
                  </Link>
                  <Link
                    href="/category/ai-music"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    AI Music
                  </Link>
                </div>
              </Header>
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </ClientLayout>
        </ClientSideProvider>
      </body>
    </html>
  );
}
