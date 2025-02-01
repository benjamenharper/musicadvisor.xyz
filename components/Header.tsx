'use client';

import Link from 'next/link';
import { useStore } from '@/components/providers/StoreProvider';
import { config } from '@/lib/config';
import { cn } from '@/lib/utils';
import { Home } from 'lucide-react';
import { ChevronDown } from 'lucide-react';

const mainNav = [
  { 
    title: "Islands", 
    children: [
      { title: "Oahu", href: "/islands/oahu" },
      { title: "Maui", href: "/islands/maui" },
      { title: "Big Island", href: "/islands/hawaii" },
      { title: "Kauai", href: "/islands/kauai" },
    ]
  },
  { 
    title: "Properties", 
    children: [
      { title: "All Properties", href: "/properties" },
      { title: "Single Family Homes", href: "/properties?type=single_family" },
      { title: "Condos", href: "/properties?type=condo" },
      { title: "Townhouses", href: "/properties?type=townhouse" },
      { title: "Multi-Family", href: "/properties?type=multi_family" },
      { title: "Land", href: "/properties?type=land" },
    ]
  },
  { 
    title: "Services", 
    children: [
      { title: "Buy a Home", href: "/services/buy" },
      { title: "Sell Your Home", href: "/services/sell" },
      { title: "Property Management", href: "/services/property-management" },
      { title: "Investment Properties", href: "/services/investment" },
    ]
  },
  { title: "News", href: "/content" },
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
            {mainNav.map((item) =>
              item.children ? (
                <div key={item.title} className="relative group">
                  <span className="cursor-pointer text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60 flex items-center gap-1">
                    {item.title}
                    <ChevronDown className="h-4 w-4" />
                  </span>
                  <div className="absolute left-0 top-full w-40 bg-background border border-border rounded-md shadow-lg opacity-0 pointer-events-none transition-opacity duration-200 group-hover:opacity-100 group-hover:pointer-events-auto">
                    {item.children.map((child) => (
                      <Link key={child.href} href={child.href} className="block px-4 py-2 text-sm text-foreground hover:bg-muted">
                        {child.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
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
              )
            )}
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
