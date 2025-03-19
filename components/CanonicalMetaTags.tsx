'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Head from 'next/head';

/**
 * Component that adds a canonical URL meta tag to the page
 * This should be used in the root layout to ensure all pages have canonical URLs
 * It serves as a fallback mechanism in case the server-side metadata doesn't include a canonical URL
 */
export default function CanonicalMetaTags() {
  const pathname = usePathname();
  const baseUrl = 'https://musicadvisor.xyz';
  const canonicalUrl = `${baseUrl}${pathname}`;

  useEffect(() => {
    // Check if there's already a canonical link (from server-side metadata)
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    
    // Only add a canonical link if one doesn't already exist
    if (!existingCanonical) {
      // Add canonical URL
      const link = document.createElement('link');
      link.rel = 'canonical';
      link.href = canonicalUrl;
      document.head.appendChild(link);
      
      return () => {
        // Cleanup on component unmount
        const addedCanonicalLink = document.querySelector('link[rel="canonical"]');
        if (addedCanonicalLink && addedCanonicalLink.getAttribute('href') === canonicalUrl) {
          addedCanonicalLink.remove();
        }
      };
    }
  }, [canonicalUrl]);

  // This component doesn't render anything visible
  return null;
}
