'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';

export default function CanonicalUrl() {
  const pathname = usePathname();
  const baseUrl = 'https://musicadvisor.xyz';
  const canonicalUrl = `${baseUrl}${pathname}`;

  return (
    <Script id="canonical-url" strategy="afterInteractive">
      {`
        // Add canonical URL
        const link = document.createElement('link');
        link.rel = 'canonical';
        link.href = '${canonicalUrl}';
        document.head.appendChild(link);
      `}
    </Script>
  );
}
