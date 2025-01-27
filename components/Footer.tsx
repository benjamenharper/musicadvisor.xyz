'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useSiteStore } from '@/lib/store';
import { config } from '@/lib/config';

export default function Footer() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { currentSiteKey } = useSiteStore();
  const site = config.sites[currentSiteKey];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Site Info */}
          <div className="col-span-1">
            <h3 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent mb-2">
              Hawaii Elite Real Estate
            </h3>
            <p className="text-sm text-muted-foreground">
              Luxury Living with Aloha
            </p>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/resources/hawaii-title"
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  Hawaii Title Information
                </Link>
              </li>
              <li>
                <Link 
                  href="/resources/hawaii-1031-exchange"
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  1031 Exchange Guide
                </Link>
              </li>
              <li>
                <Link 
                  href="/resources/hawaii-business-directory"
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  Business Directory
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col space-y-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Hawaii Elite Real Estate. Brokered by Real Broker, LLC.
            </p>
            <p className="text-sm text-muted-foreground">
              2176 Lauwiliwili St., # 1, Kapolei, HI, 96707, United States. All Rights Reserved.
            </p>
            <div className="flex items-center mt-4 md:mt-0">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="inline-flex items-center justify-center rounded-md p-2.5 text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
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
      </div>
    </footer>
  );
}
