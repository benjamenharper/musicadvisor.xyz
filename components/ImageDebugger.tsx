'use client';

import { useState, useEffect } from 'react';

interface ImageDebuggerProps {
  content: string;
}

export default function ImageDebugger({ content }: ImageDebuggerProps) {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [rawContent, setRawContent] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);
  const [showRawContent, setShowRawContent] = useState(false);

  useEffect(() => {
    // Extract all image URLs from the content
    const regex = /<img[^>]+src=["']([^"']+)["'][^>]*>/g;
    const urls: string[] = [];
    let match;
    
    while ((match = regex.exec(content)) !== null) {
      urls.push(match[1]);
    }
    
    setImageUrls(urls);
    setRawContent(content);
  }, [content]);

  if (imageUrls.length === 0 && !rawContent) return null;

  return (
    <div className="mt-8 p-4 border border-red-300 bg-red-50 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-red-800">Image Debugger</h3>
        <div className="space-x-2">
          <button 
            onClick={() => setIsVisible(!isVisible)}
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
          >
            {isVisible ? 'Hide Details' : 'Show Details'}
          </button>
          <button 
            onClick={() => setShowRawContent(!showRawContent)}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {showRawContent ? 'Hide Raw HTML' : 'Show Raw HTML'}
          </button>
        </div>
      </div>
      
      {isVisible && (
        <div className="space-y-4">
          <p className="text-sm text-red-800">Found {imageUrls.length} images in content:</p>
          <ul className="space-y-2 text-xs font-mono">
            {imageUrls.map((url, index) => (
              <li key={index} className="break-all p-2 border border-gray-200 rounded bg-white">
                <div className="flex flex-col">
                  <span className="font-bold">Image {index + 1}:</span>
                  <a 
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {url}
                  </a>
                  <div className="mt-1">
                    <span className="font-bold">Status: </span>
                    <ImageStatusChecker url={url} />
                  </div>
                  <div className="mt-2">
                    <span className="font-bold">Domain Analysis: </span>
                    <DomainAnalysis url={url} />
                  </div>
                  <div className="mt-2">
                    <button
                      onClick={() => {
                        const fixedUrl = fixImageUrl(url);
                        window.open(fixedUrl, '_blank');
                      }}
                      className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                    >
                      Try Fixed URL
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {showRawContent && (
        <div className="mt-4">
          <h4 className="text-md font-semibold text-red-800 mb-2">Raw HTML Content:</h4>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-auto max-h-96">
            <pre className="text-xs whitespace-pre-wrap break-all">{rawContent}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

// Component to check if an image URL is valid
function ImageStatusChecker({ url }: { url: string }) {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    const img = new Image();
    img.onload = () => setStatus('success');
    img.onerror = () => setStatus('error');
    img.src = url;
  }, [url]);

  return (
    <span className={
      status === 'loading' ? 'text-yellow-600' :
      status === 'success' ? 'text-green-600' :
      'text-red-600'
    }>
      {status === 'loading' ? 'Checking...' :
       status === 'success' ? 'Loads successfully' :
       'Failed to load'}
    </span>
  );
}

// Component to analyze the domain of an image URL
function DomainAnalysis({ url }: { url: string }) {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname;
    const protocol = urlObj.protocol;
    const path = urlObj.pathname;
    
    return (
      <div className="text-xs">
        <div><strong>Protocol:</strong> {protocol}</div>
        <div><strong>Domain:</strong> {hostname}</div>
        <div><strong>Path:</strong> {path}</div>
        {path.includes('/wp-content/') && (
          <div className="text-orange-600 font-semibold mt-1">
            WordPress content path detected
          </div>
        )}
      </div>
    );
  } catch (e) {
    return <span className="text-red-600">Invalid URL</span>;
  }
}

// Function to fix common WordPress image URL issues
function fixImageUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    
    // If it's a WordPress content URL
    if (urlObj.pathname.includes('/wp-content/')) {
      // Check if the URL contains specific image names we know exist
      const imageName = urlObj.pathname.split('/').pop() || '';
      if (imageName.includes('playwitme') || 
          imageName.includes('gameroom') || 
          imageName.includes('dashboard')) {
        
        // Get the base name without size suffix (e.g., remove -1024x473)
        const baseName = imageName.replace(/-\d+x\d+/, '');
        
        // Use the local version from the public directory
        return `/${baseName}`;
      }
      
      // For other WordPress content, keep the original domain but ensure no sizing parameters
      return `https://benh155.sg-host.com${urlObj.pathname.replace(/-\d+x\d+/, '')}`;
    }
    
    // If it's a relative URL
    if (url.startsWith('/')) {
      return `https://benh155.sg-host.com${url}`;
    }
    
    return url;
  } catch (e) {
    // If it's not a valid URL, assume it's a relative path
    if (url.startsWith('/')) {
      return `https://benh155.sg-host.com${url}`;
    } else {
      return `https://benh155.sg-host.com/${url}`;
    }
  }
}
