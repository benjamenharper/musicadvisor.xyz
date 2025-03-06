// Google Analytics utility functions

// Initialize Google Analytics
export const GA_MEASUREMENT_ID = 'G-072196R4C8';
export const GA_DOMAIN = 'musicadvisor.xyz';

// Log page views
export const pageview = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: url,
      page_title: title || document.title,
      page_location: window.location.href,
      send_to: GA_MEASUREMENT_ID
    });
    console.log('GA pageview tracked:', url);
  } else {
    console.warn('Google Analytics not loaded for pageview:', url);
  }
};

// Log events
export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      send_to: GA_MEASUREMENT_ID
    });
    console.log('GA event tracked:', { action, category, label, value });
  } else {
    console.warn('Google Analytics not loaded for event:', action);
  }
};

// Check if Google Analytics is loaded and working
export const checkGAStatus = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(false);
      return;
    }
    
    // Check if GA is loaded
    if (window.gtag) {
      console.log('Google Analytics is loaded');
      resolve(true);
      return;
    }
    
    // Set a timeout to check if GA loads within 3 seconds
    const timeout = setTimeout(() => {
      console.warn('Google Analytics failed to load within timeout period');
      resolve(false);
    }, 3000);
    
    // Create a listener for the GA script
    const gaScript = document.querySelector('script[src*="googletagmanager.com/gtag/js"]');
    if (gaScript) {
      gaScript.addEventListener('load', () => {
        clearTimeout(timeout);
        console.log('Google Analytics script loaded');
        resolve(true);
      });
      
      gaScript.addEventListener('error', () => {
        clearTimeout(timeout);
        console.error('Google Analytics script failed to load');
        resolve(false);
      });
    } else {
      clearTimeout(timeout);
      console.error('Google Analytics script not found in the DOM');
      resolve(false);
    }
  });
};
