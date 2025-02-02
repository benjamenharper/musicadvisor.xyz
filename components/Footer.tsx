'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useStore } from '@/components/providers/StoreProvider';
import { config } from '@/lib/config';

export default function Footer() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const currentSiteKey = useStore((state) => state.currentSiteKey);
  const site = config.sites[currentSiteKey];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Site Info */}
        <div className="flex flex-col items-center text-center mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            MusicAdvisor
          </h3>
          <p className="text-sm text-gray-600">
            Helping Artists Thrive
          </p>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap gap-4 mb-4 md:mb-0">
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">About</Link>
            </div>
            <p className="text-sm text-gray-600">
              &copy; {new Date().getFullYear()} MusicAdvisor. All Rights Reserved.
            </p>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="inline-flex items-center justify-center rounded-md p-2.5 text-gray-600 hover:text-indigo-600"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
