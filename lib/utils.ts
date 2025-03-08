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
  
  // First, handle WordPress specific URLs that might be using wp-content paths
  let processedContent = content.replace(
    /(src|href|srcset)=["']([^"']+)["']/gi,
    (match, attribute, url) => {
      // Skip if the URL is a data URL
      if (url.startsWith('data:')) {
        return match;
      }
      
      // Handle wp-content URLs that might be using a different domain or relative paths
      if (url.includes('/wp-content/')) {
        // If it's already an absolute URL but not pointing to our WordPress domain
        if ((url.startsWith('http://') || url.startsWith('https://')) && !url.includes(domain)) {
          // Extract the path after wp-content
          const wpContentPath = url.substring(url.indexOf('/wp-content/'));
          return `${attribute}="${domain}${wpContentPath}"`;
        }
      }
      
      // If it's not a wp-content URL or already has the correct domain, leave it as is
      return match;
    }
  );
  
  // Then process all remaining URLs in the content (src, href, srcset attributes)
  return processedContent.replace(
    /(src|href|srcset)=["']([^"']+)["']/gi,
    (match, attribute, url) => {
      // Skip if the URL is a data URL or already absolute with the correct domain
      if (url.startsWith('data:') || 
          (url.startsWith('http://') && url.includes(domain)) || 
          (url.startsWith('https://') && url.includes(domain))) {
        return match;
      }
      
      // If it's an absolute URL but not pointing to our WordPress domain, leave it
      // (This handles external resources like CDNs, YouTube embeds, etc.)
      if (url.startsWith('http://') || url.startsWith('https://')) {
        return match;
      }
      
      // Handle srcset attribute (multiple URLs)
      if (attribute.toLowerCase() === 'srcset') {
        const srcsetParts = url.split(',');
        const processedParts = srcsetParts.map((part: string) => {
          const [srcUrl, descriptor] = part.trim().split(/\s+/);
          if (srcUrl.startsWith('http://') || srcUrl.startsWith('https://')) {
            return part;
          }
          const absoluteSrcUrl = srcUrl.startsWith('/') 
            ? `${domain}${srcUrl}` 
            : `${domain}/${srcUrl}`;
          return descriptor ? `${absoluteSrcUrl} ${descriptor}` : absoluteSrcUrl;
        });
        return `${attribute}="${processedParts.join(', ')}"`;
      }
      
      // Handle regular src and href attributes
      const absoluteUrl = url.startsWith('/') 
        ? `${domain}${url}` 
        : `${domain}/${url}`;
      
      return `${attribute}="${absoluteUrl}"`;
    }
  );
}
