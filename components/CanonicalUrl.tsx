'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function CanonicalUrl() {
  const pathname = usePathname();
  const baseUrl = 'https://musicadvisor.xyz';
  const canonicalUrl = `${baseUrl}${pathname}`;

  useEffect(() => {
    // Remove any existing canonical links to avoid duplicates
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.remove();
    }
    
    // Add canonical URL
    const link = document.createElement('link');
    link.rel = 'canonical';
    link.href = canonicalUrl;
    document.head.appendChild(link);
    
    return () => {
      // Cleanup on component unmount
      const canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink) {
        canonicalLink.remove();
      }
    };
  }, [canonicalUrl]);

  // This component doesn't render anything visible
  return null;
}
