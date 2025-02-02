import { Inter } from "next/font/google";
import type { Metadata } from "next";
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
        <ClientSideProvider>
          <ClientLayout>{children}</ClientLayout>
        </ClientSideProvider>
      </body>
    </html>
  );
}
