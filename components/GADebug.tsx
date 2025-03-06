'use client';

import { useState, useEffect } from 'react';
import { checkGAStatus } from '@/lib/analytics';

export default function GADebug() {
  const [isVisible, setIsVisible] = useState(false);
  const [gaStatus, setGaStatus] = useState<{
    isLoaded: boolean;
    gtag: boolean;
    dataLayer: boolean;
    scriptLoaded: boolean;
  }>({
    isLoaded: false,
    gtag: false,
    dataLayer: false,
    scriptLoaded: false,
  });

  useEffect(() => {
    // Only run in development mode
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    const checkStatus = async () => {
      const isLoaded = await checkGAStatus();
      
      setGaStatus({
        isLoaded,
        gtag: typeof window !== 'undefined' && !!window.gtag,
        dataLayer: typeof window !== 'undefined' && !!window.dataLayer,
        scriptLoaded: !!document.querySelector('script[src*="googletagmanager.com/gtag/js"]'),
      });
    };

    checkStatus();
    
    // Check again after 5 seconds to make sure everything loaded
    const timer = setTimeout(checkStatus, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  // Don't render anything in production
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-md text-sm z-50"
      >
        GA Debug
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-md shadow-lg z-50 max-w-md border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Google Analytics Debug</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>GA Loaded:</span>
          <span className={gaStatus.isLoaded ? "text-green-500" : "text-red-500"}>
            {gaStatus.isLoaded ? "Yes" : "No"}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>gtag Function:</span>
          <span className={gaStatus.gtag ? "text-green-500" : "text-red-500"}>
            {gaStatus.gtag ? "Available" : "Missing"}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>dataLayer:</span>
          <span className={gaStatus.dataLayer ? "text-green-500" : "text-red-500"}>
            {gaStatus.dataLayer ? "Available" : "Missing"}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>GA Script:</span>
          <span className={gaStatus.scriptLoaded ? "text-green-500" : "text-red-500"}>
            {gaStatus.scriptLoaded ? "Loaded" : "Not Found"}
          </span>
        </div>
      </div>
      
      <div className="mt-4 pt-2 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={() => {
            if (typeof window !== 'undefined' && window.gtag) {
              window.gtag('event', 'test_event', {
                event_category: 'testing',
                event_label: 'GA Debug Test',
                value: 1,
              });
              alert('Test event sent to Google Analytics');
            } else {
              alert('Google Analytics not available to send test event');
            }
          }}
          className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm"
        >
          Send Test Event
        </button>
      </div>
    </div>
  );
}
