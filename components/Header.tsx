'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/components/providers/StoreProvider';
import { config } from '@/lib/config';

export default function Header() {
  const currentSiteKey = useStore((state) => state.currentSiteKey);
  const site = config.sites[currentSiteKey];

  return (
    <header className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-4">
              <Image
                src="/malogo2.png"
                alt="MusicAdvisor Logo"
                width={48}
                height={48}
                className="w-12 h-12"
              />
              <div className="flex flex-col gap-0.5">
                <span className="text-xl font-bold text-gray-900">MusicAdvisor</span>
                <span className="text-sm text-gray-500">Helping Artists Thrive</span>
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
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
                href="/category/promotion"
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Promotion
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                About
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
