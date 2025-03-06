'use client';

import { useState, useEffect } from 'react';
import { GA_MEASUREMENT_ID } from '@/lib/analytics';

export default function GAVerifier() {
  const [verificationResults, setVerificationResults] = useState<{
    measurementId: string;
    gtagExists: boolean;
    dataLayerExists: boolean;
    scriptExists: boolean;
    scriptSrc: string | null;
    networkRequests: string[];
  }>({
    measurementId: GA_MEASUREMENT_ID,
    gtagExists: false,
    dataLayerExists: false,
    scriptExists: false,
    scriptSrc: null,
    networkRequests: [],
  });

  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    // Check if Google Analytics is loaded
    const gtagExists = typeof window !== 'undefined' && typeof window.gtag === 'function';
    const dataLayerExists = typeof window !== 'undefined' && Array.isArray(window.dataLayer);
    
    // Check if the script tag exists
    const scriptTag = document.querySelector('script[src*="googletagmanager.com/gtag/js"]');
    const scriptExists = !!scriptTag;
    const scriptSrc = scriptTag ? (scriptTag as HTMLScriptElement).src : null;
    
    // Update verification results
    setVerificationResults({
      measurementId: GA_MEASUREMENT_ID,
      gtagExists,
      dataLayerExists,
      scriptExists,
      scriptSrc,
      networkRequests: [],
    });
    
    // Monitor network requests for Google Analytics
    if (window.PerformanceObserver) {
      try {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (entry.name.includes('google-analytics.com') || 
                entry.name.includes('googletagmanager.com')) {
              setVerificationResults(prev => ({
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
  }, []);

  const sendTestEvent = () => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'test_event', {
        event_category: 'testing',
        event_label: 'GA Verification Test',
        value: Date.now(),
      });
      alert('Test event sent! Check your Google Analytics Real-Time reports.');
    } else {
      alert('Google Analytics is not loaded. Cannot send test event.');
    }
  };

  if (!isOpen) {
    return (
      <button 
        className="fixed bottom-4 left-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md z-50"
        onClick={() => setIsOpen(true)}
      >
        Show GA Verifier
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg z-50 max-w-md border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Google Analytics Verifier</h2>
        <button 
          className="text-gray-500 hover:text-gray-700"
          onClick={() => setIsOpen(false)}
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
          <p className="font-semibold">Measurement ID:</p>
          <p className="font-mono">{verificationResults.measurementId}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <div className={`p-3 rounded-md ${verificationResults.gtagExists ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
            <p className="font-semibold">gtag Function:</p>
            <p>{verificationResults.gtagExists ? 'Available ✓' : 'Missing ✗'}</p>
          </div>
          
          <div className={`p-3 rounded-md ${verificationResults.dataLayerExists ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
            <p className="font-semibold">dataLayer:</p>
            <p>{verificationResults.dataLayerExists ? 'Available ✓' : 'Missing ✗'}</p>
          </div>
        </div>
        
        <div className={`p-3 rounded-md ${verificationResults.scriptExists ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
          <p className="font-semibold">Script Tag:</p>
          <p>{verificationResults.scriptExists ? 'Found ✓' : 'Not Found ✗'}</p>
          {verificationResults.scriptSrc && (
            <p className="text-xs font-mono mt-1 break-all">{verificationResults.scriptSrc}</p>
          )}
        </div>
        
        <div className="p-3 rounded-md bg-gray-100 dark:bg-gray-700">
          <p className="font-semibold">Network Requests:</p>
          {verificationResults.networkRequests.length > 0 ? (
            <ul className="text-xs font-mono mt-1 space-y-1">
              {verificationResults.networkRequests.map((url, index) => (
                <li key={index} className="break-all">{url}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm italic">No Google Analytics requests detected yet</p>
          )}
        </div>
        
        <button
          onClick={sendTestEvent}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
        >
          Send Test Event
        </button>
      </div>
    </div>
  );
}
