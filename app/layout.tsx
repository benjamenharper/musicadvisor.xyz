import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import ClientLayout from "@/components/ClientLayout";
import ClientSideProvider from "@/components/providers/ClientSideProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Music Advisor',
    template: '%s | Music Advisor',
  },
  description: 'Music Promotion and News',
  keywords: [
    'music',
    'promotion',
    'news',
    'artist development',
    'music industry',
  ],
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
                <nav className="flex items-center gap-4">
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
      </body>
    </html>
  );
}
