'use client';

import Link from 'next/link';
import { useStore } from '@/components/providers/StoreProvider';
import { config } from '@/lib/config';
import { cn } from '@/lib/utils';
import { Home } from 'lucide-react';

const mainNav = [
  {
    title: "Properties",
    href: "/properties",
  },
  {
    title: "Services",
    href: "/services",
  },
  {
    title: "News",
    href: "/content",
  },
];

export default function Header() {
  const currentSiteKey = useStore((state) => state.currentSiteKey);
  const site = config.sites[currentSiteKey];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent flex items-center gap-2">
              <span>Hawaii Elite</span>
              <Home className="w-6 h-6 text-blue-500" />
              <span>Real Estate</span>
            </span>
          </Link>

          <nav className="flex items-center space-x-6">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-foreground/80",
                  "text-foreground/60"
                )}
              >
                {item.title}
              </Link>
            ))}
            <a 
              href="tel:808-866-6593" 
              className="text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors"
            >
              808-866-6593
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
