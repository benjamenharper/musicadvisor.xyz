// Global type definitions for the application

// Google Analytics gtag
interface Window {
  dataLayer: any[];
  gtag: (...args: any[]) => void;
  ga?: any;
}

// Declare gtag as a global function
declare function gtag(...args: any[]): void;
