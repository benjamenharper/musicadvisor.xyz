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
  
  // Process image tags to ensure they have absolute URLs
  return content.replace(
    /<img[^>]+src=["']([^"']+)["'][^>]*>/g,
    (match, src) => {
      // If the URL is already absolute, leave it alone
      if (src.startsWith('http://') || src.startsWith('https://')) {
        return match;
      }
      
      // If it's a relative URL, make it absolute
      const absoluteSrc = src.startsWith('/') 
        ? `${domain}${src}` 
        : `${domain}/${src}`;
      
      // Replace the src attribute with the absolute URL
      return match.replace(src, absoluteSrc);
    }
  );
}
