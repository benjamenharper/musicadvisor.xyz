export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function decodeHTML(html: string): string {
  const entities: { [key: string]: string } = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&#x27;': "'",
    '&#038;': '&',
    '&#38;': '&',
    '&nbsp;': ' ',
    '&copy;': '©',
    '&reg;': '®',
    '&trade;': '™',
    '&mdash;': '—',
    '&ndash;': '–',
    '&ldquo;': '"',
    '&rdquo;': '"',
    '&lsquo;': '\'',
    '&rsquo;': '\'',
    '&bull;': '•',
    '&hellip;': '…',
    '&#8211;': '–',
    '&#8212;': '—',
    '&#8216;': '\'',
    '&#8217;': '\'',
    '&#8220;': '"',
    '&#8221;': '"',
    '&#8230;': '…'
  };
  
  return html.replace(/&[#\w]+;/g, entity => entities[entity] || entity);
}

/**
 * Processes WordPress content to ensure all image URLs are absolute
 * and pointing to the correct WordPress domain
 */
export function processWordPressContent(content: string, wpDomain: string = 'https://benh155.sg-host.com'): string {
  if (!content) return '';
  
  // Ensure wpDomain doesn't have a trailing slash
  const domain = wpDomain.replace(/\/$/, '');
  
  // Use regex to process the HTML content
  // This works on both server and client side
  
  // First, handle specific known images that should be served from the local public directory
  let processedContent = content.replace(
    /<img[^>]+src=["']([^"']+)(playwitme|gameroom|dashboard)(-\d+x\d+)?\.png["'][^>]*>/g,
    (match, prefix, imageName, sizeSuffix) => {
      // Replace with the local version from the public directory
      return match.replace(
        /src=["'][^"']+["']/g, 
        `src="/${imageName}.png"`
      );
    }
  );
  
  // Then handle WordPress specific URLs with wp-content paths
  processedContent = processedContent.replace(
    /<img[^>]+src=["']([^"']+)["'][^>]*>/g,
    (match, src) => {
      // Skip if the URL is already absolute and not a WordPress content URL
      if ((src.startsWith('http://') || src.startsWith('https://')) && 
          (!src.includes('/wp-content/') || src.includes(domain))) {
        return match;
      }
      
      // If it's a WordPress content URL but on a different domain, fix it
      if (src.includes('/wp-content/') && 
          !src.includes(domain) && 
          (src.startsWith('http://') || src.startsWith('https://'))) {
        const wpContentPath = src.substring(src.indexOf('/wp-content/'));
        // Remove any image size parameters (e.g., -1024x473)
        const cleanPath = wpContentPath.replace(/-\d+x\d+(\.[a-zA-Z0-9]+)$/, '$1');
        return match.replace(`src="${src}"`, `src="${domain}${cleanPath}"`)
                   .replace(`src='${src}'`, `src='${domain}${cleanPath}'`);
      }
      
      // If it's a relative URL, make it absolute
      if (!src.startsWith('http://') && !src.startsWith('https://')) {
        const absoluteSrc = src.startsWith('/') 
          ? `${domain}${src}` 
          : `${domain}/${src}`;
        
        // Replace the src attribute with the absolute URL
        return match.replace(`src="${src}"`, `src="${absoluteSrc}"`)
                   .replace(`src='${src}'`, `src='${absoluteSrc}'`);
      }
      
      return match;
    }
  );
  
  // Process srcset attributes
  processedContent = processedContent.replace(
    /srcset=["']([^"']+)["']/g,
    (match, srcset) => {
      const srcsetParts = srcset.split(',');
      const processedParts = srcsetParts.map((part: string) => {
        const [srcUrl, descriptor] = part.trim().split(/\s+/);
        
        // Check if this is one of our known local images
        if (srcUrl.includes('playwitme') || srcUrl.includes('gameroom') || srcUrl.includes('dashboard')) {
          const imageName = srcUrl.split('/').pop()?.replace(/-\d+x\d+(\.[a-zA-Z0-9]+)$/, '$1') || '';
          return `/${imageName} ${descriptor || ''}`.trim();
        }
        
        // Skip if the URL is already absolute and not a WordPress content URL
        if ((srcUrl.startsWith('http://') || srcUrl.startsWith('https://')) && 
            (!srcUrl.includes('/wp-content/') || srcUrl.includes(domain))) {
          return part;
        }
        
        // If it's a WordPress content URL but on a different domain, fix it
        if (srcUrl.includes('/wp-content/') && 
            !srcUrl.includes(domain) && 
            (srcUrl.startsWith('http://') || srcUrl.startsWith('https://'))) {
          const wpContentPath = srcUrl.substring(srcUrl.indexOf('/wp-content/'));
          // Remove any image size parameters (e.g., -1024x473)
          const cleanPath = wpContentPath.replace(/-\d+x\d+(\.[a-zA-Z0-9]+)$/, '$1');
          const fixedUrl = `${domain}${cleanPath}`;
          return descriptor ? `${fixedUrl} ${descriptor}` : fixedUrl;
        }
        
        // If it's a relative URL, make it absolute
        if (!srcUrl.startsWith('http://') && !srcUrl.startsWith('https://')) {
          const absoluteSrcUrl = srcUrl.startsWith('/') 
            ? `${domain}${srcUrl}` 
            : `${domain}/${srcUrl}`;
          
          return descriptor ? `${absoluteSrcUrl} ${descriptor}` : absoluteSrcUrl;
        }
        
        return part;
      });
      
      return `srcset="${processedParts.join(', ')}"`;
    }
  );
  
  // Process other media elements like video sources
  processedContent = processedContent.replace(
    /<(source|video|audio)[^>]+src=["']([^"']+)["'][^>]*>/g,
    (match, tag, src) => {
      // Skip if the URL is already absolute
      if (src.startsWith('data:') || src.startsWith('http://') || src.startsWith('https://')) {
        // If it's a WordPress content URL but on a different domain, fix it
        if (src.includes('/wp-content/') && 
            !src.includes(domain) && 
            (src.startsWith('http://') || src.startsWith('https://'))) {
          const wpContentPath = src.substring(src.indexOf('/wp-content/'));
          // Remove any image size parameters (e.g., -1024x473)
          const cleanPath = wpContentPath.replace(/-\d+x\d+(\.[a-zA-Z0-9]+)$/, '$1');
          return match.replace(`src="${src}"`, `src="${domain}${cleanPath}"`)
                     .replace(`src='${src}'`, `src='${domain}${cleanPath}'`);
        }
        return match;
      }
      
      // If it's a relative URL, make it absolute
      const absoluteSrc = src.startsWith('/') 
        ? `${domain}${src}` 
        : `${domain}/${src}`;
      
      // Replace the src attribute with the absolute URL
      return match.replace(`src="${src}"`, `src="${absoluteSrc}"`)
                 .replace(`src='${src}'`, `src='${absoluteSrc}'`);
    }
  );
  
  return processedContent;
}
