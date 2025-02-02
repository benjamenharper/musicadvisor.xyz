export function calculateReadingTime(content: string): number {
  // Average reading speed (words per minute)
  const wordsPerMinute = 200;
  
  // Count words by splitting on whitespace and filtering out empty strings
  const words = content.trim().split(/\s+/).filter(word => word.length > 0);
  const wordCount = words.length;
  
  // Calculate reading time in minutes
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  
  // Return at least 1 minute
  return Math.max(1, readingTime);
}
