'use client';

import { useEffect, useState } from 'react';
import { GA_MEASUREMENT_ID } from '@/lib/analytics';
import dynamic from 'next/dynamic';

// Dynamically import the GAVerifier component to avoid SSR issues
const GAVerifier = dynamic(() => import('@/components/GAVerifier'), {
  ssr: false,
});

export default function GAVerifyPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Google Analytics Verification</h1>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold mb-4">Google Analytics Configuration</h2>
        <p className="mb-2">
          <span className="font-semibold">Measurement ID:</span> {GA_MEASUREMENT_ID}
        </p>
        <p className="mb-4">
          This page helps you verify that Google Analytics is properly installed and working on your website.
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-md">
          <h3 className="font-semibold mb-2">Manual Verification Steps:</h3>
          <ol className="list-decimal list-inside space-y-2">
            <li>Open browser developer tools (F12 or right-click &gt; Inspect)</li>
            <li>Go to the Network tab and filter for "google"</li>
            <li>Reload this page and check for requests to googletagmanager.com</li>
            <li>Go to the Console tab and type: <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">console.log(window.gtag, window.dataLayer)</code></li>
            <li>Check that both are defined and not undefined</li>
          </ol>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold mb-4">Console Commands</h2>
        <p className="mb-4">Copy and paste these commands into your browser console to verify Google Analytics:</p>
        
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md font-mono text-sm mb-4 overflow-x-auto">
          {`// Check if gtag function exists
console.log('gtag exists:', typeof window.gtag === 'function');

// Check if dataLayer exists
console.log('dataLayer exists:', Array.isArray(window.dataLayer));

// Check measurement ID
console.log('Measurement ID:', '${GA_MEASUREMENT_ID}');

// Send a test event
window.gtag && window.gtag('event', 'test_event', {
  event_category: 'testing',
  event_label: 'Console Test',
  value: Date.now()
});`}
        </div>
        
        <p className="text-sm text-gray-500">
          After sending a test event, check your Google Analytics Real-Time reports to verify it was received.
        </p>
      </div>
      
      {isClient && <GAVerifier />}
    </div>
  );
}
