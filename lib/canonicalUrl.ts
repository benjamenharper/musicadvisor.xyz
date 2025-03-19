/**
 * Utility functions for handling canonical URLs in Next.js App Router
 */

/**
 * Generates a canonical URL for the current page
 * @param path - The path segment (without domain)
 * @returns Full canonical URL
 */
export function getCanonicalUrl(path: string): string {
  const baseUrl = 'https://musicadvisor.xyz';
  
  // Ensure path starts with a slash
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  return `${baseUrl}${normalizedPath}`;
}

/**
 * Creates a server component that adds a canonical link to the document head
 * For use in layout.tsx files or page.tsx files that need dynamic canonical URLs
 * 
 * @param path - The path for the canonical URL
 */
export function generateCanonicalMetadata(path: string) {
  const url = getCanonicalUrl(path);
  
  return {
    alternates: {
      canonical: url,
    },
  };
}
