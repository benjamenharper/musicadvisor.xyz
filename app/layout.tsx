import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import ClientLayout from "@/components/ClientLayout";
import ClientSideProvider from "@/components/providers/ClientSideProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import CanonicalMetaTags from "@/components/CanonicalMetaTags";
import dynamic from 'next/dynamic';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const GADebug = dynamic(() => 
  process.env.NODE_ENV === 'development' 
    ? import('@/components/GADebug').then(mod => mod.default)
    : Promise.resolve(() => null),
  { ssr: false }
);

export const metadata: Metadata = {
  metadataBase: new URL('https://musicadvisor.xyz'),
  title: {
    default: 'Music Advisor',
    template: '%s | Music Advisor',
  },
  description: 'Expert guidance on music promotion, marketing, and distribution for artists and influencers. Stay informed with the latest music industry trends and strategies.',
  keywords: [
    'music',
    'promotion',
    'news',
    'artist development',
    'music industry',
    'music marketing',
    'influencer marketing',
    'music distribution',
  ],
  alternates: {
    canonical: 'https://musicadvisor.xyz',
  },
  verification: {
    google: 'IzPak72Ui3pU-C9bh-jWxuAhvJMRhDWxPuUxhM0DGoA',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://musicadvisor.xyz',
    siteName: 'Music Advisor',
    title: 'Music Advisor - Expert Guidance for Artists & Influencers',
    description: 'Expert guidance on music promotion, marketing, and distribution for artists and influencers. Stay informed with the latest music industry trends and strategies.',
    images: [
      {
        url: '/musicianscropped.png',
        width: 1200,
        height: 630,
        alt: 'Music Advisor',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Music Advisor - Expert Guidance for Artists & Influencers',
    description: 'Expert guidance on music promotion, marketing, and distribution for artists and influencers. Stay informed with the latest music industry trends and strategies.',
    images: ['/musicianscropped.png'],
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
        <CanonicalMetaTags />
        <ClientSideProvider>
          <ClientLayout>
            <div className="min-h-screen bg-background flex flex-col">
              <Header>
                <nav className="flex items-center gap-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 border-b border-border">
                  <a
                    href="/about"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    About
                  </a>
                  <a
                    href="/guides"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Guides
                  </a>
                  <a
                    href="/community"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Community
                  </a>
                  <a
                    href="/tools"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Tools
                  </a>
                </nav>
              </Header>
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </ClientLayout>
        </ClientSideProvider>
        <GADebug />
      </body>
    </html>
  );
}
