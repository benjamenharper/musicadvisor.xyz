'use client';

import { useEffect, useState } from 'react';
import { GA_MEASUREMENT_ID, GA_DOMAIN, event } from '@/lib/analytics';

export default function GADebugPage() {
  const [debugInfo, setDebugInfo] = useState<{
    userAgent: string;
    cookies: string;
    localStorage: Record<string, string>;
    referrer: string;
    hasGtag: boolean;
    hasDataLayer: boolean;
    gaClientId: string | null;
    networkRequests: string[];
  }>({
    userAgent: '',
    cookies: '',
    localStorage: {},
    referrer: '',
    hasGtag: false,
    hasDataLayer: false,
    gaClientId: null,
    networkRequests: [],
  });

  const [testEventSent, setTestEventSent] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Collect debug information
    const localStorageItems: Record<string, string> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        localStorageItems[key] = localStorage.getItem(key) || '';
      }
    }

    // Get GA client ID if available
    let gaClientId = null;
    const gaCookies = document.cookie
      .split('; ')
      .find(row => row.startsWith('_ga='));
    
    if (gaCookies) {
      gaClientId = gaCookies.split('=')[1];
    }

    setDebugInfo({
      userAgent: navigator.userAgent,
      cookies: document.cookie,
      localStorage: localStorageItems,
      referrer: document.referrer,
      hasGtag: typeof window.gtag === 'function',
      hasDataLayer: Array.isArray(window.dataLayer),
      gaClientId,
      networkRequests: [],
    });

    // Monitor network requests for Google Analytics
    if (window.PerformanceObserver) {
      try {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (entry.name.includes('google-analytics.com') || 
                entry.name.includes('googletagmanager.com')) {
              setDebugInfo(prev => ({
                ...prev,
                networkRequests: [...prev.networkRequests, entry.name]
              }));
            }
          });
        });
        
        observer.observe({ entryTypes: ['resource'] });
        
        return () => observer.disconnect();
      } catch (e) {
        console.error('PerformanceObserver not supported', e);
      }
    }

    // Send a debug event on page load
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'debug_page_view', {
        event_category: 'debugging',
        event_label: 'GA Debug Page',
        debug_mode: true,
        send_to: GA_MEASUREMENT_ID
      });
    }
  }, []);

  const sendTestEvent = () => {
    event({
      action: 'debug_test_event',
      category: 'debugging',
      label: 'Manual Test ' + new Date().toISOString(),
      value: Date.now()
    });
    setTestEventSent(true);
  };

  const forceGAInitialization = () => {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }
      gtag('js', new Date());
      gtag('config', GA_MEASUREMENT_ID, {
        debug_mode: true,
        cookie_domain: GA_DOMAIN,
        send_page_view: true
      });
      alert('Google Analytics re-initialized');
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Google Analytics Debug Page</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">GA Configuration</h2>
          <div className="space-y-2">
            <p><span className="font-semibold">Measurement ID:</span> {GA_MEASUREMENT_ID}</p>
            <p><span className="font-semibold">Domain:</span> {GA_DOMAIN}</p>
            <p><span className="font-semibold">gtag Available:</span> {debugInfo.hasGtag ? '✅ Yes' : '❌ No'}</p>
            <p><span className="font-semibold">dataLayer Available:</span> {debugInfo.hasDataLayer ? '✅ Yes' : '❌ No'}</p>
            <p><span className="font-semibold">GA Client ID:</span> {debugInfo.gaClientId || 'Not found'}</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Browser Information</h2>
          <div className="space-y-2">
            <p className="break-words"><span className="font-semibold">User Agent:</span> {debugInfo.userAgent}</p>
            <p><span className="font-semibold">Referrer:</span> {debugInfo.referrer || 'None'}</p>
            <p><span className="font-semibold">Has Cookies:</span> {debugInfo.cookies ? '✅ Yes' : '❌ No'}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold mb-4">Network Requests</h2>
        {debugInfo.networkRequests.length > 0 ? (
          <ul className="space-y-2 text-sm font-mono">
            {debugInfo.networkRequests.map((url, index) => (
              <li key={index} className="break-all">{url}</li>
            ))}
          </ul>
        ) : (
          <p className="text-yellow-500">No Google Analytics network requests detected yet</p>
        )}
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold mb-4">Debug Actions</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={sendTestEvent}
            className={`px-4 py-2 rounded-md ${testEventSent ? 'bg-green-500' : 'bg-blue-500'} text-white`}
            disabled={testEventSent}
          >
            {testEventSent ? 'Test Event Sent ✓' : 'Send Test Event'}
          </button>
          
          <button
            onClick={forceGAInitialization}
            className="px-4 py-2 rounded-md bg-yellow-500 text-white"
          >
            Force GA Re-initialization
          </button>
          
          <a
            href={`https://analytics.google.com/analytics/web/#/p${GA_MEASUREMENT_ID.replace('G-', '')}/reports/reportinghub`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-md bg-purple-500 text-white text-center"
          >
            Open GA Dashboard
          </a>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Cookies</h2>
        <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md text-xs overflow-x-auto">
          {debugInfo.cookies || 'No cookies found'}
        </pre>
      </div>
    </div>
  );
}
