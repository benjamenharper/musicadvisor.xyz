'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { GA_MEASUREMENT_ID, GA_DOMAIN, checkGAStatus } from '@/lib/analytics';

export default function GoogleAnalytics() {
  useEffect(() => {
    // Debug logging to verify GA is loading
    console.log('Google Analytics component mounted with ID:', GA_MEASUREMENT_ID);
    console.log('Google Analytics domain:', GA_DOMAIN);
    
    // Check if GA is loaded and working
    checkGAStatus().then(isLoaded => {
      if (!isLoaded) {
        console.warn('Google Analytics might be blocked by an extension or browser setting');
      } else {
        console.log('Google Analytics appears to be loaded correctly');
      }
    });
  }, []);

  const onGAScriptLoad = () => {
    console.log('Google Analytics script loaded successfully');
  };

  const onGAScriptError = (e: Error) => {
    console.error('Failed to load Google Analytics script:', e);
  };
  
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        onLoad={onGAScriptLoad}
        onError={onGAScriptError}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              send_page_view: true,
              cookie_domain: '${GA_DOMAIN}',
              cookie_flags: 'SameSite=None;Secure',
              debug_mode: true
            });
            console.log('Google Analytics config initialized with domain: ${GA_DOMAIN}');
          `,
        }}
      />
    </>
  );
}